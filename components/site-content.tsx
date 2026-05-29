import type { ReactNode } from "react";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const homepageStats = [
  { value: 1, suffix: "", label: "Founder-Led Vision" },
  { value: 100, suffix: "%", label: "Custom Delivery Focus" },
  { value: 1, suffix: " Day", label: "Response Goal" },
  { value: 360, suffix: "°", label: "Product Thinking" },
] as const;

export const trustHighlights = [
  "Product Strategy",
  "Custom Engineering",
  "Cloud Delivery",
  "Security-First Execution",
  "Long-Term Support",
  "IT Consulting",
  "Global Business Setup",
  "Digital Marketing",
  "Product Roadmaps",
  "App Development",
  "Web Development",
  "AI & Automation",
] as const;

export const serviceDetails = [
  {
    title: "Custom Software Development",
    body:
      "Scalable web platforms, internal systems, and customer-facing products built around your business model.",
    points: ["Solution architecture", "Platform engineering", "Modern frontend delivery"],
  },
  {
    title: "Mobile Application Delivery",
    body:
      "Native-feeling mobile experiences for iOS and Android with a strong product and performance focus.",
    points: ["Consumer apps", "Operational apps", "Ongoing release support"],
  },
  {
    title: "Cloud & DevOps",
    body:
      "Reliable infrastructure, deployment pipelines, and observability for teams that need predictable scale.",
    points: ["CI/CD pipelines", "Containerized workloads", "Monitoring and resilience"],
  },
  {
    title: "AI & Automation",
    body:
      "Practical AI integrations, workflow automation, and decision-support systems that create measurable efficiency.",
    points: ["AI copilots", "Operational automation", "Data-informed workflows"],
  },
  {
    title: "UI/UX Systems",
    body:
      "Product interfaces and design systems that make complex software easier to adopt and scale.",
    points: ["UX discovery", "Design systems", "Conversion-oriented journeys"],
  },
  {
    title: "Dedicated Teams",
    body:
      "Cross-functional delivery squads that plug into your roadmap and move with the speed of an in-house team.",
    points: ["Senior talent", "Agile delivery", "Transparent collaboration"],
  },
  {
    title: "IT Consulting & Strategy",
    body:
      "Senior-level guidance on technology architecture, digital transformation strategy, and IT decisions that align engineering with real business goals.",
    points: ["Technology audits & assessments", "Digital transformation roadmaps", "CTO-as-a-service"],
  },
  {
    title: "Business Registration Worldwide",
    body:
      "We handle the full process of legally incorporating and structuring businesses in countries across the globe — from documentation to compliance and banking setup.",
    points: ["Company incorporation globally", "Multi-jurisdiction compliance", "Cross-border expansion strategy"],
  },
  {
    title: "Digital Marketing & Growth",
    body:
      "End-to-end marketing that builds an audience, converts customers, and scales reach — SEO, content, paid media, and analytics working together.",
    points: ["SEO & content strategy", "Performance advertising", "Analytics & growth tracking"],
  },
  {
    title: "Product Roadmap & Strategy",
    body:
      "From raw idea to a clear 12-month execution plan — we build prioritized, realistic product roadmaps aligned to market timing and delivery capacity.",
    points: ["Feature prioritization frameworks", "Go-to-market strategy", "Milestone & delivery planning"],
  },
] as const;

export const industries = [
  {
    title: "Fintech & Payments",
    body: "Secure platforms, transaction workflows, and compliance-aware digital experiences.",
  },
  {
    title: "Healthcare",
    body: "Reliable patient, provider, and operations systems built with privacy and continuity in mind.",
  },
  {
    title: "E-commerce",
    body: "Commerce journeys, backend integrations, and conversion-focused customer experiences.",
  },
  {
    title: "Logistics",
    body: "Tracking, operations visibility, and workflow automation for distributed teams and supply chains.",
  },
  {
    title: "SaaS Platforms",
    body: "Multi-tenant products, admin surfaces, analytics, and subscription-ready digital infrastructure.",
  },
  {
    title: "Enterprise Operations",
    body: "Internal tools that simplify approval flows, reporting, and day-to-day operational complexity.",
  },
] as const;

