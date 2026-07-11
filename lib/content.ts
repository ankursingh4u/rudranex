// ═══ ALL SITE CONTENT — VERBATIM per spec. Do not reword or reorder. ═══

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Team", href: "#team" },
  { label: "Tech", href: "#tech" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
] as const;

const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const HERO = {
  eyebrow: "JAIPUR · INDIA · WORLDWIDE",
  // h1 rendered with "Era" as an ember <em>
  sub: "We build powerful, scalable and innovative digital solutions that drive business growth and create meaningful impact — globally.",
  ctas: [
    { label: "Explore Services", href: "#services" },
    { label: "Start a Project", href: "#contact" },
  ],
  cards: [
    { value: "50+", label: "PROJECTS DELIVERED" },
    { value: "40+", label: "COUNTRIES SERVED" },
    { value: "100%", label: "CLIENT SATISFACTION" },
    { value: "24H", label: "RESPONSE TIME" },
  ],
  centerLabel: "TRUSTED GLOBALLY · DELIVERED RELENTLESSLY",
  scrollLabel: "Scroll to explore",
} as const;

export const MARQUEE = [
  "Next.js", "React", "TypeScript", "Tailwind", "Node.js", "Python", "GraphQL",
  "REST APIs", "AWS", "GCP", "Docker", "Kubernetes", "PostgreSQL", "Redis",
  "Terraform", "CI/CD",
] as const;

export const WORLDS = [
  { eyebrow: "WHAT WE BUILD", title: "Services", body: "Custom software, mobile, cloud, AI, design and dedicated teams — engineered around your business model.", link: "Enter Services", href: "#services", img: U("1461749280684-dccba630e2f6") },
  { eyebrow: "HOW WE WORK", title: "Process", body: "Discovery, design, build, launch — organized, calm and inevitable, with visible milestones the whole way.", link: "Enter Process", href: "#process", img: U("1531482615713-2afd69097998") },
  { eyebrow: "WHAT WE'VE SHIPPED", title: "Work", body: "Real outcomes across fintech, e-commerce and SaaS — from scattered prototypes to production platforms.", link: "Enter Work", href: "#work", img: U("1454165804606-c3d57bc86b40") },
  { eyebrow: "HOW TO ENGAGE", title: "Pricing", body: "Scoped builds, platform programs, and strategic partnerships — clear value with no anxiety.", link: "Enter Pricing", href: "#pricing", img: U("1607799279861-4dd421887fb3") },
  { eyebrow: "WHO WE ARE", title: "About", body: "A Jaipur-based studio on a mission to build digital solutions for the next era — with clarity, ownership and ambition.", link: "Enter About", href: "#about", img: U("1522071820081-009f0129c71c") },
  { eyebrow: "START A PROJECT", title: "Contact", body: "Tell us what you're building. We respond within 24 hours — anywhere in the world.", link: "Enter Contact", href: "#contact", img: U("1486312338219-ce68d2c6f44d") },
] as const;

export const TEAM = {
  eyebrow: "THE PEOPLE",
  members: [
    {
      name: "Jatin Prajapati",
      role: "Founder & CEO",
      img: "/team/jatin.png",
      imgPos: "50% 28%",
      text: "The strongest systems are not the loudest ones — they are the ones teams can rely on when the stakes are real. We build for that kind of trust.",
      link: null,
    },
    {
      name: "Ankur Singh",
      role: "Senior Software Engineer",
      img: "/team/ankur.png",
      imgPos: "50% 16%",
      text: "Builds and ships the systems behind the work — from architecture and APIs to the last mile of delivery. He keeps the codebase clean, the pipelines reliable, and the product moving, so what we hand over is something a team can own with confidence.",
      link: "https://ankursingh.site",
    },
  ],
} as const;

export const SERVICES = {
  eyebrow: "WHAT WE DO",
  body: "Most studios are good at one thing and outsource the rest. We do the whole stack in-house — so the people designing it, building it and scaling it are all in the same room.",
  rows: [
    { num: "01", title: "Custom Software", body: "Scalable web platforms, internal systems, and customer-facing products built around your business model.", tags: ["Solution architecture", "Platform engineering", "Modern frontend delivery"] },
    { num: "02", title: "Mobile Apps", body: "Native-feeling mobile experiences for iOS and Android with a strong product and performance focus.", tags: ["Consumer apps", "Operational apps", "Ongoing release support"] },
    { num: "03", title: "Cloud & DevOps", body: "Reliable infrastructure, deployment pipelines, and observability for teams that need predictable scale.", tags: ["CI/CD pipelines", "Containerized workloads", "Monitoring and resilience"] },
    { num: "04", title: "AI & Automation", body: "Practical AI integrations, workflow automation, and decision-support systems that create measurable efficiency.", tags: ["AI copilots", "Operational automation", "Data-informed workflows"] },
    { num: "05", title: "UI/UX Systems", body: "Product interfaces and design systems that make complex software easier to adopt and scale.", tags: ["UX discovery", "Design systems", "Conversion-oriented journeys"] },
    { num: "06", title: "Dedicated Teams", body: "Cross-functional delivery squads that plug into your roadmap and move with the speed of an in-house team.", tags: ["Senior talent", "Agile delivery", "Transparent collaboration"] },
  ],
} as const;

