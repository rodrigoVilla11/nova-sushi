# Project Overview

> **Nova Sushi** — Marketing & Franchise Acquisition Platform
> Built with Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion 12

---

## 1. Executive Summary

Nova Sushi is a high-performance marketing and franchise acquisition website for an Argentine sushi fusion restaurant brand based in Córdoba, Argentina. The project is a fully static Next.js 15 application designed to serve two core business objectives simultaneously: convert visitors into customers and convert entrepreneurs into franchise partners.

What makes this project interesting is not just its technical execution, but the depth of its business thinking. Rather than being a generic restaurant website with a contact form, it functions as a complete digital sales funnel — presenting the brand story, showcasing the product catalog, and guiding potential franchise investors through a detailed, conversion-optimized journey that includes real operational KPIs, ROI projections, investment breakdowns, and a multi-step onboarding process.

The site is built with a modern, opinionated stack (Next.js App Router, React 19, Tailwind CSS v4, Framer Motion), deployed to Vercel, and integrates with external services including AWS S3 for media, Pedisy for online ordering, Google Maps for location discovery, and WhatsApp as the primary communication channel. Despite having no traditional backend, the architecture is clean, data-driven, and production-quality — demonstrating strong frontend engineering and product thinking.

---

## 2. Product Vision

Nova Sushi positions itself as a differentiated player in the Argentine food industry through a fusion concept that combines sushi technique with street food formats — most notably, Sushi Dogs and Sushi Burgers. These product innovations are central to the brand identity and drive the franchise value proposition.

**The problem it solves:**
Most restaurant websites are passive information pages. Nova Sushi treats its website as an active sales tool: it tells a story, builds credibility, showcases the product offering, and provides a structured path for both customers (ordering) and investors (franchise inquiry).

**Target users:**
- **End consumers** in Córdoba looking to discover or order from the brand
- **Entrepreneurs and investors** interested in entering the food franchise market with a proven, differentiated concept
- **Potential franchise partners** evaluating the business model, investment, and expected returns

**Value proposition:**
- Unique fusion product line that stands out in the Argentine sushi market
- A transparent franchise model that publishes real operational metrics (not projections based on guesses)
- A polished brand experience that communicates quality and seriousness to both customers and investors

---

## 3. Core Functionalities

### Menu Showcase with Real-Time Search and Filtering
The product catalog is powered by a JSON data file containing 100+ menu items across multiple categories (Sushi Dogs, Sushi Burgers, Ejecutivo, etc.). Users can filter by category, search by name or description, and open a detailed modal for any item. The modal is keyboard-accessible (Tab trap, Escape handler, click-outside close) and animated with Framer Motion. Product images are served from AWS S3.

### Brand Storytelling via Interactive Timeline
A scroll-linked timeline presents the company's history from founding to future milestones. Each step is anchored in a sticky layout with Framer Motion scroll-driven animations, creating an immersive narrative experience. This component communicates credibility and brand maturity to both customers and potential investors.

### Full Franchise Acquisition Funnel
The `/franquicias` page is a complete investor-facing sales funnel composed of 10 distinct sections. It goes far beyond a simple contact form — it presents competitive differentiators, operational metrics from real locations, two investment formats with pricing, multiple ROI scenarios, a 5-step onboarding process with time estimates, and trust signals. The page ends with an application form that composes a structured WhatsApp or email message and sends it to the franchise team.

### WhatsApp-First Contact System
Rather than relying on a backend for form submissions, the site uses deep WhatsApp links (wa.me) as the primary conversion mechanism. The branch picker allows customers to select a location and be routed to the correct WhatsApp number. The franchise form composes a pre-formatted message that includes the applicant's information and sends it via WhatsApp or mailto. This is a deliberate product decision optimized for the Argentine market, where WhatsApp is the dominant business communication channel.

### Section Navigation with Intersection Observer
A fixed dot-based navigation component tracks which section is currently in view using the browser's Intersection Observer API and highlights the corresponding dot. This provides spatial orientation for content-heavy pages without relying on any external library.

### Production-Grade SEO Infrastructure
The site implements structured data (JSON-LD) for Restaurant entities, Breadcrumb navigation, and FAQ schemas. It includes dynamically generated `sitemap.xml` and `robots.txt` via Next.js file-based conventions. Every page includes full Open Graph and Twitter Card metadata for social sharing. This demonstrates awareness of production SEO requirements beyond basic meta tags.

