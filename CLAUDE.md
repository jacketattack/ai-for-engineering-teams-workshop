# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **workshop repository** for teaching spec-driven development with AI agents. The project builds a Customer Intelligence Dashboard using Next.js 15, React 19, and TypeScript.

**Key Concept**: This workshop teaches creating specifications first, then implementing from those specs. When asked to implement features, always check if a spec exists in `/specs/` before starting.

## Common Commands

### Development
```bash
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm start            # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler without emitting files
```

## Architecture

### Spec-Driven Development Workflow

This project follows a **spec-first methodology**:

1. **Requirements** (`/requirements/`) - Business requirements written in plain language
2. **Templates** (`/templates/spec-template.md`) - Standardized specification structure
3. **Specifications** (`/specs/`) - Detailed technical specs generated from requirements + template
4. **Implementation** (`/src/`) - Components built from specifications

**Critical Pattern**: When implementing features, reference the corresponding spec file using `@specs/[feature-name]-spec.md` to ensure implementation matches the specification.

### Directory Structure

```
/src/
  /app/              # Next.js 15 App Router (pages, layouts)
  /data/             # Mock data and type definitions
  /components/       # React components (created during workshop)

/specs/              # Generated specifications (AI output)
/requirements/       # Feature requirements (human-written input)
/templates/          # Spec template for consistency
/exercises/          # Workshop exercise guides
```

### Data Architecture

**Customer Data Model** (`src/data/mock-customers.ts`):
- Core interface: `Customer` with id, name, company, healthScore, email, subscriptionTier, domains
- Mock data array: `mockCustomers` with 8 sample customers
- Health scores: 0-100 scale for customer health tracking
- Domains: Array of customer websites for health monitoring

All components should import from `@/data/mock-customers` using the TypeScript path alias.

### Component Patterns

**Expected Component Structure**:
- Location: `/src/components/[ComponentName].tsx` (NOT in app directory)
- TypeScript interfaces exported from component files (e.g., `CustomerCardProps`)
- Props-based data flow (no global state in workshop)
- Tailwind CSS for all styling (no custom CSS files)
- Named exports for components and interfaces

**Styling Conventions**:
- Use Tailwind CSS utility classes exclusively
- Responsive design: mobile (320px+), tablet (768px+), desktop (1024px+)
- Health score color coding: red (0-30), yellow (31-70), green (71-100)

## Workshop Context

### Specification Template Structure

All specs must follow this structure (from `/templates/spec-template.md`):
1. **Context** - Purpose, system role, users
2. **Requirements** - Functional, UI, data, integration requirements
3. **Constraints** - Tech stack, performance, design limits, file structure, security
4. **Acceptance Criteria** - Testable success criteria (checkbox format)

### Tech Stack Constraints

**Required for all implementations**:
- Next.js 15 (App Router)
- React 19
- TypeScript with strict mode (`tsconfig.json` has `"strict": true`)
- Tailwind CSS v4
- Path alias: `@/*` maps to `./src/*`

### Workshop Exercises Flow

1. Exercise 00: Effective Prompting Techniques
2. Exercise 01: Write first spec (CustomerCard)
3. Exercise 02: Expand specs (additional components)
4. Exercise 03: Advanced integration (multi-component features)
5. Exercise 04: **Implement from specs** (spec → code)
6. Exercise 05: Build custom slash commands
7. Exercise 06: Introduction to subagents
8. Exercise 07: Advanced subagent orchestration

## Working with This Repository

### When Asked to Generate a Spec

1. Reference `@templates/spec-template.md` for structure
2. Reference `@requirements/[feature-name].md` for business context
3. Save output to `/specs/[feature-name]-spec.md`
4. Follow template sections exactly (Context, Requirements, Constraints, Acceptance Criteria)
5. Include specific details: health score thresholds, responsive breakpoints, TypeScript interfaces

### When Asked to Implement a Feature

1. **Check for existing spec first**: Look in `/specs/[feature-name]-spec.md`
2. If spec exists: Implement according to spec's acceptance criteria
3. Reference mock data from `@/data/mock-customers` for Customer type and sample data
4. Create components in `/src/components/` (NOT in `/src/app/components/`)
5. Export TypeScript interfaces alongside components
6. Verify implementation against spec's acceptance criteria before completing

### When Asked to Review or Refine

- Compare implementation against spec's acceptance criteria section
- Check constraints are met (tech stack, responsive design, TypeScript strict mode)
- Verify component location and naming conventions
- Ensure Tailwind CSS is used (no custom CSS)

## Important Notes

- **Components go in `/src/components/`**, not `/src/app/components/`
- **Always check `/specs/` directory** before implementing to see if a spec exists
- **Mock data is the source of truth** for Customer interface and sample data
- **Specs are contracts** - implementations should match spec acceptance criteria exactly
- This is a **teaching repository** - prioritize clarity and following patterns over optimization
