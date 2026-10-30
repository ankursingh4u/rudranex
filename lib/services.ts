// ═══ SERVICE DETAIL PAGES — one rich entry per Capabilities card ═══

export interface ServiceStat {
  value: number;
  suffix: string;
  label: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  /** word of the title rendered as the ember <em> */
  em: string;
  eyebrow: string;
  intro: string;
  img: string;
  heroStats: ServiceStat[];
  how: { num: string; title: string; body: string }[];
  benefits: { title: string; body: string; stat: ServiceStat }[];
  growth: {
    caption: string;
    labels: string[];
    /** 0–100 normalized trajectory with the service */
    series: number[];
    headline: ServiceStat;
  };
  lose: {
    heading: string;
    sub: string;
    without: string[];
    withUs: string[];
    /** 0–100 normalized — what drifting looks like */
    decline: number[];
    /** 0–100 normalized — what compounding looks like */
    rise: number[];
  };
  tags: string[];
  ctaLine: string;
}

const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "custom-software",
    title: "Custom Software",
    em: "Software",
    eyebrow: "SERVICE 01 — BUILT AROUND YOUR BUSINESS",
    intro:
      "Off-the-shelf tools force your business to work their way. We build scalable web platforms, internal systems and customer-facing products shaped around how you actually operate — so the software bends to the business, never the other way around.",
    img: U("1555066931-4365d14bab8c"),
    heroStats: [
      { value: 50, suffix: "+", label: "PLATFORMS SHIPPED" },
      { value: 99, suffix: ".9%", label: "UPTIME TARGET" },
      { value: 12, suffix: "wk", label: "TYPICAL FIRST RELEASE" },
    ],
    how: [
      { num: "01", title: "Map the business", body: "We sit with the people who do the work and map every flow, exception and workaround before a line of code exists. The system is designed around reality, not assumptions." },
      { num: "02", title: "Architect for scale", body: "Solution architecture that survives growth: clean domain boundaries, an API layer your future team will thank you for, and infrastructure that scales on demand instead of in panic." },
      { num: "03", title: "Ship in weekly loops", body: "Working software every week, in your hands. You steer with real usage, not screenshots — so by launch day the product has already been course-corrected a dozen times." },
      { num: "04", title: "Hand over ownership", body: "Clean, documented code, your repositories, your cloud accounts. We stay for hardening and growth, but from day one the asset is unambiguously yours." },
    ],
    benefits: [
      { title: "Workflows become instant", body: "Processes that took hours of copy-pasting between tools collapse into a click. Teams get their week back.", stat: { value: 68, suffix: "%", label: "less manual work" } },
      { title: "One source of truth", body: "No more five spreadsheets disagreeing about the same number. Every decision runs on live, trusted data.", stat: { value: 1, suffix: "", label: "system of record" } },
      { title: "Scales without drama", body: "Architecture built for 100× your current load, so a good month never becomes an outage.", stat: { value: 100, suffix: "×", label: "headroom designed in" } },
      { title: "You own the asset", body: "Code, IP and infrastructure handed over clean. Your valuation grows with the software you own.", stat: { value: 100, suffix: "%", label: "IP ownership" } },
    ],
    growth: {
      caption: "Operational capacity after replacing manual workflows with a custom platform — typical engagement trajectory.",
      labels: ["Kickoff", "Wk 4", "Wk 8", "Launch", "Mo 3", "Mo 6", "Mo 9", "Yr 1"],
      series: [12, 22, 34, 48, 62, 74, 86, 96],
      headline: { value: 3, suffix: "×", label: "throughput within a year" },
    },
    lose: {
      heading: "The cost of staying manual",
      sub: "Every quarter on spreadsheets and duct-taped tools is a quarter your competitors spend compounding.",
      without: [
        "Hours lost daily to copy-paste work that software should do",
        "Errors hide in spreadsheets until they reach a customer",
        "Every new hire needs weeks to learn the workarounds",
        "Competitors with real systems quote faster and ship faster",
      ],
      withUs: [
        "Repetitive work automated — people do judgment, not data entry",
        "Validation at the source: errors caught before they cost money",
        "New hires productive in days inside one coherent system",
        "You respond to the market in days, not quarters",
      ],
      decline: [60, 56, 50, 46, 38, 32, 24, 18],
      rise: [60, 64, 70, 76, 82, 88, 93, 97],
    },
    tags: ["Solution architecture", "Platform engineering", "Modern frontend delivery"],
    ctaLine: "Tell us how your business runs. We'll show you the system it deserves.",
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    em: "Mobile",
    eyebrow: "SERVICE 02 — IN YOUR CUSTOMER'S POCKET",
    intro:
      "Your customers live on their phones; your business should too. We build native-feeling iOS and Android experiences with a hard product and performance focus — apps people keep, not apps people delete after one session.",
    img: U("1498050108023-c5249f4df085"),
    heroStats: [
      { value: 60, suffix: "fps", label: "INTERACTION BUDGET" },
      { value: 2, suffix: "s", label: "COLD-START TARGET" },
      { value: 4, suffix: ".7★", label: "STORE-RATING BAR" },
    ],
    how: [
      { num: "01", title: "Define the one job", body: "Great apps do one job brilliantly. We cut the roadmap to the single loop users will open the app for — then make that loop effortless." },
      { num: "02", title: "Design for thumbs", body: "Native platform conventions, one-handed reach, offline states and haptics designed in from the first wireframe — not patched on after reviews complain." },
      { num: "03", title: "Build and instrument", body: "A performance budget on every screen and analytics on every flow, so we know what users love before we double down on it." },
      { num: "04", title: "Launch and iterate", body: "Store submission, release trains, crash monitoring and A/B iteration. Version 1.0 is the starting line, and we keep shipping." },
    ],
    benefits: [
      { title: "Be one tap away", body: "A home-screen icon is the shortest path between a customer's impulse and your revenue.", stat: { value: 3, suffix: "×", label: "engagement vs mobile web" } },
      { title: "Work offline, sync later", body: "Field teams and flaky networks stop being an excuse — the app works everywhere your people do.", stat: { value: 100, suffix: "%", label: "offline-capable flows" } },
      { title: "Push, don't hope", body: "Owned notification channels bring users back without paying for the same click twice.", stat: { value: 40, suffix: "%", label: "higher retention" } },
      { title: "One codebase, two stores", body: "A shared core where it's smart, native where it matters — iOS and Android without double budgets.", stat: { value: 2, suffix: "", label: "platforms, one team" } },
    ],
    growth: {
      caption: "Monthly active users after launch — typical trajectory when retention is designed in, not bolted on.",
      labels: ["Launch", "Mo 1", "Mo 2", "Mo 3", "Mo 4", "Mo 6", "Mo 9", "Yr 1"],
      series: [8, 18, 26, 38, 50, 66, 82, 95],
      headline: { value: 40, suffix: "%", label: "D30 retention uplift" },
    },
    lose: {
      heading: "The cost of staying web-only",
      sub: "Every month without an app, your competitors sit on your customer's home screen and you sit in a browser tab.",
      without: [
        "Rebuying the same visitor through ads on every visit",
        "No push channel — your re-engagement is an unopened email",
        "Checkout friction on mobile web silently kills conversion",
        "Competitor apps collect loyalty data you never see",
      ],
      withUs: [
        "A permanent icon on the device your customer checks 96× a day",
        "Push and deep links that bring users back for free",
        "Native checkout, biometrics and wallets — friction gone",
        "First-party behavioral data that compounds into advantage",
      ],
      decline: [55, 52, 47, 42, 36, 30, 24, 19],
      rise: [55, 60, 66, 73, 80, 87, 92, 96],
    },
    tags: ["Consumer apps", "Operational apps", "Ongoing release support"],
    ctaLine: "Put your product in their pocket. We'll handle everything between idea and the store.",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    em: "Cloud",
    eyebrow: "SERVICE 03 — INFRASTRUCTURE THAT HOLDS",
    intro:
      "Reliable infrastructure, deployment pipelines and observability for teams that need predictable scale. We make releases boring, outages rare, and your cloud bill something the CFO stops asking about.",
    img: U("1517077304055-6e89abbf09b0"),
    heroStats: [
      { value: 15, suffix: "min", label: "COMMIT → PRODUCTION" },
      { value: 99, suffix: ".95%", label: "AVAILABILITY DESIGNED" },
      { value: 35, suffix: "%", label: "TYPICAL BILL REDUCTION" },
    ],
    how: [
      { num: "01", title: "Audit what exists", body: "An honest map of your current infrastructure: single points of failure, security gaps, idle spend and the deploy steps everyone is afraid of." },
      { num: "02", title: "Codify everything", body: "Terraform for infrastructure, containers for workloads, secrets managed properly. Environments become reproducible instead of mythical." },
      { num: "03", title: "Automate the pipeline", body: "CI/CD that tests, builds and ships on every merge — with instant rollback, so deploys stop being events and become routine." },
      { num: "04", title: "Watch it like we own it", body: "Metrics, logs, traces and alerts tuned to signal, not noise. Problems page a dashboard before they page a customer." },
    ],
    benefits: [
      { title: "Deploy on a Friday", body: "Pipelines with tests, canaries and one-click rollback make releases so safe the day of the week stops mattering.", stat: { value: 10, suffix: "×", label: "more frequent releases" } },
      { title: "Sleep through the night", body: "Self-healing workloads and tested failovers mean 3am alerts become a story you tell, not a lifestyle.", stat: { value: 80, suffix: "%", label: "fewer incidents" } },
      { title: "Pay for what you use", body: "Right-sizing, autoscaling and spot strategies routinely claw back a third of the bill.", stat: { value: 35, suffix: "%", label: "cloud cost saved" } },
      { title: "Scale on demand", body: "Traffic spikes become autoscaling events, not emergency calls. Your best day stops being your riskiest.", stat: { value: 0, suffix: "", label: "panic deploys" } },
    ],
    growth: {
      caption: "Deployment frequency after pipeline automation — from monthly releases everyone fears to daily releases nobody notices.",
      labels: ["Audit", "Wk 2", "Wk 4", "Wk 6", "Wk 8", "Mo 3", "Mo 4", "Mo 6"],
      series: [10, 16, 28, 44, 58, 72, 86, 96],
      headline: { value: 10, suffix: "×", label: "release velocity" },
    },
    lose: {
      heading: "The cost of fragile infrastructure",
      sub: "Downtime doesn't just cost the outage — it costs the trust, the refunds, and the engineers who leave.",
      without: [
        "Every deploy is a gamble performed after midnight",
        "One engineer holds the whole system in their head",
        "Outages discovered by customers, then by Twitter",
        "Cloud spend grows faster than revenue, unexamined",
      ],
      withUs: [
        "Ship any commit in minutes with automated rollback",
        "Infrastructure as code — the system is in the repo, not a head",
        "Alerts catch regressions minutes before users would",
        "Spend tracked per service, trimmed every quarter",
      ],
      decline: [58, 54, 49, 43, 37, 30, 23, 16],
      rise: [58, 63, 69, 75, 82, 88, 93, 97],
    },
    tags: ["CI/CD pipelines", "Containerized workloads", "Monitoring and resilience"],
    ctaLine: "Send us your architecture diagram — or the fear of drawing one. We'll take it from there.",
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    em: "AI",
    eyebrow: "SERVICE 04 — LEVERAGE, NOT HYPE",
    intro:
      "Practical AI integrations, workflow automation and decision-support systems that create measurable efficiency. No moonshots, no demos that die in a slide deck — systems that quietly remove thousands of hours of work.",
    img: U("1526374965328-7f61d4dc18c5"),
    heroStats: [
      { value: 1000, suffix: "s", label: "OF HOURS AUTOMATED" },
      { value: 90, suffix: "%", label: "FIRST-PASS ACCURACY" },
      { value: 6, suffix: "wk", label: "TO FIRST AUTOMATION" },
    ],
    how: [
      { num: "01", title: "Find the leverage", body: "We audit your workflows for the repetitive, rules-plus-judgment work where AI pays for itself fastest — and rank it by hours saved, not by hype." },
      { num: "02", title: "Prototype on your data", body: "A working pilot on real cases within weeks, measured against humans doing the same task. Numbers decide whether it scales, not vibes." },
      { num: "03", title: "Build the guardrails", body: "Confidence thresholds, human-in-the-loop review and full audit trails. The system knows what it doesn't know and escalates instead of guessing." },
      { num: "04", title: "Scale what works", body: "Pilots that clear the bar become production systems wired into your tools — monitored, retrained and improving with every case they see." },
    ],
    benefits: [
      { title: "Give teams their week back", body: "Document processing, triage, data entry and reporting run themselves. People move to work that needs a person.", stat: { value: 30, suffix: "h", label: "saved weekly, per team" } },
      { title: "Answer in seconds", body: "Copilots over your own knowledge base turn every employee into your most experienced one.", stat: { value: 10, suffix: "×", label: "faster lookups" } },
      { title: "Decide with evidence", body: "Decision-support that surfaces the signal in your data — forecasts and anomalies before they become surprises.", stat: { value: 90, suffix: "%", label: "forecast accuracy" } },
      { title: "Scale without headcount", body: "Volume doubles, the automation absorbs it. Growth stops being a hiring problem.", stat: { value: 2, suffix: "×", label: "volume, same team" } },
    ],
    growth: {
      caption: "Share of routine casework handled automatically — typical ramp as guardrails earn trust and coverage widens.",
      labels: ["Pilot", "Wk 4", "Wk 8", "Wk 12", "Mo 4", "Mo 6", "Mo 9", "Yr 1"],
      series: [6, 15, 28, 42, 58, 72, 85, 94],
      headline: { value: 70, suffix: "%", label: "routine work automated" },
    },
    lose: {
      heading: "The cost of waiting on AI",
      sub: "AI advantage compounds: every month of data, tuning and trust your competitor accrues is a month you can't buy back.",
      without: [
        "Senior people spend afternoons on copy-paste triage",
        "Competitors quote in minutes while you quote in days",
        "Institutional knowledge leaves in resignation letters",
        "Scaling means hiring, training and hoping",
      ],
      withUs: [
        "Routine work handled before anyone opens a laptop",
        "Instant responses from copilots trained on your knowledge",
        "Expertise captured in systems that never resign",
        "Capacity scales with compute, not with job boards",
      ],
      decline: [57, 54, 49, 44, 37, 30, 23, 17],
      rise: [57, 62, 68, 75, 82, 89, 94, 98],
    },
    tags: ["AI copilots", "Operational automation", "Data-informed workflows"],
    ctaLine: "Bring us your most tedious workflow. In six weeks it runs itself.",
  },
  {
    slug: "ui-ux-systems",
    title: "UI/UX Systems",
    em: "UX",
    eyebrow: "SERVICE 05 — DESIGN THAT CONVERTS",
    intro:
      "Product interfaces and design systems that make complex software easier to adopt and scale. Beautiful is table stakes — we design for comprehension, conversion, and the moment a user decides your product is worth paying for.",
    img: U("1581291518857-4e27b48ff24e"),
    heroStats: [
      { value: 2, suffix: "×", label: "TYPICAL CONVERSION LIFT" },
      { value: 40, suffix: "%", label: "FEWER SUPPORT TICKETS" },
      { value: 100, suffix: "+", label: "SYSTEM COMPONENTS" },
    ],
    how: [
      { num: "01", title: "Watch real users", body: "UX discovery with the people who actually use the product. The friction they've stopped noticing is where the conversion lives." },
      { num: "02", title: "Design the system", body: "Not screens — a system. Tokens, components and patterns that keep every future screen consistent and make the next feature cheaper than the last." },
      { num: "03", title: "Prototype and test", body: "Interactive prototypes in front of users before engineering spends a sprint. Wrong ideas die in Figma, where they're cheap." },
      { num: "04", title: "Ship with engineering", body: "Designers and engineers in the same room (ours), so what ships is what was designed — down to the easing curves." },
    ],
    benefits: [
      { title: "Convert more of your traffic", body: "Journeys engineered around decision moments turn the same ad spend into more revenue.", stat: { value: 2, suffix: "×", label: "signup conversion" } },
      { title: "Onboard without hand-holding", body: "Interfaces that explain themselves cut support tickets and training sessions at the knees.", stat: { value: 40, suffix: "%", label: "fewer tickets" } },
      { title: "Ship features faster", body: "A design system means new screens assemble from proven parts instead of starting from white canvas.", stat: { value: 3, suffix: "×", label: "faster UI delivery" } },
      { title: "Look like the leader", body: "Polish is positioning. Products that feel premium get premium pricing and premium trust.", stat: { value: 1, suffix: "st", label: "impression, won" } },
    ],
    growth: {
      caption: "Trial-to-paid conversion through a redesigned onboarding journey — typical post-launch trajectory.",
      labels: ["Before", "Launch", "Wk 2", "Wk 4", "Wk 8", "Mo 3", "Mo 5", "Mo 6"],
      series: [20, 28, 38, 50, 62, 74, 86, 94],
      headline: { value: 2, suffix: "×", label: "trial-to-paid conversion" },
    },
    lose: {
      heading: "The cost of confusing software",
      sub: "Users don't file bugs about bad UX — they just leave, and the analytics look like a mystery.",
      without: [
        "Paid traffic bounces off a first screen it doesn't understand",
        "Every feature ships with its own inconsistent UI debt",
        "Support headcount grows linearly with your user base",
        "Churn gets blamed on price when it's actually friction",
      ],
      withUs: [
        "First-time users reach the aha moment in minutes",
        "A design system keeps a hundred screens feeling like one product",
        "Self-serve users who never need to email support",
        "Retention driven by software that feels effortless",
      ],
      decline: [56, 53, 49, 44, 38, 32, 26, 20],
      rise: [56, 61, 67, 74, 81, 88, 93, 97],
    },
    tags: ["UX discovery", "Design systems", "Conversion-oriented journeys"],
    ctaLine: "Send us the screen your users complain about. We'll send back the one they'll love.",
  },
  {
    slug: "dedicated-teams",
    title: "Dedicated Teams",
    em: "Teams",
    eyebrow: "SERVICE 06 — YOUR ROADMAP, OUR SQUAD",
    intro:
      "Cross-functional delivery squads that plug into your roadmap and move with the speed of an in-house team — senior engineers, designers and a lead who answers to your outcomes, available in days instead of hiring quarters.",
    img: U("1552664730-d307ca884978"),
    heroStats: [
      { value: 2, suffix: "wk", label: "TO A WORKING SQUAD" },
      { value: 100, suffix: "%", label: "SENIOR ENGINEERS" },
      { value: 0, suffix: "", label: "RECRUITMENT FEES" },
    ],
    how: [
      { num: "01", title: "Shape the squad", body: "We compose the exact mix your roadmap needs — engineers, a designer, a lead — matched to your stack and your time zone overlap." },
      { num: "02", title: "Embed in your flow", body: "Your standups, your tools, your repos. Within a sprint the squad feels in-house; the only difference is who runs payroll." },
      { num: "03", title: "Deliver in sprints", body: "Agile delivery with demos every sprint, transparent velocity and a roadmap you re-prioritize whenever the business shifts." },
      { num: "04", title: "Scale or hand over", body: "Flex the squad up or down with the roadmap — and when you build your own team, we document, mentor and hand over cleanly." },
    ],
    benefits: [
      { title: "Skip the hiring year", body: "A senior squad in two weeks instead of six-month searches, sign-on bonuses and bad-hire write-offs.", stat: { value: 12, suffix: "×", label: "faster than hiring" } },
      { title: "Senior from day one", body: "No juniors learning on your budget. Every seat is someone who has shipped production systems for years.", stat: { value: 10, suffix: "+", label: "years average experience" } },
      { title: "Flex with the roadmap", body: "Three engineers this quarter, five the next, two after launch. Capacity follows the plan, not the org chart.", stat: { value: 0, suffix: "", label: "idle salaries" } },
      { title: "Keep the knowledge", body: "Documentation, pairing and handover built into the engagement — the expertise stays when the squad rolls off.", stat: { value: 100, suffix: "%", label: "knowledge retained" } },
    ],
    growth: {
      caption: "Roadmap items delivered per quarter after a squad embeds — versus the flat line of a stalled hiring pipeline.",
      labels: ["Embed", "Sprint 2", "Sprint 4", "Sprint 6", "Q2", "Q3", "Q4", "Yr 1"],
      series: [15, 26, 38, 50, 63, 75, 87, 95],
      headline: { value: 3, suffix: "×", label: "roadmap velocity" },
    },
    lose: {
      heading: "The cost of an empty seat",
      sub: "Every month a role stays unfilled, the roadmap slips a month — and the market doesn't wait for your recruiter.",
      without: [
        "Six-month searches while the roadmap gathers dust",
        "One resignation can stall an entire product line",
        "Recruiter fees and sign-on bonuses before any code ships",
        "Juniors learn on your deadline and your budget",
      ],
      withUs: [
        "A proven squad shipping within two weeks",
        "Bench depth — a seat never stays empty",
        "One predictable invoice, zero recruitment overhead",
        "Senior output from the first sprint onward",
      ],
      decline: [54, 52, 48, 44, 39, 33, 27, 21],
      rise: [54, 59, 66, 73, 80, 87, 93, 97],
    },
    tags: ["Senior talent", "Agile delivery", "Transparent collaboration"],
    ctaLine: "Tell us what the roadmap needs. The squad can be in your standup in two weeks.",
  },
];

export const serviceBySlug = (slug: string) => SERVICE_DETAILS.find((s) => s.slug === slug);