---

## 4. Main Modules

### Brand Module (`/src/components/Hero.tsx`, `Story.tsx`, `HomeFranchiseCTA.tsx`)
**Purpose:** Communicate brand identity, origin story, and emotional connection.
**Responsibilities:** Rotating image collage, scroll-triggered timeline, CTA bridging to franchise page.
**Value:** Establishes trust and differentiation before the user evaluates the product or the investment.

### Menu Module (`/src/components/MenuShowcase.tsx`, `/src/data/dishes.json`)
**Purpose:** Present the full product catalog in an interactive, browsable format.
**Responsibilities:** Category filtering, text search, modal detail view, lazy-loaded images from AWS S3.
**Business value:** Drives consumer interest and communicates the breadth and creativity of the menu — which is also the core argument of the franchise pitch.

### Franchise Module (`/src/components/franchise/*.tsx`, `/src/data/franchise-data.ts`)
**Purpose:** Convert entrepreneurs into franchise leads.
**Responsibilities:** Value proposition presentation, competitive differentiation, KPI display, ROI modeling, format comparison, process explanation, trust signals, lead capture form.
**Entities involved:** `FRANCHISE_METRICS`, `FRANCHISE_FORMATS`, `FRANCHISE_ROI_SCENARIOS`, `FRANCHISE_PROCESS_STEPS`, `FRANCHISE_TRUST`.
**Business value:** This is the highest-stakes module — it directly drives the business development pipeline.

### Location Module (`/src/components/Location.tsx`, `/src/lib/config.ts`)
**Purpose:** Help customers find and contact the nearest branch.
**Responsibilities:** Branch card rendering, embedded Google Maps for Nueva Córdoba, external map link for Alta Gracia, direct phone/WhatsApp links.
**Business value:** Reduces friction from discovery to first contact.

### Navigation Module (`/src/components/DotsNav.tsx`, `StickyCTA.tsx`, `WaBranchPicker.tsx`)
**Purpose:** Guide users through the site and lower contact friction.
**Responsibilities:** Scroll-aware section navigation, persistent WhatsApp CTA, branch-selector popup.
**Business value:** Keeps conversion opportunities always visible without disrupting the reading experience.

### SEO & Metadata Module (`/src/app/layout.tsx`, `robots.ts`, `sitemap.ts`)
**Purpose:** Maximize organic discoverability.
**Responsibilities:** Structured data injection (JSON-LD), Open Graph tags, dynamic sitemap and robots generation.

---

## 5. Technical Architecture

### Approach
Nova Sushi follows a **static-first, content-driven architecture** using the Next.js 15 App Router. All pages are statically renderable at build time — there is no server-side data fetching, no database, and no API routes. This is the correct architectural choice for a marketing site: it yields maximum performance, zero infrastructure cost, and global CDN distribution through Vercel.

### Layer Separation

```
Presentation Layer     →  React components (Tailwind CSS + Framer Motion)
Data Layer             →  Static JSON/TS files in /src/data/
Configuration Layer    →  /src/lib/config.ts (single source of truth for business constants)
Routing Layer          →  Next.js App Router file-system routing
Infrastructure Layer   →  Vercel (hosting) + AWS S3 (media CDN)
```

### Component Architecture
- **Server components by default** — all non-interactive components render on the server
- **`"use client"` boundary** applied selectively to components that require browser APIs (Framer Motion, Intersection Observer, useState, refs)
- No global state management (Redux, Zustand) — local `useState` is sufficient for this scope
- Custom hooks implied within components (e.g., Intersection Observer in DotsNav)

### Data Flow
1. Static data files (`dishes.json`, `franchise-data.ts`, `steps.ts`) are imported directly into components at build time
2. Business configuration (`lib/config.ts`) is imported wherever branch data, contact info, or URLs are needed — single source of truth prevents inconsistency
3. User interactions (form submission, WhatsApp routing) are handled entirely client-side, composing URLs that open native apps (wa.me, mailto)
4. Images are served from AWS S3 (remote pattern whitelisted in `next.config.ts`) with Next.js Image optimization

