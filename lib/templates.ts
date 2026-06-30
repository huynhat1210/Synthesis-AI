/**
 * @file lib/templates.ts
 * @description Pre-built starter profile templates for new users.
 *              Each template includes a full MasterProfile with realistic
 *              sample data that users can customize.
 */

import type { MasterProfile } from "@/types";

export interface ProfileTemplate {
  id: string;
  labelVi: string;
  labelEn: string;
  emoji: string;
  profile: Omit<MasterProfile, "id" | "isDefault">;
}

export const PROFILE_TEMPLATES: ProfileTemplate[] = [
  {
    id: "frontend-dev",
    emoji: "💻",
    labelVi: "Lập trình viên Frontend",
    labelEn: "Frontend Developer",
    profile: {
      fullName: "Alex Nguyen",
      jobTitle: "Senior Frontend Developer",
      bio: "5+ years building high-performance web applications with React and TypeScript. Specializing in complex UI architectures, performance optimization, and design-system implementation. Passionate about developer experience and clean, maintainable code.",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Figma", "Performance Optimization", "Unit Testing"],
      projects: [
        {
          id: "t1-p1",
          title: "E-Commerce Platform Redesign",
          description: "Led frontend architecture for a high-traffic e-commerce platform serving 2M+ monthly users. Migrated from legacy jQuery to React with TypeScript, achieving a 60% improvement in page load speed.",
          role: "Lead Frontend Engineer",
          tags: ["React", "TypeScript", "Redux", "Webpack"],
          outcome: "60% faster load times · 35% increase in conversion rate",
          challenge: "Legacy codebase with zero test coverage and significant technical debt accumulated over 7 years.",
        },
        {
          id: "t1-p2",
          title: "Real-Time Analytics Dashboard",
          description: "Built a real-time data visualization dashboard for a SaaS platform, processing 50K+ live events per minute using WebSockets and React.",
          role: "Frontend Architect",
          tags: ["React", "D3.js", "WebSocket", "Recharts"],
          outcome: "Handles 50K+ live events/min · Reduced analyst reporting time by 80%",
        },
      ],
    },
  },
  {
    id: "product-manager",
    emoji: "🎯",
    labelVi: "Quản lý Sản phẩm",
    labelEn: "Product Manager",
    profile: {
      fullName: "Minh Tran",
      jobTitle: "Senior Product Manager",
      bio: "7+ years driving product strategy for B2B SaaS companies across FinTech and EdTech verticals. Expert at translating customer pain points into measurable product outcomes. Strong track record of 0→1 product launches and scaling growth from $1M to $20M ARR.",
      skills: ["Product Strategy", "Roadmap Planning", "User Research", "A/B Testing", "SQL", "Agile/Scrum", "Stakeholder Management", "OKR Framework"],
      projects: [
        {
          id: "t2-p1",
          title: "AI-Powered Lending Platform",
          description: "Owned the product roadmap for an AI credit scoring feature that reduced loan approval time from 5 days to 4 hours while maintaining risk standards.",
          role: "Product Lead",
          tags: ["FinTech", "AI/ML", "Credit Scoring", "API Integration"],
          outcome: "4h loan approval vs 5-day industry average · $8M in new loan volume",
          challenge: "Regulatory compliance across 3 markets while maintaining a fast, modern UX.",
        },
        {
          id: "t2-p2",
          title: "B2B Onboarding Funnel Optimization",
          description: "Redesigned the end-to-end B2B onboarding experience, reducing time-to-value from 14 days to 3 days through automated workflows and contextual guidance.",
          role: "Product Manager",
          tags: ["B2B SaaS", "Onboarding", "Growth", "Intercom"],
          outcome: "78% reduction in time-to-first-value · 40% lower 30-day churn",
        },
      ],
    },
  },
  {
    id: "ux-designer",
    emoji: "🎨",
    labelVi: "Nhà thiết kế UX/UI",
    labelEn: "UX/UI Designer",
    profile: {
      fullName: "Linh Pham",
      jobTitle: "Lead UX/UI Designer",
      bio: "6+ years crafting human-centered digital experiences for enterprise software and consumer apps. Specializing in complex workflow design, design system creation, and cross-functional collaboration between product, engineering, and business teams.",
      skills: ["UX Research", "Figma", "Prototyping", "Design Systems", "Usability Testing", "Information Architecture", "Motion Design", "Accessibility (WCAG)"],
      projects: [
        {
          id: "t3-p1",
          title: "Enterprise CRM Design System",
          description: "Created a comprehensive design system for a CRM platform used by 15,000+ enterprise customers, reducing UI inconsistencies by 90% and cutting design-to-dev handoff time by 50%.",
          role: "Lead Designer",
          tags: ["Figma", "Design System", "Enterprise UX", "Component Library"],
          outcome: "90% fewer UI inconsistencies · 50% faster dev handoffs · adopted by 8 product teams",
          challenge: "Aligning 4 separate product teams each with divergent legacy UI patterns.",
        },
        {
          id: "t3-p2",
          title: "Mobile Banking App Overhaul",
          description: "End-to-end UX redesign of a mobile banking app increasing user satisfaction score from 3.2 to 4.7/5 and reducing support tickets by 35%.",
          role: "UX Lead",
          tags: ["Mobile UX", "iOS", "Android", "User Testing", "FinTech"],
          outcome: "4.7/5 App Store rating (from 3.2) · 35% fewer support tickets",
        },
      ],
    },
  },
  {
    id: "backend-engineer",
    emoji: "⚙️",
    labelVi: "Kỹ sư Backend",
    labelEn: "Backend Engineer",
    profile: {
      fullName: "Duc Hoang",
      jobTitle: "Senior Backend Engineer",
      bio: "8+ years building scalable distributed systems and microservices architectures. Deep expertise in high-throughput API design, database optimization, and cloud infrastructure. Contributor to open-source projects with 2K+ GitHub stars.",
      skills: ["Node.js", "Python", "PostgreSQL", "Redis", "Kubernetes", "AWS", "gRPC", "System Design", "Docker", "CI/CD"],
      projects: [
        {
          id: "t4-p1",
          title: "Payment Processing Microservices",
          description: "Designed and implemented a fault-tolerant payment processing system handling $50M+ in daily transactions with 99.99% uptime and sub-100ms response times.",
          role: "Lead Backend Engineer",
          tags: ["Node.js", "Kafka", "PostgreSQL", "Redis", "AWS"],
          outcome: "$50M+ daily transactions · 99.99% uptime SLA · <100ms P95 latency",
          challenge: "Migrating from a monolithic Rails app to microservices without any downtime.",
        },
        {
          id: "t4-p2",
          title: "Real-Time Notification Engine",
          description: "Built a scalable push notification engine delivering 10M+ personalized notifications daily across mobile, email, and web channels using an event-driven architecture.",
          role: "Backend Engineer",
          tags: ["Python", "Celery", "Redis", "Firebase", "AWS SQS"],
          outcome: "10M+ daily notifications · 98.5% delivery rate · 3x cost reduction",
        },
      ],
    },
  },
  {
    id: "marketing-specialist",
    emoji: "📣",
    labelVi: "Chuyên gia Marketing",
    labelEn: "Marketing Specialist",
    profile: {
      fullName: "Thu Nguyen",
      jobTitle: "Growth Marketing Manager",
      bio: "5+ years driving user acquisition and retention for B2C and B2B tech companies. Proven track record of building full-funnel marketing strategies that combine data-driven paid channels with compelling organic content to achieve sustainable growth.",
      skills: ["Growth Strategy", "SEO/SEM", "Content Marketing", "Google Analytics", "Meta Ads", "Email Marketing", "A/B Testing", "Copywriting", "HubSpot"],
      projects: [
        {
          id: "t5-p1",
          title: "0→1 User Acquisition Strategy",
          description: "Built the entire marketing function from scratch for an early-stage FinTech startup, growing from 0 to 50,000 registered users in 12 months with a $200K budget.",
          role: "Head of Growth",
          tags: ["Growth Hacking", "Paid Social", "Content", "SEO", "Referral Programs"],
          outcome: "0 → 50K users in 12 months · $4 blended CAC · 3.2x ROAS",
          challenge: "Breaking into a crowded market with no brand recognition and limited budget.",
        },
        {
          id: "t5-p2",
          title: "B2B SaaS Content Engine",
          description: "Built a systematic content marketing program generating 400% more organic leads through SEO-optimized case studies, whitepapers, and thought leadership.",
          role: "Content Marketing Lead",
          tags: ["SEO", "Content Strategy", "HubSpot", "Webinars", "LinkedIn"],
          outcome: "400% organic lead increase · #1 Google ranking for 15 target keywords",
        },
      ],
    },
  },
];
