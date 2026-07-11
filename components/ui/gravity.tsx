"use client";

import {
  createContext,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Matter, { Bodies, Engine, Events, Mouse, MouseConstraint, Query, Render, Runner, World } from "matter-js";
import { cn } from "@/lib/utils";

// tiny debounce (replaces lodash)
function debounce<A extends unknown[]>(fn: (...args: A) => void, wait: number) {
  let t: ReturnType<typeof setTimeout>;
  const d = (...args: A) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
  d.cancel = () => clearTimeout(t);
  return d;
}

function calculatePosition(value: number | string | undefined, containerSize: number, elementSize: number) {
  if (typeof value === "string" && value.endsWith("%")) {
    return (containerSize * parseFloat(value)) / 100;
  }
  return typeof value === "number" ? value : elementSize - containerSize + elementSize / 2;
}

type GravityProps = {
  children: ReactNode;
  debug?: boolean;
  gravity?: { x: number; y: number };
  resetOnResize?: boolean;
  grabCursor?: boolean;
  addTopWall?: boolean;
  autoStart?: boolean;
  className?: string;
};

type MatterBodyProps = {
  children: ReactNode;
  matterBodyOptions?: Matter.IBodyDefinition;
  isDraggable?: boolean;
  bodyType?: "rectangle" | "circle";
  x?: number | string;
  y?: number | string;
  angle?: number;
  className?: string;
};

type PhysicsBody = { element: HTMLElement; body: Matter.Body; props: MatterBodyProps };

export type GravityRef = { start: () => void; stop: () => void; reset: () => void };

const GravityContext = createContext<{
  registerElement: (id: string, element: HTMLElement, props: MatterBodyProps) => void;
  unregisterElement: (id: string) => void;
} | null>(null);

export const MatterBody = ({
  children,
  className,
  matterBodyOptions = { friction: 0.1, restitution: 0.1, density: 0.001, isStatic: false },
  bodyType = "rectangle",
  isDraggable = true,
  x = 0,
  y = 0,
  angle = 0,
}: MatterBodyProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).substring(7));
  const context = useContext(GravityContext);

  useEffect(() => {
    if (!elementRef.current || !context) return;
    const id = idRef.current;
    context.registerElement(id, elementRef.current, {
      children,
      matterBodyOptions,
      bodyType,
      isDraggable,
      x,
      y,
      angle,
    });
    return () => context.unregisterElement(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, isDraggable]);

  return (
    <div ref={elementRef} className={cn("absolute", className, isDraggable && "pointer-events-none")}>
      {children}
    </div>
  );
};