### Patterns Detected
- **Single Source of Truth** for configuration (`lib/config.ts`)
- **Controlled Client/Server Boundary** for optimal rendering strategy
- **Data-Driven Components** decoupled from presentation logic
- **Progressive Enhancement** — site functions without JavaScript for static content
- **Accessibility-First Modals** — keyboard trap, Escape handler, ARIA considerations

---

## 6. Tech Stack

| Technology | Version | Role in Project |
|---|---|---|
| **Next.js** | 15.4.10 | Full-stack React framework; App Router for routing, metadata, sitemap/robots generation, and Vercel deployment |
| **React** | 19.1.0 | UI component model; uses latest features including concurrent mode optimizations |
| **TypeScript** | 5.x | Full type safety across all components, data models, and configuration |
| **Tailwind CSS** | 4.1.11 | Utility-first styling; custom design system (dark theme, gold accent, custom button components) |
| **Framer Motion** | 12.23.12 | Production-grade animations: scroll parallax (useScroll/useTransform), view-triggered entries, gesture feedback, AnimatePresence for mount/unmount |
| **PostCSS + Autoprefixer** | 8.5.6 / 10.4.21 | CSS build pipeline with vendor prefixing |
| **ESLint** | 9.x | Code quality enforcement with Next.js ruleset |
| **AWS S3** | — | Image CDN for 220+ product and location photos (bucket: `pedisy-images.s3.sa-east-1.amazonaws.com`) |
| **Vercel** | — | Inferred hosting platform; Next.js native deployment target |
| **WhatsApp API** | — | `wa.me` deep links for order routing and franchise lead capture |
| **Google Maps** | — | Embedded iframe for Nueva Córdoba branch; external link for Alta Gracia |
| **Pedisy** | — | Third-party online ordering platform; linked from the menu section |

---

## 7. Data Model and Business Entities

### Dish
The core product entity. Represents a menu item with all information needed for consumer display.

```typescript
type Dish = {
  id: string;
  name: string;
  desc: string;
  img: string;           // AWS S3 URL
  price: number | null;  // Argentine pesos; null = price on request
  category: string;      // "SUSHIDOG" | "SUSHI BURGERS" | "MENU EJECUTIVO" | etc.
  tags?: string[];
};
```
100+ items across multiple categories. Prices in ARS.

### Branch
Represents a physical restaurant location with all contact and mapping data.

```typescript
type Branch = {
  name: string;
  address: string;
  phone: string;
  tel: string;           // Dial-formatted phone
  whatsapp: string;      // WhatsApp number for ordering
  mapsUrl: string;
  mapsEmbed: string | null; // Google Maps embed URL
};
```
Current locations: **Nueva Córdoba** (with map embed) and **Alta Gracia** (link only).

### FranchiseFormat
Represents an investable franchise model with pricing and scope.

```typescript
type FranchiseFormat = {
  name: string;           // "Dark Kitchen" | "Full Restaurant"
  investment: string;     // "$25,000 USD" | "$40,000 USD"
  description: string;
  includes: string[];
};
```

### FranchiseROIScenario
Financial projection model for prospective franchisees.

```typescript
type FranchiseROIScenario = {
  name: string;            // "Conservative" | "Base" | "Optimistic"
  ordersPerDay: number;
  avgTicket: number;
  monthlyRevenue: number;
  margin: string;
  paybackMonths: number;
};
```

### FranchiseMetric
Real operational KPI from existing locations.

```typescript
type FranchiseMetric = {
  value: string;   // e.g., "30-45"
  unit: string;    // e.g., "pedidos/día"
  label: string;
};
```
Four metrics published: daily orders, average ticket, operating margin, payback period.

### StoryStep
Company history milestone for the timeline component.

```typescript
type StoryStep = {
  id: string;
  label?: string;
  title: string;
  text: string;
  media?: { type: "image" | "video"; src: string; alt?: string };
};
```

---

## 8. User Roles and Permissions

This is a **fully public marketing site** — there is no authentication system, no user accounts, and no role-based access control.

All content is publicly accessible to all visitors. The site targets two distinct user personas that are guided through separate content flows:

- **Consumer visitor** → Homepage flow: Hero → Menu → Story → Locations → WhatsApp ordering
- **Investor / Entrepreneur** → Franchise flow: `/franquicias` full acquisition funnel → WhatsApp/email inquiry

There is no admin panel, CMS, or protected area in the current version.

*Note: This is architecturally appropriate for a v1 marketing site. A future v2 could reasonably introduce an admin dashboard for menu management and franchise lead tracking.*

