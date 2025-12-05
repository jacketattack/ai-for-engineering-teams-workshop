# Verify Component Implementation

You are tasked with verifying a component's implementation quality and correctness.

## Instructions

1. **Read the component file** provided as a parameter (e.g., `src/components/CustomerCard.tsx`)

2. **Check TypeScript types**:
   - [ ] No `any` types used (strict mode compliance)
   - [ ] All props have proper type definitions
   - [ ] Interfaces/types are exported if needed by consumers
   - [ ] Return type is explicitly defined or correctly inferred
   - [ ] No TypeScript errors or warnings
   - [ ] Imports are properly typed

3. **Run TypeScript type checking**:
   - Execute `npm run type-check` to verify no type errors
   - Report any TypeScript compilation errors
   - Check that component compiles successfully

4. **Analyze component structure**:
   - [ ] Component is in `/src/components/` directory (correct location)
   - [ ] Uses functional component pattern
   - [ ] Props are destructured properly
   - [ ] Follows React 19 best practices
   - [ ] No console.log or debug code left in

5. **Check styling implementation**:
   - [ ] Uses Tailwind CSS exclusively (no custom CSS imports)
   - [ ] Responsive classes present (mobile-first approach)
   - [ ] No inline style objects (use Tailwind utilities)
   - [ ] Health score color coding if applicable (red/yellow/green)
   - [ ] Follows Tailwind v4 patterns

6. **Test with mock data**:
   - [ ] Component can accept Customer type from `@/data/mock-customers`
   - [ ] Props interface matches expected data structure
   - [ ] Component handles mock data properties correctly
   - [ ] All required props are defined
   - [ ] Optional props have proper handling

7. **Find and compare with specification** (if exists):
   - Search for corresponding spec file in `/specs/` directory
   - If spec found, compare implementation against acceptance criteria
   - Report which criteria are met/not met
   - Note any deviations from spec

8. **Generate verification report**:
   - TypeScript: ✅ PASS / ❌ FAIL (with details)
   - Component Structure: ✅ PASS / ❌ FAIL (with details)
   - Styling: ✅ PASS / ❌ FAIL (with details)
   - Mock Data Compatibility: ✅ PASS / ❌ FAIL (with details)
   - Spec Compliance: ✅ PASS / ❌ FAIL / ⚠️ NO SPEC FOUND (with details)
   - Overall: ✅ PASS / ❌ FAIL

## Verification Checklist Summary

After completing all checks, provide a summary:

```
Component: [ComponentName]
Location: [file path]

✅ TypeScript Types: PASS
✅ Type Check: PASS (no compilation errors)
✅ Component Structure: PASS
✅ Styling: PASS
✅ Mock Data: PASS
✅ Spec Compliance: PASS (or N/A if no spec)

Overall: ✅ PASS
```

## Important Notes

- Run actual TypeScript type checking with `npm run type-check`
- If component imports from `@/data/mock-customers`, verify Customer type usage
- Check for common issues: missing exports, incorrect imports, unused variables
- Compare against spec acceptance criteria if spec file exists
- Report specific line numbers for any issues found

## Example Usage

```
/verify src/components/CustomerCard.tsx
```

This will verify the CustomerCard component's types, structure, styling, and spec compliance.

---

**Parameter**: {{0}} (path to component file, e.g., `src/components/CustomerCard.tsx`)

Now verify the component at path: {{0}}

Follow all verification steps above and provide a comprehensive pass/fail report.
