# Implement Component from Specification

You are tasked with implementing a component based on its specification file.

## Instructions

1. **Read the specification file** provided as a parameter (e.g., `specs/customer-card-spec.md`)
2. **Extract key information**:
   - Component name and purpose from Context section
   - Functional requirements (features, behavior)
   - UI requirements (layout, styling, responsive design)
   - Data requirements (props interface, types)
   - Constraints (tech stack, file location, performance)
   - Acceptance criteria (testable success conditions)

3. **Generate the component**:
   - Location: `/src/components/[ComponentName].tsx` (NOT in app directory)
   - Use TypeScript with strict mode
   - Export TypeScript interfaces for props
   - Import Customer type from `@/data/mock-customers` if needed
   - Use Tailwind CSS exclusively for styling
   - Follow responsive design patterns (mobile-first)
   - Implement all functional requirements from spec

4. **Implementation checklist**:
   - [ ] Component created at correct location (`/src/components/`)
   - [ ] TypeScript interfaces exported
   - [ ] All props properly typed
   - [ ] Tailwind CSS used for all styling
   - [ ] Responsive design implemented (mobile, tablet, desktop)
   - [ ] Health score color coding if applicable (red 0-30, yellow 31-70, green 71-100)
   - [ ] All functional requirements met
   - [ ] All UI requirements met
   - [ ] Data structure matches spec

5. **Verify against acceptance criteria**:
   - Review each checkbox item in spec's Acceptance Criteria section
   - Confirm implementation satisfies each criterion
   - Report any criteria that cannot be fully tested without integration

6. **Output**:
   - Show the component file path and confirm creation
   - List which acceptance criteria are satisfied
   - Note any assumptions made or deviations from spec

## Important Constraints

- Components MUST go in `/src/components/`, NOT `/src/app/components/`
- Use TypeScript strict mode (no `any` types)
- Use Tailwind CSS only (no custom CSS files)
- Import from `@/data/mock-customers` for Customer types
- Follow Next.js 15 and React 19 patterns
- Implement EXACTLY what the spec describes (no over-engineering)

## Example Usage

```
/implement specs/customer-card-spec.md
```

This will read the CustomerCard specification and generate the component at `/src/components/CustomerCard.tsx`.

---

**Parameter**: {{0}} (path to specification file, e.g., `specs/customer-card-spec.md`)

Now read the specification file at path: {{0}}

After reading the spec, implement the component following all instructions above.
