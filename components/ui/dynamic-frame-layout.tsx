"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export interface Frame {
  id: number;
  video: string;
  defaultPos: { x: number; y: number; w: number; h: number };
  mediaSize: number;
  isHovered: boolean;
  corner?: string;
  edgeHorizontal?: string;
  edgeVertical?: string;
  borderThickness?: number;
  borderSize?: number;
}

interface FrameComponentProps {
  video: string;
  width: number | string;
  height: number | string;
  className?: string;
  corner?: string;
  edgeHorizontal?: string;
  edgeVertical?: string;
  mediaSize: number;
  borderThickness?: number;
  borderSize?: number;
  showFrame: boolean;
  isHovered: boolean;
}

function FrameComponent({
  video,
  width,
  height,
  className = "",
  corner = "",
  edgeHorizontal = "",
  edgeVertical = "",
  mediaSize,
  borderThickness = 0,
  borderSize = 80,
  showFrame,
  isHovered,
}: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHovered) videoRef.current?.play().catch(() => {});
    else videoRef.current?.pause();
  }, [isHovered]);

  return (
    <div
      className={`relative ${className}`}
      style={{ width, height, transition: "width 0.3s ease-in-out, height 0.3s ease-in-out" }}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 1,
            transition: "all 0.3s ease-in-out",
            padding: showFrame ? `${borderThickness}px` : "0",
            width: showFrame ? `${borderSize}%` : "100%",
            height: showFrame ? `${borderSize}%` : "100%",
            left: showFrame ? `${(100 - borderSize) / 2}%` : "0",
            top: showFrame ? `${(100 - borderSize) / 2}%` : "0",
          }}
        >
          <div
            className="h-full w-full overflow-hidden"
            style={{
              transform: `scale(${mediaSize})`,
              transformOrigin: "center",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <video className="h-full w-full object-cover" src={video} loop muted playsInline ref={videoRef} />
          </div>
        </div>

        {showFrame && (
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            <div className="absolute left-0 top-0 h-16 w-16 bg-contain bg-no-repeat" style={{ backgroundImage: `url(${corner})` }} />
            <div className="absolute right-0 top-0 h-16 w-16 bg-contain bg-no-repeat" style={{ backgroundImage: `url(${corner})`, transform: "scaleX(-1)" }} />
            <div className="absolute bottom-0 left-0 h-16 w-16 bg-contain bg-no-repeat" style={{ backgroundImage: `url(${corner})`, transform: "scaleY(-1)" }} />
            <div className="absolute bottom-0 right-0 h-16 w-16 bg-contain bg-no-repeat" style={{ backgroundImage: `url(${corner})`, transform: "scale(-1, -1)" }} />
            <div className="absolute left-16 right-16 top-0 h-16" style={{ backgroundImage: `url(${edgeHorizontal})`, backgroundSize: "auto 64px", backgroundRepeat: "repeat-x" }} />
            <div className="absolute bottom-0 left-16 right-16 h-16" style={{ backgroundImage: `url(${edgeHorizontal})`, backgroundSize: "auto 64px", backgroundRepeat: "repeat-x", transform: "rotate(180deg)" }} />
            <div className="absolute bottom-16 left-0 top-16 w-16" style={{ backgroundImage: `url(${edgeVertical})`, backgroundSize: "64px auto", backgroundRepeat: "repeat-y" }} />
            <div className="absolute bottom-16 right-0 top-16 w-16" style={{ backgroundImage: `url(${edgeVertical})`, backgroundSize: "64px auto", backgroundRepeat: "repeat-y", transform: "scaleX(-1)" }} />
          </div>
        )}
      </div>
    </div>
  );
}

interface DynamicFrameLayoutProps {
  frames: Frame[];
  className?: string;
  showFrames?: boolean;
  hoverSize?: number;
  gapSize?: number;
}

export function DynamicFrameLayout({
  frames: initialFrames,
  className,
  showFrames = false,
  hoverSize = 6,
  gapSize = 4,
}: DynamicFrameLayoutProps) {
  const [frames] = useState<Frame[]>(initialFrames);
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null);

  const getRowSizes = () => {
    if (hovered === null) return "4fr 4fr 4fr";
    const { row } = hovered;
    const n = (12 - hoverSize) / 2;
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${n}fr`)).join(" ");
  };
  const getColSizes = () => {
    if (hovered === null) return "4fr 4fr 4fr";
    const { col } = hovered;
    const n = (12 - hoverSize) / 2;
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${n}fr`)).join(" ");
  };
  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom";
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right";
    return `${vertical} ${horizontal}`;
  };

  return (
    <div
      className={`relative h-full w-full ${className ?? ""}`}
      style={{
        display: "grid",
        gridTemplateRows: getRowSizes(),
        gridTemplateColumns: getColSizes(),
        gap: `${gapSize}px`,
        transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
      }}
    >
      {frames.map((frame) => {
        const row = Math.floor(frame.defaultPos.y / 4);
        const col = Math.floor(frame.defaultPos.x / 4);
        const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y);
        return (
          <motion.div
            key={frame.id}
            className="relative"
            style={{ transformOrigin, transition: "transform 0.4s ease" }}
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
          >
            <FrameComponent
              video={frame.video}
              width="100%"
              height="100%"
              className="absolute inset-0"
              corner={frame.corner}
              edgeHorizontal={frame.edgeHorizontal}
              edgeVertical={frame.edgeVertical}
              mediaSize={frame.mediaSize}
              borderThickness={frame.borderThickness}
              borderSize={frame.borderSize}
              showFrame={showFrames}
              isHovered={hovered?.row === row && hovered?.col === col}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