export const WORK = [
  { title: "IT Consulting & Strategy", tags: ["Technology audits", "Transformation roadmaps", "CTO-as-a-service"] },
  { title: "Business Registration Worldwide", tags: ["Company incorporation in 40+ countries", "Cross-border compliance", "Global expansion planning"] },
  { title: "Digital Marketing & Growth", tags: ["SEO & content strategy", "Paid advertising", "Analytics & attribution"] },
  { title: "Product Roadmap & Strategy", tags: ["Feature prioritization", "Go-to-market strategy", "Milestone planning"] },
] as const;

export const TECH_GROUPS = [
  { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind"] },
  { label: "Backend", items: ["Node.js", "Python", "GraphQL", "REST APIs"] },
  { label: "Cloud", items: ["AWS", "GCP", "Docker", "Kubernetes"] },
  { label: "Data & Ops", items: ["PostgreSQL", "Redis", "Terraform", "CI/CD"] },
] as const;

export const PROCESS = [
  { num: "01", title: "Discovery", body: "We align on business goals, constraints, users, and delivery priorities before architecture begins." },
  { num: "02", title: "Solution Design", body: "We shape the product, delivery plan, and technical approach with clarity around scale and risk." },
  { num: "03", title: "Build & Iterate", body: "Our team ships in tight feedback loops with visible milestones, quality checks, and stakeholder syncs." },
  { num: "04", title: "Launch & Scale", body: "We support rollout, optimization, and ongoing growth once the product is live in the real world." },
] as const;

export const RELIABILITY = {
  paragraph: "We build powerful, scalable and innovative digital solutions that drive business growth and create meaningful impact — globally.",
  stats: [
    { value: 50, suffix: "+", label: "Projects delivered", body: "Across 40+ countries and six core industries." },
    { value: 100, suffix: "%", label: "Client satisfaction", body: "Teams come back when the stakes are high." },
    { value: 24, suffix: "h", label: "Response time", body: "We move fast and stay reachable." },
    { value: 10, suffix: "", label: "Disciplines in-house", body: "Strategy to launch under one accountable roof." },
  ],
} as const;

export const TESTIMONIAL = {
  quote: "We started Rudranex to prove that serious software can also be calm — senior people, honest timelines, and code you can hand to your own team with pride.",
  attribution: "JATIN PRAJAPATI — FOUNDER · RUDRANEX",
} as const;

export const FAQ = [
  {
    q: "We've been burned by an agency before. Why would this be different?",
    a: "Because the people who pitch you are the people who build for you — senior engineers, not juniors you never meet. You get visible milestones, working software every week, and at the end you own clean code your own team can maintain. Most of our long-term clients came to us after a bad agency experience.",
  },
  {
    q: "We don't know exactly what we need yet. Is that a problem?",
    a: "Not at all — that's often the best place to start. We begin with a short discovery that turns a rough idea into a clear scope, so you commit to a plan, not a guess. Plenty of our strongest projects arrived as a paragraph and a hunch.",
  },
  {
    q: "How do we know it'll actually ship?",
    a: "Because you watch it ship the whole way. We work in short cycles with visible milestones and working software every week — no black boxes, no big-bang reveal at the end. If something drifts, you know in days, not months.",
  },
  {
    q: "What happens after launch?",
    a: "Every engagement includes a post-launch window, and we don't vanish the moment it goes live. We monitor, harden and iterate — and for ongoing partnerships we stay on as your product and platform keep growing.",
  },
  {
    q: "Can you work with our existing team and codebase?",
    a: "Yes. We regularly embed with in-house teams and take over existing codebases. We start with an honest architecture review, then improve and extend without breaking what already works.",
  },
  {
    q: "We're not based in India. Does that matter?",
    a: "No. We work with clients across 40+ countries and are built for remote, async collaboration. Clear communication and overlapping hours matter far more than a shared postcode.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do — fully. All code, IP and assets are yours, handed over clean and documented so your own team can own and maintain them. That's written into every engagement from day one.",
  },
] as const;

export const CTA = {
  eyebrow: "YOUR NEXT ERA STARTS HERE",
  // h2 rendered with "anything" as an ember <em>
  button: "Launch a Project",
  contact: ["hello@rudranex.in", "+91 77259 71086", "Jaipur, Rajasthan, India"],
} as const;

export const FOOTER = {
  tagline: "Building digital solutions for the next era.",
  connect: ["hello@rudranex.in", "+91 77259 71086", "Jaipur, Rajasthan, India"],
  copyright: "© 2026 Rudranex. All rights reserved.",
} as const;
