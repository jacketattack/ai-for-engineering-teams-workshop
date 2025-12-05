# Spec Template for Workshop

## Feature: CustomerCard Component

### Context
- **Purpose**: Display individual customer information in a card format for quick identification and health monitoring
- **System Role**: Reusable presentation component within the Customer Intelligence Dashboard that will be used inside the CustomerSelector container component
- **Users**: Customer success managers, account managers, and support staff who need to quickly assess customer health and identify customers by their domains
- **Use Case**: Provides at-a-glance customer information including name, company, health status, and associated domains to enable rapid customer identification and health assessment

### Requirements

#### Functional Requirements
- Display customer name prominently as the primary identifier
- Display company name as secondary identifier
- Show numeric health score (0-100 scale) with visual indicator
- Display customer domains (website URLs) for health monitoring context
- Show domain count indicator when customer has multiple domains (e.g., "+2 more domains")
- Implement color-coded health status system:
  - **Red (0-30)**: Poor health score - requires immediate attention
  - **Yellow (31-70)**: Moderate health score - needs monitoring
  - **Green (71-100)**: Good health score - healthy customer
- Support both single domain and multiple domain display scenarios

#### User Interface Requirements
- Card-based visual design with clear visual hierarchy
- Responsive layout that adapts to mobile (320px+), tablet (768px+), and desktop (1024px+) breakpoints
- Health score indicator should be visually prominent with color-coded background or border
- Clean, professional appearance consistent with dashboard aesthetics
- Adequate spacing and padding for readability
- Domain information should be clearly associated with the customer
- Display first domain with option to show additional domain count
- If there are multiple domains, instead it should show a light-blue tag-like component that on hover shows a bulleted-list of the domains for user to see

#### Data Requirements
- Import `Customer` interface from `@/data/mock-customers`
- Customer data structure includes:
  - `id`: string (unique identifier)
  - `name`: string (customer name)
  - `company`: string (company name)
  - `healthScore`: number (0-100)
  - `domains?`: string[] (optional array of website URLs)
- Component must handle customers with no domains gracefully
- Component must handle customers with 1 domain
- Component must handle customers with multiple domains (show first + count)

#### Integration Requirements
- Will be used within CustomerSelector container component
- Should accept Customer object as prop
- No direct data fetching - receives data from parent component
- Should be composable and reusable across different contexts

### Constraints

#### Technical Stack
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 utility classes only (no custom CSS files)
- **Path Alias**: Use `@/*` for imports mapping to `./src/*`

#### Performance Requirements
- Component should render in under 16ms for 60fps performance
- No unnecessary re-renders - component should be pure/memoizable
- Minimal DOM nodes for optimal rendering performance

#### Design Constraints
- **Responsive Breakpoints**:
  - Mobile: 320px minimum width
  - Tablet: 768px and above
  - Desktop: 1024px and above
- **Health Score Thresholds** (strict ranges):
  - Poor: 0-30 (red indicator)
  - Moderate: 31-70 (yellow indicator)
  - Good: 71-100 (green indicator)
- Card should have consistent height across instances when displayed in a grid/list
- Maximum width should be constrained for optimal readability

#### File Structure and Naming
- **Component Location**: `/src/components/CustomerCard.tsx`
- **Component Name**: `CustomerCard` (PascalCase, named export)
- **Props Interface**: `CustomerCardProps` (exported from same file)
- Do NOT place in `/src/app/components/` directory

#### Props Interface and TypeScript Definitions
```typescript
export interface CustomerCardProps {
  customer: Customer;
  className?: string; // Optional for additional styling
}
```

#### Security Considerations
- Sanitize domain URLs if rendered as links (prevent XSS)
- No sensitive data beyond what's defined in Customer interface
- Component is read-only (no mutations)

### Acceptance Criteria
- [ ] Component renders customer name, company, and health score correctly
- [ ] Health score color coding works for all three ranges:
  - [ ] Red indicator displays for scores 0-30
  - [ ] Yellow indicator displays for scores 31-70
  - [ ] Green indicator displays for scores 71-100
- [ ] Component handles customers with no domains without errors
- [ ] Component displays single domain when customer has exactly 1 domain
- [ ] Component displays first domain + count indicator for multiple domains (e.g., "acmecorp.com +1 more")
- [ ] Component is fully responsive across mobile (320px+), tablet (768px+), and desktop (1024px+)
- [ ] TypeScript strict mode passes with no errors
- [ ] Component exports both `CustomerCard` and `CustomerCardProps` as named exports
- [ ] Component file is located at `/src/components/CustomerCard.tsx`
- [ ] Only Tailwind CSS classes are used (no custom CSS files)
- [ ] Component uses `@/data/mock-customers` import path for Customer type
- [ ] Card has clean, professional appearance with adequate spacing
- [ ] Component can be tested with all 8 customers from mockCustomers array
- [ ] Health score number is visible alongside color indicator