export const Gravity = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      debug = false,
      gravity = { x: 0, y: 1 },
      grabCursor = true,
      resetOnResize = true,
      addTopWall = true,
      autoStart = true,
      className,
    },
    ref,
  ) => {
    const canvas = useRef<HTMLDivElement>(null);
    const engine = useRef(Engine.create());
    const render = useRef<Matter.Render | null>(null);
    const runner = useRef<Matter.Runner | null>(null);
    const bodiesMap = useRef(new Map<string, PhysicsBody>());
    const frameId = useRef<number>(0);
    const mouseConstraint = useRef<Matter.MouseConstraint | null>(null);
    const mouseDown = useRef(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const isRunning = useRef(false);

    const registerElement = useCallback(
      (id: string, element: HTMLElement, props: MatterBodyProps) => {
        if (!canvas.current) return;
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const rect = canvas.current.getBoundingClientRect();
        const angle = (props.angle || 0) * (Math.PI / 180);
        const x = calculatePosition(props.x, rect.width, width);
        const y = calculatePosition(props.y, rect.height, height);
        const renderOpts = {
          fillStyle: debug ? "#888888" : "#00000000",
          strokeStyle: debug ? "#333333" : "#00000000",
          lineWidth: debug ? 3 : 0,
        };

        const opts = props.matterBodyOptions as Matter.IChamferableBodyDefinition;
        const body =
          props.bodyType === "circle"
            ? Bodies.circle(x, y, Math.max(width, height) / 2, { ...opts, angle, render: renderOpts })
            : Bodies.rectangle(x, y, width, height, { ...opts, angle, render: renderOpts });

        World.add(engine.current.world, [body]);
        bodiesMap.current.set(id, { element, body, props });
      },
      [debug],
    );

    const unregisterElement = useCallback((id: string) => {
      const item = bodiesMap.current.get(id);
      if (item) {
        World.remove(engine.current.world, item.body);
        bodiesMap.current.delete(id);
      }
    }, []);

    const updateElements = useCallback(() => {
      bodiesMap.current.forEach(({ element, body }) => {
        const { x, y } = body.position;
        const rotation = body.angle * (180 / Math.PI);
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`;
      });
      frameId.current = requestAnimationFrame(updateElements);
    }, []);

    const startEngine = useCallback(() => {
      if (runner.current) {
        runner.current.enabled = true;
        Runner.run(runner.current, engine.current);
      }
      if (render.current) Render.run(render.current);
      frameId.current = requestAnimationFrame(updateElements);
      isRunning.current = true;
    }, [updateElements]);

    const stopEngine = useCallback(() => {
      if (!isRunning.current) return;
      if (runner.current) Runner.stop(runner.current);
      if (render.current) Render.stop(render.current);
      if (frameId.current) cancelAnimationFrame(frameId.current);
      isRunning.current = false;
    }, []);

    const initializeRenderer = useCallback(() => {
      if (!canvas.current) return;
      const height = canvas.current.offsetHeight;
      const width = canvas.current.offsetWidth;

      engine.current.gravity.x = gravity.x;
      engine.current.gravity.y = gravity.y;

      const r = Render.create({
        element: canvas.current,
        engine: engine.current,
        options: { width, height, wireframes: false, background: "#00000000" },
      });
      render.current = r;

      const mouse = Mouse.create(r.canvas);
      const mc = MouseConstraint.create(engine.current, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: debug } },
      });
      mouseConstraint.current = mc;

      const walls = [
        Bodies.rectangle(width / 2, height + 10, width, 20, { isStatic: true, friction: 1, render: { visible: debug } }),
        Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true, friction: 1, render: { visible: debug } }),
        Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true, friction: 1, render: { visible: debug } }),
      ];
      if (addTopWall) {
        walls.push(Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true, friction: 1, render: { visible: debug } }));
      }

      const touchingMouse = () =>
        Query.point(engine.current.world.bodies, mc.mouse.position || { x: 0, y: 0 }).length > 0;

      if (grabCursor) {
        Events.on(engine.current, "beforeUpdate", () => {
          if (!canvas.current) return;
          if (!mouseDown.current && !touchingMouse()) canvas.current.style.cursor = "default";
          else if (touchingMouse()) canvas.current.style.cursor = mouseDown.current ? "grabbing" : "grab";
        });
        canvas.current.addEventListener("mousedown", () => {
          mouseDown.current = true;
          if (canvas.current) canvas.current.style.cursor = touchingMouse() ? "grabbing" : "default";
        });
        canvas.current.addEventListener("mouseup", () => {
          mouseDown.current = false;
          if (canvas.current) canvas.current.style.cursor = touchingMouse() ? "grab" : "default";
        });
      }

      World.add(engine.current.world, [mc, ...walls]);
      r.mouse = mouse;

      const run = Runner.create();
      runner.current = run;
      Render.run(r);
      updateElements();
      run.enabled = false;

      if (autoStart) {
        run.enabled = true;
        startEngine();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateElements, debug, autoStart, startEngine]);

    const clearRenderer = useCallback(() => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
      if (mouseConstraint.current) World.remove(engine.current.world, mouseConstraint.current);
      if (render.current) {
        Mouse.clearSourceEvents(render.current.mouse);
        Render.stop(render.current);
        render.current.canvas.remove();
      }
      if (runner.current) Runner.stop(runner.current);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      bodiesMap.current.clear();
    }, []);

    const handleResize = useCallback(() => {
      if (!canvas.current || !resetOnResize) return;
      setCanvasSize({ width: canvas.current.offsetWidth, height: canvas.current.offsetHeight });
      clearRenderer();
      initializeRenderer();
    }, [clearRenderer, initializeRenderer, resetOnResize]);

    const reset = useCallback(() => {
      stopEngine();
      bodiesMap.current.forEach(({ element, body, props }) => {
        body.angle = props.angle || 0;
        body.position.x = calculatePosition(props.x, canvasSize.width, element.offsetWidth);
        body.position.y = calculatePosition(props.y, canvasSize.height, element.offsetHeight);
      });
      updateElements();
      handleResize();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stopEngine, updateElements, handleResize]);

    useImperativeHandle(ref, () => ({ start: startEngine, stop: stopEngine, reset }), [startEngine, stopEngine, reset]);

    useEffect(() => {
      if (!resetOnResize) return;
      const debounced = debounce(handleResize, 500);
      window.addEventListener("resize", debounced);
      return () => {
        window.removeEventListener("resize", debounced);
        debounced.cancel();
      };
    }, [handleResize, resetOnResize]);

    useEffect(() => {
      initializeRenderer();
      return clearRenderer;
    }, [initializeRenderer, clearRenderer]);

    return (
      <GravityContext.Provider value={{ registerElement, unregisterElement }}>
        <div ref={canvas} className={cn(className, "absolute left-0 top-0 h-full w-full")}>
          {children}
        </div>
      </GravityContext.Provider>
    );
  },
);

Gravity.displayName = "Gravity";