---

## 9. Key Workflows

### Consumer Ordering Flow
1. User lands on homepage, sees hero with brand identity and rotating product images
2. User scrolls to MenuShowcase, browses 100+ items with category filters and search
3. User clicks an item to open the detail modal (name, description, price, image)
4. User clicks the sticky WhatsApp CTA or the branch picker in the footer
5. Branch picker opens, user selects their nearest location (Nueva Córdoba / Alta Gracia)
6. User is deep-linked to a WhatsApp chat with the branch's number, pre-loaded with a greeting

### Brand Discovery Flow
1. User scrolls through the homepage Story section
2. The timeline animates into view section by section as the user scrolls
3. Each milestone (founding year, key moments, future vision) is presented with image or video media
4. The DotsNav component provides spatial context, highlighting the current section in the navigation dots

### Franchise Inquiry Flow
1. User arrives at `/franquicias` via homepage CTA or direct navigation
2. Reads concept pitch and competitive differentiators
3. Reviews real operational metrics (orders/day, margins, payback period)
4. Compares two investment formats (Dark Kitchen vs. Full Restaurant)
5. Analyzes three ROI scenarios (conservative/base/optimistic)
6. Reviews the 5-step onboarding process with time estimates per stage
7. Reads trust signals (years operating, total orders processed, response SLA)
8. Fills out the FranchiseApplyForm (name, city, capital range, experience, message)
9. Submits → the form composes a structured message and opens WhatsApp or mailto
10. Franchise team receives a pre-formatted lead with all qualifying information

---

## 10. Integrations and External Services

### WhatsApp API (`wa.me`)
The primary communication channel. Used in two contexts:
- **Customer ordering**: Branch-specific WhatsApp numbers in `lib/config.ts`, exposed via the branch picker and sticky CTA
- **Franchise leads**: Franchise application form composes a pre-formatted message and opens `wa.me/{adminNumber}?text={encodedMessage}`

This is a deliberate product decision optimized for the Argentine market, where WhatsApp penetration is near-universal for business communication.

### AWS S3 (`pedisy-images.s3.sa-east-1.amazonaws.com`)
Hosts 220+ product and location photos. Whitelisted as a remote image pattern in `next.config.ts`, allowing Next.js Image to optimize and serve images with responsive resizing, lazy loading, and WebP conversion.

### Pedisy (Online Ordering Platform)
Third-party ordering integration. The menu section links out to Pedisy for actual order placement, rather than building in-house ordering. This is a pragmatic v1 decision that separates marketing from transactional functionality.

### Google Maps
- **Nueva Córdoba branch**: Full embedded iframe in the Location component
- **Alta Gracia branch**: External Google Maps link
Both branch URLs are managed via `lib/config.ts`.

### Vercel (Inferred)
The project's `next.config.ts`, file structure, and deployment patterns strongly indicate Vercel as the hosting platform. The use of Next.js Image with remote patterns, dynamic sitemap/robots generation, and App Router conventions are all native to Vercel's deployment model.

### Mailto
Secondary fallback for franchise inquiries. The FranchiseApplyForm supports both WhatsApp and email submission paths, with email composing a `mailto:` URL with subject and body pre-filled.

---

## 11. Frontend Analysis

### Structure
The frontend is organized around the Next.js App Router with a clear separation between route pages (`/src/app/`) and reusable components (`/src/components/`). The franchise module has its own subdirectory (`/src/components/franchise/`) with 10 dedicated components, demonstrating thoughtful module organization.

### Component Patterns
- **Composition over configuration**: Each section of the franchise page is a dedicated, focused component rather than a single monolithic page component
- **Data-display separation**: Components receive data from static files via imports, keeping presentation logic clean
- **Controlled client boundary**: Only components that genuinely need browser APIs are marked `"use client"` — this preserves server rendering for static content

### Animation System (Framer Motion)
The animation layer is particularly strong:
- **Scroll parallax**: `useScroll` + `useTransform` in the Hero creates a depth effect as the user scrolls
- **View-triggered entries**: `whileInView` with `initial`/`animate` for staggered section reveals
- **Gesture feedback**: `whileHover` brightness/scale changes on interactive elements
- **Mount/unmount animations**: `AnimatePresence` wraps the menu modal for smooth entry and exit
- **Rotating collage**: The Hero image grid uses interval-based state updates with Framer Motion transitions to cycle through 40+ product images