export const processSteps = [
  {
    title: "Discovery",
    body: "We align on business goals, constraints, users, and delivery priorities before architecture begins.",
  },
  {
    title: "Solution Design",
    body: "We shape the product, delivery plan, and technical approach with clarity around scale and risk.",
  },
  {
    title: "Build & Iterate",
    body: "Our team ships in tight feedback loops with visible milestones, quality checks, and stakeholder syncs.",
  },
  {
    title: "Launch & Scale",
    body: "We support rollout, optimization, and ongoing growth once the product is live in the real world.",
  },
] as const;

export const caseStudies = [
  {
    title: "Discovery-Led Product Build",
    challenge: "A growing business needed a clearer path from idea to launch without overbuilding too early.",
    solution: "Rudranex shaped the product scope, delivery plan, and technical direction around practical milestones.",
    outcome: "The team moved forward with stronger clarity, lower delivery friction, and a launch-ready roadmap.",
    tags: ["Strategy", "Product", "Delivery"],
  },
  {
    title: "Operational Workflow Modernization",
    challenge: "Manual coordination and disconnected tools were slowing down everyday execution.",
    solution: "We designed a focused software workflow that improved visibility and reduced repetitive work.",
    outcome: "Internal operations became easier to manage, faster to review, and more consistent across teams.",
    tags: ["Operations", "Automation", "Systems"],
  },
  {
    title: "Scalable Digital Experience",
    challenge: "A business needed a modern customer-facing experience that felt stronger, faster, and easier to trust.",
    solution: "Rudranex delivered a cleaner digital experience supported by maintainable engineering decisions.",
    outcome: "The result was a more confident brand presence and a stronger base for future product growth.",
    tags: ["Experience", "Engineering", "Growth"],
  },
] as const;

export const differentiators = [
  {
    title: "Business-first engineering",
    body: "We connect delivery decisions to growth, efficiency, and operational outcomes instead of shipping features in isolation.",
  },
  {
    title: "Senior execution",
    body: "Our work emphasizes architecture quality, clean delivery, and communication mature enough for critical initiatives.",
  },
  {
    title: "Security-minded systems",
    body: "We design for reliability, access control, and scale from the start so products hold up under real-world pressure.",
  },
] as const;

export const engagementModels = [
  {
    title: "Project Delivery",
    body: "Best for defined scopes, launches, and transformation milestones with clear business outcomes.",
  },
  {
    title: "Dedicated Team",
    body: "Best for growing roadmaps that need consistent product, engineering, and delivery velocity.",
  },
  {
    title: "Strategic Partner",
    body: "Best for long-term digital modernization where product thinking and execution both matter.",
  },
] as const;

export const companyValues = [
  {
    title: "Clarity",
    body: "We keep strategy, scope, and execution visible so decisions stay aligned and delivery stays calm.",
  },
  {
    title: "Ownership",
    body: "We take responsibility for product quality, technical decisions, and the outcomes our work creates.",
  },
  {
    title: "Ambition",
    body: "We like solving meaningful problems and building systems that stand up to real scale.",
  },
] as const;

export const careerBenefits = [
  "High-ownership work",
  "Cross-functional collaboration",
  "Modern engineering stack",
  "Growth-focused culture",
  "Meaningful client work",
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
] as const;

