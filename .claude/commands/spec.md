# Generate Specification from Requirements

You are tasked with generating a detailed technical specification for a component or feature.

## Instructions

1. **Extract the component name** from the user's command (e.g., `/spec CustomerCard` → component name is "CustomerCard")

2. **Read the requirements file** at `@requirements/{component-name}.md` (convert to kebab-case if needed, e.g., CustomerCard → customer-card.md)

3. **Read the spec template** at `@templates/spec-template.md` to understand the required structure

4. **Generate a complete specification** that includes:
   - **Context**: Purpose, role in the application, system integration, and target users
   - **Requirements**: Functional, UI, data, and integration requirements based on the requirements file
   - **Constraints**: Tech stack (Next.js 15, React 19, TypeScript, Tailwind CSS), performance requirements, responsive design breakpoints, file structure, TypeScript interfaces, and security considerations
   - **Acceptance Criteria**: Testable checkboxes for success criteria, edge cases, UX validation, and integration verification

5. **Save the specification** to `@specs/{component-name}-spec.md` (use kebab-case for filename)

6. **Verify completeness**: Ensure all sections from the template are filled out with specific, actionable details

## Context from CLAUDE.md

- Mock data is available at `@/data/mock-customers`
- Components should be created in `/src/components/`
- Use TypeScript with strict mode
- Use Tailwind CSS exclusively for styling
- Health score color coding: red (0-30), yellow (31-70), green (71-100)
- Responsive breakpoints: mobile (320px+), tablet (768px+), desktop (1024px+)

## Output

After generating the spec, provide a brief summary of what was created and highlight any key decisions or assumptions made.
