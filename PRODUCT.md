# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: technical recruiters and hiring managers at US companies screening candidates for remote/contract senior engineering roles, evaluating in a first pass of roughly 60 seconds. Secondary: engineering leads doing a deeper technical read before an interview — they read the case studies closely and may open the repo itself.

## Product Purpose

Get a recruiter or hiring manager to book an interview. The site is a filtering and credibility tool, not a portfolio gallery: every section exists to answer a specific question a evaluator has, as fast as possible.

## Positioning

Repositioning in progress: from "Senior Frontend Developer" to full-stack. Jeffrey ships enterprise applications solo, end to end — frontend (React/TypeScript/Next.js) and backend/integration layers (.NET Core, Node.js, SignalR, Power Platform/Dataverse) — not just UI. The differentiating claim is full ownership: architecture, backend integration, and delivery process, not implementation of a given design in a single layer of the stack. Seniority signals are embedded in structure (how the case studies and code are organized), not asserted in adjectives.

## Operating Context

- Case studies follow a fixed narrative shape: context → constraint → built → outcome, so a skimming evaluator can extract signal without reading prose.
- Skills are leveled (Expert / Proficient / Familiar) rather than listed flat, communicating depth honestly instead of keyword-stuffing.
- A "How I Work" section carries process/seniority signals (technical design docs written before code, phased delivery, pushing back on specs) that don't fit naturally into project narratives.
- The codebase itself is treated as evaluation surface: an interviewer may read the repo, so code quality, structure, and justified architectural choices (e.g., Server Components by default, a typed content layer, a real reduced-motion fallback) function as proof, not just the rendered page.
- Content lives in a single typed file (`lib/content.ts`); editing a case study or skill never touches component code.

## Capabilities and Constraints

- Backend/integration evidence already exists in the published case studies (SignalR hubs on .NET Core, Node.js middleware, Power Automate/Dataverse/Microsoft Fabric) but is currently framed under a frontend-only title, undermining the full-stack repositioning — this is the primary gap the repositioning must close.
- A third case study ("Enterprise SaaS Frontend") exists only as a `TODO`-filled placeholder, confidential and unpublished (`published: false`). No real details are available for it yet — future work must not fabricate context, constraint, built, or outcome text for it; it stays out of scope until real content is supplied.
- Contact/identity facts are fixed and must not be altered: name Jeffrey Castillo, email jeffvaleriano@gmail.com, GitHub github.com/JcastilloTsx, LinkedIn (see `lib/content.ts`), location Mexico, timezone UTC, availability "open to remote / contract (US)."
- Production domain in `app/layout.tsx` (`jeffreycastillo.dev`) is a placeholder (`// TODO: Replace with actual domain`) — not yet a confirmed fact.
- Tech constraints: Next.js 15 App Router, Server Components by default (only `Contact` is a client component), Tailwind CSS with a 5-token CSS-variable palette, `next/font` (Inter + Space Grotesk), no animation library — CSS-only motion gated on `prefers-reduced-motion`.

## Brand Commitments

- Name: Jeffrey Castillo. Existing tagline pattern: "[Seniority] [Discipline] Engineer/Developer — [stack] — [what they deliver]," to be updated for the full-stack reposition rather than replaced with a different voice.
- Voice: direct, structured, evidence-over-adjectives. Explicitly avoids claiming seniority in copy ("Writing your own technical design docs... those go in 'How I Work', not in a hero tagline") in favor of demonstrating it in structure. Any new copy should hold this line.
- WCAG-compliant contrast on every color pair and a genuine (not merely disabled) reduced-motion fallback are existing, stated commitments, not optional polish.

## Evidence on Hand

- Case study: Assets Audit Report System (Enroute Systems / Key Energy Services) — full detail, published, real client named, real stack (React, Power Apps Canvas, Dataverse, Power Automate, Dynamics 365 F&O, Microsoft Fabric, Entra ID, Azure DevOps).
- Case study: Real-Time Enterprise Dashboard Platform (Tenco) — full detail, published, real stack (React 18, TypeScript, Redux Toolkit, SignalR/WebSockets, .NET Core, Node.js), includes a specific perf claim (sub-200ms at peak load).
- Case study: Enterprise SaaS Frontend — confidential, unpublished, placeholder only. Not usable as evidence until the user supplies real content.
- Course/credential list (`lib/content.ts`) available as supporting evidence, not headline material.
- No testimonials, press, or third-party proof currently exist — future work must not invent them.

## Product Principles

1. Structure carries seniority signals; copy states facts, not adjectives.
2. Every section answers a specific question a time-constrained recruiter or hiring manager has — cut anything that doesn't.
3. The full-stack claim must be demonstrated through existing case-study evidence (backend/integration work already shipped), not through a title change alone.
4. The codebase is part of the evaluation surface — architectural choices should stay justifiable to a technical reader, not just visually clean.
5. Never fabricate evidence (testimonials, metrics, case-study details) to fill a content gap; state the absence instead.

## Accessibility & Inclusion

WCAG-compliant color contrast on every color pair (existing, stated commitment). Reduced motion is a first-class state (`prefers-reduced-motion: no-preference` gates animation; the reduced state is the final static layout, not a broken or disabled one), not an afterthought.