export const techGroups: Array<{ title: string; items: string[] }> = [
  { title: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Python", "GraphQL", "REST APIs"] },
  { title: "Cloud", items: ["AWS", "GCP", "Docker", "Kubernetes"] },
  { title: "Data & Ops", items: ["PostgreSQL", "Redis", "Terraform", "CI/CD"] },
];

export const testimonials = [
  {
    quote: "Rudranex helped us move from a scattered prototype to a production-ready platform. Their discipline and communication set a new standard for what we expected from a technology partner.",
    name: "A. Sharma",
    role: "Founder",
    company: "B2B SaaS Platform",
    location: "India",
  },
  {
    quote: "We had worked with two agencies before Rudranex. The difference in technical clarity and execution quality was immediately obvious. They understand the business behind the code.",
    name: "R. Patel",
    role: "CTO",
    company: "Fintech Startup",
    location: "UAE",
  },
  {
    quote: "From helping us register the company legally to building our MVP and launching marketing — Rudranex handled everything with professionalism. A full-stack business partner.",
    name: "S. Mehta",
    role: "CEO",
    company: "E-commerce Venture",
    location: "United Kingdom",
  },
  {
    quote: "The roadmap Rudranex created gave us six months of clarity in a space where we previously struggled to plan two weeks ahead. That alone was worth the engagement.",
    name: "N. Kumar",
    role: "Product Lead",
    company: "Logistics Platform",
    location: "Singapore",
  },
] as const;

export const pricingTiers = [
  {
    name: "Scoped Build",
    badge: null as null | string,
    price: "₹1.5L+",
    period: "per project",
    description: "For focused, well-defined projects with clear scope, fast delivery, and lean execution.",
    features: [
      "Custom web or mobile application",
      "Up to 3 core modules",
      "1 revision cycle",
      "4–8 week delivery",
      "Basic cloud deployment",
      "30 days post-launch support",
      "Email communication",
    ],
    cta: "Start a scoped build",
    ctaHref: "/contact",
    highlight: false,
  },
  {
    name: "Platform Program",
    badge: "Most popular" as null | string,
    price: "₹4L+",
    period: "per project",
    description: "For growing businesses that need a full platform, deeper integrations, and a longer delivery runway.",
    features: [
      "Full-stack web + mobile delivery",
      "Unlimited modules & integrations",
      "3 revision cycles",
      "2–4 month delivery",
      "CI/CD pipeline & DevOps setup",
      "90 days post-launch support",
      "Priority communication",
      "Dedicated project lead",
      "Product roadmap included",
    ],
    cta: "Launch a platform",
    ctaHref: "/contact",
    highlight: true,
  },
  {
    name: "Strategic Partner",
    badge: null as null | string,
    price: "Custom",
    period: "monthly engagement",
    description: "For ambitious businesses that need a long-term technical partner, dedicated team, and full-service support.",
    features: [
      "Dedicated engineering team",
      "Ongoing product delivery",
      "CTO-level technical strategy",
      "Business registration support (global)",
      "Digital marketing & growth strategy",
      "Product roadmap & strategy",
      "SLA-backed response time",
      "Custom billing structure",
      "White-glove onboarding",
    ],
    cta: "Discuss partnership",
    ctaHref: "/contact",
    highlight: false,
  },
] as const;

export const globalCapabilities = [
  {
    eyebrow: "CONSULTING",
    title: "IT Consulting & Strategy",
    body: "Senior-level guidance on technology architecture, digital transformation, and strategic IT decisions that align engineering with your actual business model.",
    points: ["Technology audits", "Transformation roadmaps", "CTO-as-a-service"],
    stat: "Strategy first",
  },
  {
    eyebrow: "GLOBAL SETUP",
    title: "Business Registration Worldwide",
    body: "We handle the complete process of legally incorporating and structuring businesses in 40+ countries — documentation, compliance, banking, and beyond.",
    points: ["Company incorporation", "Cross-border compliance", "Global expansion planning"],
    stat: "40+ countries",
  },
  {
    eyebrow: "MARKETING",
    title: "Digital Marketing & Growth",
    body: "Performance-driven campaigns, SEO, content, and paid media that compound over time into measurable customer acquisition and brand authority.",
    points: ["SEO & content strategy", "Paid advertising", "Analytics & attribution"],
    stat: "Data-driven growth",
  },
  {
    eyebrow: "PLANNING",
    title: "Product Roadmap & Strategy",
    body: "From ambiguous idea to a clear 12-month execution plan — we create product roadmaps that are realistic, prioritized, and timed to market opportunity.",
    points: ["Feature prioritization", "Go-to-market strategy", "Milestone planning"],
    stat: "Clarity in 1 week",
  },
] as const;

export const pricingFaq = [
  {
    question: "Do you offer fixed-price projects?",
    answer: "Yes. Scoped Build and Platform Program engagements are typically fixed-price once the scope is defined. We scope carefully before committing so there are no surprises.",
  },
  {
    question: "Can you help register a business outside India?",
    answer: "Absolutely. We support business registration and legal setup in 40+ countries including the UK, UAE, USA, Singapore, and across Europe. We handle documentation, compliance, and bank account setup guidance.",
  },
  {
    question: "What does the Strategic Partner engagement include?",
    answer: "It is a fully custom monthly engagement. Typically this means a dedicated team, ongoing product and platform delivery, CTO-level strategy, business operations support, and digital marketing — everything under one roof.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Scoped builds usually take 4–8 weeks. Platform programs run 2–4 months. Strategic partnerships are ongoing. All timelines are agreed upfront after a discovery session.",
  },
  {
    question: "Do you offer any payment flexibility?",
    answer: "Yes. For larger engagements we structure payment in milestones — typically 30–40% upfront and the rest tied to delivery checkpoints. We are transparent about this from the first conversation.",
  },
  {
    question: "What happens after the project launches?",
    answer: "Every engagement includes post-launch support. Scoped builds get 30 days, platform programs get 90 days. Strategic partners get continuous support as part of the monthly structure.",
  },
] as const;

export const contactDetails = {
  email: "support@rudranex.com",
  phoneLabel: "+91 77259 71086",
  phoneHref: "tel:+917725971086",
  whatsappHref: "https://wa.me/917725971086",
  location: "Jaipur, Rajasthan, India",
  founder: "Jatin Prajapati",
} as const;

export const mediaLibrary = {
  about: {
    // Team collaborating at modern workspace
    hero: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    // Code architecture on dark monitor
    storyPrimary: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    // Focused whiteboard strategy session
    storySecondary: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  services: {
    // Developer dual-monitor setup
    hero: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    // Clean code on laptop screen
    engineering: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    // Hands on smartphone UI
    mobile: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    // Glowing server rack in datacenter
    cloud: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    // AI / neural-network visualization
    automation: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80",
    // Design wireframes and tablet
    ux: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    // Cross-functional team standup
    teams: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  },
  solutions: {
    // Satellite / global connectivity
    hero: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    // Analytics dashboard on monitor
    operations: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    // Product UI on screen, design-focused
    product: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80",
    // Circuit board close-up (hardware automation)
    automation: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    // Blue network cables / infrastructure
    scale: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
  },
  caseStudies: {
    // Aerial city view — global scale
    hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    // Team in focused review session
    spotlight: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    // Dark-theme SaaS product code
    saas: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
    // Digital data matrix / ML
    ai: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    // Premium office interior / experience
    experience: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  careers: {
    // Person coding at clean desk
    hero: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=800&q=80",
    // Open-plan modern tech office
    culture: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
  },
  contact: {
    // Person typing on laptop, communication
    hero: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    desk: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
  },
} as const;

export const aboutPageContent = {
  hero: {
    eyebrow: "ABOUT RUDRANEX",
    title: "A founder-led software company built for complex delivery.",
    body:
      "Rudranex helps businesses move from unclear requirements, scattered tools, and delivery bottlenecks to dependable digital products and operational systems that are easier to trust and easier to scale.",
    highlights: ["Founder-led clarity", "Enterprise-grade execution", "Quiet, high-trust delivery"],
    media: mediaLibrary.about.hero,
    mediaAlt: "Editorial brand-story visual representing founder-led clarity and structured software delivery",
  },
  founder: {
    label: "Founder perspective",
    title: "Jatin Prajapati built Rudranex around calm execution and honest engineering.",
    body:
      "Jatin leads Rudranex with a balanced view of product, engineering, and business value. The company was shaped around a simple belief: serious digital work should feel clearer, more responsible, and more practical than most teams experience elsewhere.",
    quote:
      "The strongest systems are not the loudest ones. They are the ones teams can rely on when the stakes are real.",
  },
  story: [
    {
      eyebrow: "WHAT WE SOLVE",
      title: "Too much important work still depends on fragile systems and unclear ownership.",
      body:
        "We work with companies that have outgrown ad-hoc tooling, disconnected workflows, or product plans that keep changing without enough technical grounding. Rudranex brings structure to that environment and helps teams move forward with fewer blind spots.",
      points: ["Unclear delivery scope", "Operational bottlenecks", "Products that need stronger technical direction"],
      media: mediaLibrary.about.storyPrimary,
      mediaAlt: "Structured systems visual showing layered platform thinking and connected operating flows",
      stat: "Clarity before code",
    },
    {
      eyebrow: "HOW WE WORK",
      title: "We combine product thinking with delivery discipline.",
      body:
        "Our work sits between strategy and execution. We help define the right system, shape the path to delivery, and then build with enough rigor that the final result can hold up in real business conditions.",
      points: ["Architecture with business context", "Visible decision-making", "Execution designed for long-term maintainability"],
      media: mediaLibrary.about.storySecondary,
      mediaAlt: "Editorial architecture visual showing delivery planning, technical direction, and execution structure",
      stat: "Direction plus execution",
    },
  ],
  proof: [
    { label: "Delivery posture", value: "Founder-led" },
    { label: "Typical work", value: "Custom platforms" },
    { label: "Approach", value: "Systems first" },
    { label: "Communication", value: "Direct and clear" },
  ],
  journey: [
    {
      title: "Understand the real constraint",
      body: "We start by identifying whether the real problem is product ambiguity, system complexity, workflow friction, or lack of technical direction.",
    },
    {
      title: "Shape a practical path",
      body: "We translate that understanding into a product, platform, or internal-system plan that feels realistic instead of inflated.",
    },
    {
      title: "Build for trust",
      body: "We execute with the goal of leaving behind software teams can actually operate, extend, and rely on.",
    },
  ],
} as const;

export const servicesPageContent = {
  hero: {
    eyebrow: "SERVICES",
    title: "Core technology services designed for serious business outcomes.",
    body:
      "Rudranex helps companies build products, strengthen platforms, modernize internal systems, and create delivery momentum where complexity has started to slow progress.",
    highlights: ["Software engineering", "Cloud and platform delivery", "Automation and UX systems"],
    media: mediaLibrary.services.hero,
    mediaAlt: "Flagship services visual showing layered platform delivery, engineering systems, and outcome-led execution",
  },
  capabilities: [
    {
      eyebrow: "SOFTWARE ENGINEERING",
      title: "Custom software built around real operating needs.",
      body:
        "We design and deliver custom web platforms, internal systems, and business-critical applications that fit the way your company actually works.",
      outcome: "Cleaner workflows, stronger technical foundations, and products that can grow without constant rework.",
      points: ["Platform architecture", "Operational tools", "Frontend and backend systems"],
      media: mediaLibrary.services.engineering,
      mediaAlt: "Platform delivery visual representing custom engineering systems and operating leverage",
      signal: "From workflow friction to operating leverage",
    },
    {
      eyebrow: "MOBILE DELIVERY",
      title: "Mobile experiences that support both users and operations.",
      body:
        "From customer-facing products to internal mobile tools, we build applications that focus on clarity, speed, and dependable everyday use.",
      outcome: "Mobile products that feel intentional, not like scaled-down web experiences.",
      points: ["Android and iOS planning", "Operational mobile flows", "Release readiness"],
      media: mediaLibrary.services.mobile,
      mediaAlt: "Mobile and communication visual representing fast-moving operational and customer-facing app delivery",
      signal: "Built for hands-on, repeat-use scenarios",
    },
    {
      eyebrow: "CLOUD & DEVOPS",
      title: "Infrastructure that reduces uncertainty as systems grow.",
      body:
        "We strengthen delivery pipelines, hosting strategies, observability, and deployment workflows so your team can scale with fewer surprises.",
      outcome: "More confidence in releases, environments, and operational resilience.",
      points: ["CI/CD", "Cloud architecture", "Monitoring and performance readiness"],
      media: mediaLibrary.solutions.hero,
      mediaAlt: "Abstract orbital cloud diagram representing resilient infrastructure",
      signal: "Operational confidence at scale",
    },
    {
      eyebrow: "AI & AUTOMATION",
      title: "Automation that solves operational drag, not just trend-driven experiments.",
      body:
        "We integrate AI and workflow automation where it creates practical leverage: internal copilots, process acceleration, better information flow, and reduced repetitive work.",
      outcome: "More efficient teams and systems that create measurable time savings.",
      points: ["Internal AI tools", "Workflow automation", "Decision-support systems"],
      media: mediaLibrary.caseStudies.hero,
      mediaAlt: "Structured grid suggesting automated decision paths and internal tooling",
      signal: "Useful automation over novelty",
    },
    {
      eyebrow: "UI/UX SYSTEMS",
      title: "Interfaces that make complex systems easier to trust and use.",
      body:
        "We shape design systems and product flows that bring clarity to enterprise and operational software without sacrificing performance or maintainability.",
      outcome: "Products that feel more coherent, easier to adopt, and stronger at every key interaction.",
      points: ["Experience design", "Design systems", "Interaction refinement"],
      media: mediaLibrary.about.hero,
      mediaAlt: "Editorial systems illustration showing interface layers",
      signal: "Premium experience with functional depth",
    },
    {
      eyebrow: "DEDICATED TEAMS",
      title: "Delivery support that behaves like a serious internal partner.",
      body:
        "When roadmaps are growing and internal capacity is stretched, we embed with your direction and help sustain technical momentum across delivery cycles.",
      outcome: "More continuity, better velocity, and less fragmentation across execution.",
      points: ["Embedded execution", "Roadmap support", "Transparent collaboration"],
      media: mediaLibrary.contact.hero,
      mediaAlt: "Signal-based team collaboration illustration",
      signal: "Continuity where the roadmap cannot slow down",
    },
  ],
  engagementPaths: [
    {
      title: "Project delivery",
      body: "Best when you need a defined initiative shipped with strong direction and clear milestones.",
      fit: "Launches, rebuilds, modernization efforts",
    },
    {
      title: "Dedicated execution",
      body: "Best when your roadmap needs consistent product and engineering support over time.",
      fit: "Growing product teams, ongoing platform work",
    },
    {
      title: "Strategic technology partner",
      body: "Best when the real need is sustained technical judgment alongside delivery.",
      fit: "Longer-term transformation and high-stakes system work",
    },
  ],
  pricing: {
    eyebrow: "ENGAGEMENT GUIDANCE",
    title: "A consultative pricing model that matches the shape of the work.",
    body:
      "Rudranex is not built around one-size-fits-all packages. We frame pricing around delivery shape, technical depth, and how much long-term execution support is needed.",
    bands: [
      {
        name: "Scoped builds",
        range: "Starting from ₹1.5L+",
        fit: "Focused product surfaces, internal tools, validation builds, or contained modernization work.",
      },
      {
        name: "Platform programs",
        range: "Starting from ₹4L+",
        fit: "Broader systems, multi-surface products, deeper integrations, and longer execution windows.",
      },
      {
        name: "Ongoing execution",
        range: "Custom monthly engagement",
        fit: "For roadmaps that need continued design, engineering, and product delivery support over time.",
      },
    ],
    factors: [
      "Scope clarity and system complexity",
      "Integrations, automation depth, and data movement",
      "Delivery timeline, ownership level, and support model",
    ],
  },
} as const;

export const solutionsPageContent = {
  hero: {
    eyebrow: "SOLUTIONS",
    title: "Built for environments where digital execution has to work under pressure.",
    body:
      "Rudranex designs solutions for businesses navigating scale, operational complexity, disconnected systems, and growth decisions that need stronger technical grounding.",
    highlights: ["Operations systems", "Customer platforms", "Automation and visibility"],
    media: mediaLibrary.solutions.hero,
    mediaAlt: "Abstract orbital systems illustration showing connected workflows",
  },
  contexts: [
    {
      title: "Operationally dense businesses",
      body: "When teams rely on too many tools, too many handoffs, and too little visibility, software needs to reduce friction instead of adding more.",
    },
    {
      title: "Products approaching a critical growth phase",
      body: "As customer expectations rise, the underlying system needs stronger performance, clearer structure, and a better long-term delivery model.",
    },
    {
      title: "Modernization without business disruption",
      body: "Replacing or improving existing systems requires technical care, migration discipline, and a realistic transition path.",
    },
  ],
  scenarios: [
    {
      title: "Internal operations systems",
      challenge: "Approval chains, reporting, and day-to-day workflows start slowing execution.",
      response: "We design internal software that centralizes visibility, reduces repeated work, and supports accountable operations.",
      media: mediaLibrary.caseStudies.hero,
      mediaAlt: "Grid-based visual representing enterprise operations workflows",
    },
    {
      title: "Customer-facing digital products",
      challenge: "The product experience feels weaker than the ambition behind the business.",
      response: "We shape product systems that improve clarity, trust, performance, and the foundation for future growth.",
      media: mediaLibrary.about.hero,
      mediaAlt: "Premium interface-like abstract composition for product experience",
    },
    {
      title: "Automation and decision support",
      challenge: "Teams are spending too much time stitching information together manually.",
      response: "We build automation layers and internal tools that give teams faster access to the actions and insight they need.",
      media: mediaLibrary.services.hero,
      mediaAlt: "Structured automation illustration showing linked signals and processes",
    },
    {
      title: "Platform reliability and scale",
      challenge: "Growth exposes weak infrastructure, slow delivery loops, or technical debt that keeps compounding.",
      response: "We strengthen platform architecture, release confidence, and system resilience so growth does not come with chaos.",
      media: mediaLibrary.solutions.scale,
      mediaAlt: "Abstract cloud-scale system orbit illustration",
    },
  ],
  matrix: [
    {
      issue: "Scattered operations and no clear visibility",
      solveWith: "Unified internal tools and workflow systems",
    },
    {
      issue: "A product that looks acceptable but does not feel premium",
      solveWith: "UX refinement with stronger engineering execution",
    },
    {
      issue: "Teams blocked by repetitive manual coordination",
      solveWith: "Automation and decision-support systems",
    },
    {
      issue: "A roadmap growing faster than delivery confidence",
      solveWith: "Platform, DevOps, and embedded execution support",
    },
  ],
} as const;

export const caseStudiesPageContent = {
  hero: {
    eyebrow: "CASE STUDIES",
    title: "Anonymized work shaped around real transformation, not surface polish.",
    body:
      "A large part of our strongest work is confidential, but the problems, decisions, and outcomes still tell a clear story about how Rudranex operates.",
    highlights: ["Enterprise ops systems", "Product builds", "Internal AI tools"],
    media: mediaLibrary.caseStudies.hero,
    mediaAlt: "Enterprise grid illustration suggesting coordinated operational systems",
  },
  spotlight: {
    label: "FEATURED PROGRAM",
    title: "Rebuilding a fragmented enterprise workflow into a dependable internal platform.",
    body:
      "A multi-team business was relying on disconnected tools, slow approvals, and reporting that arrived too late to guide decisions. Rudranex restructured the operating flow around a centralized system that brought together process, visibility, and cleaner execution across teams.",
    impact: ["Fewer manual handoffs", "Stronger operational visibility", "A platform the team could keep extending"],
    media: mediaLibrary.caseStudies.spotlight,
    mediaAlt: "Large-scale abstract workflow board with linked enterprise modules",
  },
  studies: [
    {
      title: "SaaS product foundation reset",
      challenge: "A growing product had strong market intent but weak delivery structure and mounting technical uncertainty.",
      approach: "We reshaped the product architecture, clarified the roadmap, and aligned the build around more stable release decisions.",
      result: "The team gained a more reliable base for expansion and a clearer path from feature ambition to execution.",
      media: mediaLibrary.about.hero,
      mediaAlt: "Abstract product systems composition with layered panels",
    },
    {
      title: "Internal AI support workflow",
      challenge: "A team handling repeated operational decisions needed faster access to context and next-step recommendations.",
      approach: "Rudranex designed an internal AI-assisted workflow that reduced lookup friction and improved how teams surfaced usable information.",
      result: "The system reduced repeated work and created a more scalable decision-support layer without replacing human oversight.",
      media: mediaLibrary.services.hero,
      mediaAlt: "Automation and AI-inspired systems illustration",
    },
    {
      title: "Customer experience modernization",
      challenge: "A digital experience was limiting trust, speed, and the business’s ability to present itself at the right level.",
      approach: "We reworked the experience and supporting engineering decisions to create a product that felt stronger and more maintainable.",
      result: "The business left with a more premium digital presence and a better technical base for future iteration.",
      media: mediaLibrary.contact.hero,
      mediaAlt: "Premium signal-based interface illustration representing customer experience modernization",
    },
  ],
  outcomeBands: ["Clarity", "Operational speed", "Reliability", "Adoption", "Scalable delivery"],
} as const;

export const careersPageContent = {
  hero: {
    eyebrow: "CAREERS",
    title: "A place for people who care about craft, ownership, and the quality of what gets shipped.",
    body:
      "Rudranex is built for people who enjoy meaningful technical work, clear communication, and the responsibility that comes with helping clients solve serious problems.",
    highlights: ["High ownership", "Serious engineering", "High-accountability culture"],
    media: mediaLibrary.contact.hero,
    mediaAlt: "Signal illustration representing collaboration and delivery momentum",
  },
  culture: {
    title: "What work feels like here",
    body:
      "We prefer focused collaboration over noise, strong judgment over ceremony, and honest delivery over inflated promises. The environment suits people who like taking responsibility and improving the systems around them.",
    points: ["Direct communication", "High accountability", "Meaningful client work", "Space to think and ship well"],
  },
  thriveProfiles: [
    {
      title: "Systems thinkers",
      body: "People who like understanding how the pieces fit together and making software more dependable over time.",
    },
    {
      title: "Calm executors",
      body: "People who can work through ambiguity without adding unnecessary drama to delivery.",
    },
    {
      title: "Builders with taste",
      body: "People who care not only that something works, but that it feels well made and well judged.",
    },
  ],
  hiringJourney: [
    "Initial conversation",
    "Role and project fit discussion",
    "Practical evaluation",
    "Final decision with clarity on expectations",
  ],
} as const;

export const contactPageContent = {
  hero: {
    eyebrow: "CONTACT",
    title: "Start the right conversation for what you are building, fixing, or scaling.",
    body:
      "Whether you need a product partner, a stronger system foundation, or help moving through technical complexity, Rudranex is ready to understand the problem properly first.",
    highlights: ["Email", "Call", "WhatsApp"],
    media: mediaLibrary.contact.hero,
    mediaAlt: "Abstract contact and communication signals illustration",
  },
  paths: [
    {
      title: "New product or platform",
      body: "For teams planning something new and wanting stronger technical shape before delivery accelerates.",
    },
    {
      title: "Modernization or rebuild",
      body: "For businesses replacing fragile systems, improving workflows, or reducing technical friction.",
    },
    {
      title: "Dedicated execution support",
      body: "For roadmaps that need sustained engineering momentum and a reliable delivery partner.",
    },
    {
      title: "Automation and internal tools",
      body: "For teams trying to reduce repetitive work and improve operational visibility.",
    },
  ],
  checklist: [
    "What you are building or trying to improve",
    "What currently feels blocked or inefficient",
    "Any delivery timeline or urgency that matters",
    "Whether you need a project team or ongoing execution support",
  ],
  nextSteps: [
    "We review the inquiry with business and technical context in mind.",
    "You get a response within one business day.",
    "If there is a fit, we move into a focused conversation around next steps.",
  ],
  founderNote:
    "Rudranex prefers clear first conversations. The goal is to understand the real need before recommending the wrong path too quickly.",
  form: {
    intro:
      "Write the details once here, then send them through the channel you prefer without having to retype the project context.",
    projectTypes: [
      "New product or platform",
      "Web development",
      "App development (iOS / Android)",
      "Modernization or rebuild",
      "Automation and internal tools",
      "IT consulting & strategy",
      "Business registration & global setup",
      "Digital marketing & growth",
      "Product roadmap & strategy",
      "Dedicated engineering support",
      "Custom IT service",
    ],
  },
  pricing: {
    eyebrow: "BUDGET CLARITY",
    title: "A quicker way to judge whether the scope fits.",
    body:
      "If you are still framing the project, these ranges help set expectations before the first conversation starts.",
    bands: [
      {
        label: "Focused delivery",
        value: "₹1.5L+",
        body: "For tightly scoped builds, operational tools, or early product surfaces with clear boundaries.",
      },
      {
        label: "Broader system work",
        value: "₹4L+",
        body: "For deeper integrations, multi-surface platforms, or modernization work with more moving parts.",
      },
      {
        label: "Longer-term support",
        value: "Custom monthly",
        body: "For ongoing execution where the work behaves more like an active product roadmap than a one-time project.",
      },
    ],
  },
} as const;

export const legalPageContent = {
  privacyIntro:
    "This page outlines the general way Rudranex approaches information shared through business inquiries and working relationships.",
  termsIntro:
    "These terms provide a lightweight overview of how to interpret the information presented on the Rudranex website.",
} as const;

export function serviceIcon(index: number): ReactNode {
  const icons = [
    <svg key="web" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="m9 8-4 4 4 4M15 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    <svg key="mobile" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" strokeLinecap="round" /></svg>,
    <svg key="cloud" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M7 18a4 4 0 0 1-.9-7.9 5 5 0 0 1 9.7-1.3A4 4 0 0 1 17 18H7Z" strokeLinejoin="round" /></svg>,
    <svg key="growth" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" strokeLinecap="round" /></svg>,
    <svg key="ux" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M4 6h16M4 12h10M4 18h7" strokeLinecap="round" /><circle cx="18" cy="12" r="3" /></svg>,
    <svg key="team" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 8v6M17 11h6" strokeLinecap="round" /></svg>,
    <svg key="consult" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.5-1.5 4.5-3 5.5V17H9v-2.5C7.5 13.5 6 11.5 6 9a6 6 0 0 1 6-6Z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="global" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" strokeLinecap="round"/></svg>,
    <svg key="marketing" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M22 7 13.5 15.5l-5-5L2 17" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 7h6v6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="roadmap" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="m3 8 4-4 4 4M7 4v16M17 20l4-4-4-4M21 16H7.5a3.5 3.5 0 0 1 0-7H13" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  ];

  return icons[index % icons.length];
}