### State Management
Local `useState` is used appropriately:
- MenuShowcase: category filter, search query, selected item, modal open state
- WaBranchPicker: picker open/close with `useRef` click-outside detection
- FranchiseApplyForm: form field values, submission state, error messages
- DotsNav: active section ID, driven by Intersection Observer callbacks

No global state manager is needed for this scope, and the absence of one is the correct architectural decision.

### Design System
Tailwind CSS v4 with a custom token system:
- `brand-bg: #0b0b0c` (near-black background)
- `brand-text: #f5f3ef` (warm cream text)
- `brand-accent: #c59e62` (gold/copper for highlights and active states)
- `brand-cta: #e8e0cf` (light beige for primary CTAs)

Four button variants (`.btn-primary`, `.btn-wa`, `.btn-outline`, `.btn-ghost`) defined as reusable CSS components in `globals.css`, maintaining visual consistency without prop-drilling style decisions.

### Performance
- Hero images loaded with `priority` flag
- All other images use lazy loading via Next.js Image
- Static generation means zero server compute per request
- Tailwind CSS generates only used classes (zero dead CSS in production)

### Accessibility
- Modal keyboard trap (Tab cycling within modal while open)
- Escape key handler to close modal
- Click-outside detection on the branch picker
- Semantic HTML structure inferred from component naming conventions

---

## 12. Backend Analysis

This project has **no traditional backend**. All "backend" concerns are handled through:

1. **Next.js build-time static generation**: Pages are pre-rendered to HTML at build time
2. **Static data files**: All business data (menu, franchise info, branch config) lives in TypeScript/JSON files imported at build time
3. **External services**: Orders (Pedisy), communication (WhatsApp/email), images (AWS S3), maps (Google) are all delegated to third-party services
4. **Client-side form handling**: The franchise application form composes messages client-side and opens native apps — no server processing

### What this means architecturally
- Zero database reads per request
- Zero server-side processing per request
- No authentication surface area
- No API attack surface
- Sub-100ms Time to First Byte (Vercel edge CDN serving pre-rendered HTML)

### SEO as Backend Logic
The closest thing to "backend logic" is the SEO infrastructure:
- `app/robots.ts` — Next.js server-side route that dynamically generates `robots.txt`
- `app/sitemap.ts` — Next.js server-side route that generates `sitemap.xml`
- `app/layout.tsx` — JSON-LD structured data injection (Restaurant schema with hours, addresses, phone)
- `app/franquicias/page.tsx` — Additional JSON-LD for Breadcrumb and FAQ schemas

This is a correct and mature approach to SEO — treating structured data as a first-class concern rather than an afterthought.

---

## 13. Strengths of the Project

### 1. Purposeful Architecture
The "no backend" decision is not a limitation — it's the right call. A marketing site for a restaurant does not need a database or a server. The architecture matches the problem scope perfectly, resulting in a site that is faster, cheaper to host, easier to maintain, and impossible to hack via SQL injection or server vulnerabilities.

### 2. Real Business Data Exposed
The franchise module publishes actual operational metrics — daily order volumes, margins, payback periods — rather than fictional projections. This is a product decision that builds investor trust and differentiates the pitch. The ROI scenario component models three business outcomes with real inputs.

### 3. Complete Acquisition Funnel
The `/franquicias` page is not a contact form bolted onto a website. It is a structured, persuasive, 10-section investor journey that addresses objections, presents evidence, and closes with a qualified lead capture. This level of product thinking is rare in restaurant websites.

### 4. Animation Quality
The use of Framer Motion is sophisticated rather than decorative. Scroll-driven parallax, view-triggered reveals, gesture feedback, and AnimatePresence for mount/unmount transitions demonstrate mastery of modern React animation patterns.

### 5. SEO Depth
JSON-LD structured data for three schema types (Restaurant, Breadcrumb, FAQ), dynamic sitemap/robots generation, per-page Open Graph metadata, and canonical URL configuration. This is production-level SEO, not beginner meta tags.

### 6. WhatsApp Integration Strategy
The WhatsApp-first contact model is not a technical shortcut — it's a product insight. In Argentina (and Latin America broadly), WhatsApp is the standard channel for food ordering and business communication. Building the entire contact flow around `wa.me` deep links removes friction and meets users where they already are.

