# Feature: Button Component

## Context
- Reusable button component for the Customer Intelligence Dashboard
- Primary interaction element used throughout the dashboard for user actions
- Part of the design system to ensure consistency across all UI elements
- Used by business analysts to trigger actions like filtering, saving, exporting, and navigation
- Foundation component that other features will depend on for consistent interaction patterns

## Requirements

### Functional Requirements
- Accept `label` (string) prop for button text content
- Accept `onClick` handler prop for click events
- Accept `variant` prop to control visual appearance: `primary`, `secondary`, `danger`
- Support loading state with visual spinner indicator
- Disable button interaction during loading state
- Provide accessible experience with proper ARIA labels and states

### User Interface Requirements
- Visual variants:
  - **Primary**: Prominent blue background for main actions (e.g., "Save", "Apply")
  - **Secondary**: Neutral gray background for secondary actions (e.g., "Cancel", "Reset")
  - **Danger**: Red background for destructive actions (e.g., "Delete", "Remove")
- Loading state displays spinner icon with reduced opacity
- Hover and focus states with visual feedback (darker shade, scale transform)
- Disabled state with reduced opacity and no pointer interaction
- Consistent padding and typography across all variants
- Smooth transitions for state changes

### Data Requirements
- Props interface exported as `ButtonProps`:
  - `label: string` - Button text content
  - `onClick: () => void` - Click event handler
  - `variant?: 'primary' | 'secondary' | 'danger'` - Visual style (defaults to 'primary')
  - `isLoading?: boolean` - Loading state flag (defaults to false)
  - `disabled?: boolean` - Disabled state flag (defaults to false)
  - `ariaLabel?: string` - Custom ARIA label for accessibility (defaults to label prop)

### Integration Requirements
- Self-contained component with no external dependencies beyond React
- Can be imported and used anywhere in the dashboard application
- Compatible with form submissions and event handlers
- Properly typed for TypeScript consumers

## Constraints

### Technical Stack
- React 19 with TypeScript
- TypeScript strict mode enabled
- Tailwind CSS for all styling (no custom CSS files)
- Next.js 15 App Router compatible

### Performance Requirements
- Fast rendering (< 10ms per button instance)
- No layout shift during state changes
- Efficient re-renders using React best practices

### Design Constraints
- Maximum button width: 200px
- Minimum button height: 40px
- Responsive text size using Tailwind typography
- Consistent spacing: horizontal padding 16px, vertical padding 10px
- Border radius: 6px for modern, friendly appearance
- Spinner size: 20px diameter during loading state

### File Structure and Naming
- Component file: `components/Button.tsx`
- Props interface: `ButtonProps` exported from component file
- Follow PascalCase for component name
- Use named exports for the component and interface

### Accessibility Requirements
- Proper `button` HTML element (not div or span)
- `aria-label` attribute for screen readers
- `aria-busy="true"` during loading state
- `disabled` attribute when button is disabled or loading
- Keyboard accessible (Enter and Space key activation)
- Focus visible indicator for keyboard navigation

### Security Considerations
- Sanitize label text to prevent XSS attacks
- No execution of arbitrary code through props
- Proper TypeScript types to prevent malicious data injection

## Acceptance Criteria

- [ ] Component accepts and renders label prop correctly
- [ ] onClick handler fires when button is clicked (non-loading, non-disabled)
- [ ] Three variants render with correct colors: primary (blue), secondary (gray), danger (red)
- [ ] Loading state displays spinner and disables interaction
- [ ] Disabled state prevents clicks and shows visual feedback
- [ ] Button width does not exceed 200px maximum
- [ ] Hover state provides visual feedback with color change
- [ ] Focus state shows visible outline for keyboard users
- [ ] ARIA labels are properly set for accessibility
- [ ] aria-busy attribute is set to true during loading state
- [ ] TypeScript interface `ButtonProps` is exported
- [ ] Component passes TypeScript strict mode checks
- [ ] No console errors or warnings
- [ ] Component is keyboard accessible (Enter and Space keys work)
- [ ] Smooth transitions between states (normal, hover, loading, disabled)
- [ ] Works correctly in both light and dark mode contexts
- [ ] Follows project code style and conventions
