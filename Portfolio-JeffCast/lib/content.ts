export interface CaseStudy {
  id: string
  title: string
  client: string
  confidential: boolean
  published: boolean
  context: string
  constraint: string
  built: string
  outcome: string
  stack: string[]
  note?: string
}

export interface SkillGroup {
  level: 'Expert' | 'Proficient' | 'Familiar'
  skills: string[]
}

export interface HowIWorkPoint {
  label: string
  description: string
}

export interface PersonData {
  name: string
  title: string
  positioning: string
  location: string
  timezone: string
  availability: string
  email: string
  github: string
  linkedin: string
}

// ─── Person ──────────────────────────────────────────────────────────────────

export const person: PersonData = {
  name: 'Jeffrey Castillo',
  title: 'Senior Frontend Developer',
  positioning:
    'Senior Frontend Engineer — React, TypeScript, Next.js — I ship enterprise apps solo, end to end.',
  location: 'Mexico',
  timezone: 'UTC',
  availability: 'Open to remote / contract (US)',
  email: 'jeffvaleriano@gmail.com',
  github: 'https://github.com/JcastilloTsx',
  linkedin:
    'https://www.linkedin.com/in/jeffrey-valeriano-castillo-nu%C3%B1ez-737794195/',
}

// ─── Case studies ─────────────────────────────────────────────────────────────

export const caseStudies: CaseStudy[] = [
  {
    id: 'assets-audit-system',
    title: 'Assets Audit Report System',
    client: 'Enroute Systems / Key Energy Services',
    confidential: false,
    published: true,
    context:
      'Key Energy Services needed to replace a fully manual, paper-based fixed asset audit process spanning multiple yard locations across active energy operations.',
    constraint:
      'No existing documentation, no prior developer handoff, and a hard requirement to keep live field operations uninterrupted throughout the entire build.',
    built:
      'Architected and delivered the full system solo across 8 sprint phases — 118 Azure DevOps work items. Designed the architecture from scratch: a Canvas App with Entra ID group-based access control scoping field users, district managers, and location groups; a Dataverse data model; Power Automate workflows; and a Microsoft Fabric Lakehouse integration with Dynamics 365 F&O for real-time asset data. Wrote all swimlane process diagrams and technical design docs that became the onboarding foundation for future contributors.',
    outcome:
      'Digitized fixed asset audits across multiple yard locations. Reduced audit cycle time significantly. Eliminated dependency on external vendors for ongoing development.',
    stack: [
      'React',
      'Power Apps Canvas',
      'Dataverse',
      'Power Automate',
      'Dynamics 365 F&O',
      'Microsoft Fabric',
      'Entra ID',
      'Azure DevOps',
    ],
  },
  {
    id: 'realtime-dashboard',
    title: 'Real-Time Enterprise Dashboard Platform',
    client: 'Tenco',
    confidential: false,
    published: true,
    context:
      'A mission-critical operations platform serving 1,000+ concurrent users had no real-time data capabilities — teams were making decisions on information minutes out of date.',
    constraint:
      'The existing system had no WebSocket infrastructure. The real-time layer had to be introduced without disrupting ongoing operations, and had to hold stable under high-frequency data updates at peak load.',
    built:
      'Designed and implemented the full real-time data pipeline: SignalR hubs on the .NET Core backend, WebSocket event handlers on the frontend with optimistic UI patterns to keep the interface responsive under burst traffic. Built a Node.js middleware layer handling API aggregation and error recovery to prevent cascading failures. The architecture was documented and adopted as the standard pattern across subsequent projects at the company.',
    outcome:
      'Sub-200ms response times at peak load. Zero reported data-lag incidents post-launch. Architecture adopted as the company-wide standard for new projects.',
    stack: [
      'React 18',
      'TypeScript',
      'Redux Toolkit',
      'SignalR / WebSockets',
      '.NET Core',
      'Node.js',
    ],
  },
  {
    // TODO: Add client name if permissible, or keep as confidential
    id: 'enterprise-saas',
    title: 'Enterprise SaaS Frontend',
    client: 'Confidential',
    confidential: true,
    published: false, // TODO: Fill in details and set to true when ready
    context: 'TODO: Add context — what was the product and who were the users?',
    constraint: 'TODO: Add constraint.',
    built: 'TODO: Add what you built and owned.',
    outcome: 'TODO: Add measurable outcome.',
    stack: ['TODO: Add stack'],
    note: 'Details available on request under NDA.',
  },
]

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skillGroups: SkillGroup[] = [
  {
    level: 'Expert',
    skills: [
      'React 18+',
      'TypeScript (strict mode)',
      'Next.js (App Router)',
      'JavaScript ES6+',
      'Redux Toolkit',
      'HTML5 / CSS3',
      'REST API integration',
      'Component architecture',
    ],
  },
  {
    level: 'Proficient',
    skills: [
      'Node.js (Express, NestJS)',
      'Tailwind CSS',
      'Design Systems',
      'Micro-frontend Architecture',
      'SignalR / WebSockets',
      'Power Platform (Canvas Apps, Dataverse)',
      'GraphQL / Apollo Client',
      'Jest / React Testing Library',
      'Docker / Kubernetes',
      'Azure DevOps / CI\/CD',
      'Storybook',
      'Webpack / Vite',
    ],
  },
  {
    level: 'Familiar',
    skills: [
      'AWS (AppSync, Amplify)',
      'Ruby on Rails',
      'Cypress',
      'Turborepo / Nx',
      'MongoDB',
    ],
  },
]

// ─── Courses ─────────────────────────────────────────────────────────────────

export const courses: string[] = [
  'React — The Complete Guide · Maximilian Schwarzmüller',
  'Understanding TypeScript · Maximilian Schwarzmüller',
  'Node.js — The Complete Guide · Maximilian Schwarzmüller',
  'Docker & Kubernetes: The Practical Guide · Maximilian Schwarzmüller',
  'The Git & GitHub Bootcamp · Colt Steele',
  'Web Accessibility (WCAG 2.1)',
  'Testing React with Jest and React Testing Library',
  'AWS AppSync & Amplify with React',
]

// ─── How I Work ───────────────────────────────────────────────────────────────

export const howIWork: { headline: string; points: HowIWorkPoint[] } = {
  headline: 'I work like a founding engineer, not a feature factory.',
  points: [
    {
      label: 'Full ownership',
      description:
        'I take projects from blank repo to production — architecture decisions, backlog creation, stakeholder communication, and deployment. No handholding required.',
    },
    {
      label: 'Written before built',
      description:
        'Every significant project starts with a technical design document: data model, integration points, edge cases, rollout plan. Writing forces precision before code does.',
    },
    {
      label: 'Structured delivery',
      description:
        'I break work into phased, shippable increments with Azure DevOps or GitHub Projects. Stakeholders have visibility; delivery stays predictable.',
    },
    {
      label: 'Judgment, not just execution',
      description:
        'I push back on specs that will cause problems downstream, flag technical debt before it ships, and choose boring maintainable solutions over impressive ones.',
    },
  ],
}