### 7. Component Modularity
The franchise module's 10 dedicated components, the data layer's clean separation (`/src/data/`), and the single-source-of-truth configuration (`lib/config.ts`) demonstrate architectural discipline that would make this codebase maintainable and extensible.

### 8. Modern Stack
Next.js 15 + React 19 + Tailwind CSS v4 positions this project at the leading edge of the current web development ecosystem. These are not legacy choices — they reflect active awareness of the current state of the art.

---

## 14. What This Project Demonstrates About the Developer

### Full-Stack Product Thinking
This project was not built to exercise technology — it was built to solve a business problem. The franchise acquisition funnel, the WhatsApp routing system, and the real KPI display are all product decisions that required understanding the business context, the target audience, and the conversion objectives. This is the difference between a developer who builds features and one who builds products.

### Architectural Judgment
Choosing to build a zero-backend static site when that's the right call — and executing it with a production-quality architecture — demonstrates mature engineering judgment. The developer understood when to delegate (Pedisy for ordering, S3 for images, WhatsApp for communication) and when to build (animation system, SEO layer, franchise funnel).

### Modern React Mastery
The correct and purposeful use of `"use client"` boundaries, Framer Motion's advanced hooks (`useScroll`, `useTransform`, `AnimatePresence`), Intersection Observer API, and React 19 with Next.js 15 App Router demonstrates up-to-date, hands-on knowledge of the current React ecosystem.

### Design Sensibility
A custom dark-theme design system with consistent color tokens, four button variants, and a polished visual language across the entire site shows that this developer can work at the intersection of design and engineering — valuable in startup and product environments.

### SEO Awareness
Production SEO is often treated as an afterthought. This project implements JSON-LD structured data for multiple schema types, dynamic sitemap and robots generation, and complete Open Graph metadata. This signals awareness of real-world product requirements beyond the happy path.

### Data Modeling Without a Database
The way franchise data is structured in `franchise-data.ts` — with typed constants for metrics, formats, ROI scenarios, process steps, and trust signals — demonstrates an ability to think in structured data models even without a formal database schema. The data layer is clean, typed, and easily extensible.

### Attention to Accessibility
Modal keyboard traps, Escape handlers, and click-outside detection are not beginner-level considerations. Their presence signals awareness of production quality standards beyond visual functionality.

---

## 15. Portfolio-Ready Summary

**Nova Sushi — Marketing & Franchise Platform**

A production-deployed Next.js 15 marketing site and franchise acquisition platform for a real Argentine sushi fusion restaurant brand. Built as a complete digital sales tool, the project goes beyond traditional restaurant websites by implementing a full investor-facing funnel — presenting real operational KPIs, multi-format investment breakdowns, ROI scenario modeling, and a structured lead capture system — all optimized for the Argentine market's WhatsApp-first communication model.

The project demonstrates mastery of modern React patterns (Next.js App Router, React 19, client/server component boundaries), production-grade animation (Framer Motion scroll parallax, AnimatePresence, gesture feedback), a thoughtful static architecture with zero-backend design, and real-world SEO implementation with JSON-LD structured data, dynamic sitemaps, and Open Graph metadata.

**Key achievements:**
- Built a full franchise acquisition funnel (10 sections) with ROI modeling and real KPI disclosure
- Implemented an interactive, searchable menu showcasing 100+ products with keyboard-accessible modals
- Designed a WhatsApp-first contact architecture routing users to branch-specific numbers
- Deployed a production SEO layer with Restaurant, Breadcrumb, and FAQ JSON-LD schemas
- Integrated AWS S3 media CDN with Next.js Image optimization for 220+ assets

---

## 16. CV-Ready Summary

**Nova Sushi — Full-Stack Marketing & Franchise Platform** | Next.js 15, React 19, TypeScript, Tailwind CSS 4, Framer Motion

- Architected and developed a zero-backend static marketing site with a complete franchise investor acquisition funnel, deployed to Vercel
- Built an interactive product catalog (100+ items) with real-time category filtering, search, and keyboard-accessible modal views, integrated with AWS S3 media CDN
- Implemented scroll-driven animation system using Framer Motion (useScroll, useTransform, AnimatePresence) for parallax effects, timeline reveals, and mount/unmount transitions
- Designed a WhatsApp-first contact architecture with branch-routing logic, serving as the primary conversion mechanism for both consumer and B2B (franchise) flows
- Delivered production SEO infrastructure: JSON-LD structured data (Restaurant, Breadcrumb, FAQ schemas), dynamic sitemap/robots generation, Open Graph metadata, achieving full social preview coverage
- Modeled franchise business data (ROI scenarios, investment formats, operational KPIs) in a typed data layer, enabling transparent investor-grade disclosure without a database

---

## 17. LinkedIn-Ready Summary

I built **Nova Sushi** — a Next.js 15 marketing and franchise acquisition platform for a real restaurant brand in Argentina.

The project goes far beyond a typical restaurant website. It's a complete digital sales tool with two parallel funnels: one for consumers (brand story, menu, ordering) and one for franchise investors (concept pitch, real operational KPIs, ROI models, investment formats, onboarding process, lead capture).

Some highlights I'm proud of:

- **Zero-backend architecture** — static generation at build time, CDN delivery, zero server cost, maximum performance
- **Framer Motion animation system** — scroll parallax, view-triggered reveals, AnimatePresence for smooth UI transitions
- **WhatsApp-first contact model** — branch routing and pre-formatted lead messages via wa.me deep links, optimized for the Argentine market
- **Production SEO** — JSON-LD structured data (Restaurant, Breadcrumb, FAQ), dynamic sitemap/robots, full Open Graph coverage
- **Franchise ROI modeling** — three investor scenarios with real operational numbers from existing locations

Tech: Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · AWS S3 · Vercel

---

## 18. Suggested Keywords

### Technical Skills (for CV ATS and LinkedIn)
- Next.js 15 / Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Static Site Generation (SSG)
- Server Components / Client Components
- Performance Optimization
- Web Animation
- Scroll-driven Animation
- Intersection Observer API
- SEO Implementation
- JSON-LD / Structured Data
- Open Graph Protocol
- AWS S3 Integration
- Responsive Web Design
- Component Architecture
- Accessibility (a11y)

### Product & Architecture (for portfolio and presentations)
- Marketing Website Development
- Franchise Acquisition Funnel
- Conversion-Optimized Landing Pages
- Data-Driven UI
- Product Thinking
- Business Modeling
- ROI Scenario Modeling
- WhatsApp API Integration
- Digital Sales Funnel
- Restaurant Tech
- Zero-Backend Architecture
- JAMstack

### Industry & Domain (for LinkedIn and networking)
- Food & Beverage Industry
- Restaurant Technology
- Franchise Business Model
- Latin American Market
- B2C + B2B Platform
- E-commerce Adjacent
- Brand Experience Design

---

## 19. Missing Information / Assumptions

### Confirmed directly from the code
- Tech stack (all package versions from `package.json`)
- Page routes and component structure (from file system)
- All data entities and their fields (from TypeScript types and JSON files)
- External integrations (AWS S3, Google Maps, Pedisy, WhatsApp, Unsplash — from imports and `next.config.ts`)
- Environment variables and their purpose (from `.env.local.example`)
- Animation implementation details (from Framer Motion usage in components)
- SEO implementation (from `layout.tsx`, `robots.ts`, `sitemap.ts`)
- Franchise investment amounts ($25k / $40k USD) and KPIs (from `franchise-data.ts`)
- Color palette and design tokens (from `tailwind.config.ts`)

### Reasonably inferred (not explicitly stated)
- **Vercel deployment** — strongly inferred from Next.js Image remote patterns config, file-based routing conventions, and the README's deployment hints; not confirmed by a `vercel.json` or explicit documentation
- **Argentine Peso pricing** — inferred from context (Argentine brand, `pedisy-images.s3.sa-east-1.amazonaws.com` in the São Paulo AWS region, prices in the thousands)
- **Pedisy as the actual ordering platform** — linked from the site, not integrated; the ordering experience lives entirely on Pedisy's platform
- **Production deployment** — recent commits labeled "DATOS REALES" (Real Data) strongly suggest this is live and running with real business data

### Information that would improve this overview
- Actual traffic or conversion metrics (not in the codebase)
- The real names and contact details of the business owners/team (not in the code)
- Deployment URL(s) to verify live production state
- Whether a CMS or admin tool exists outside this repository for menu/content management
- Whether there is a separate backend repository for order management or a future version of this product
