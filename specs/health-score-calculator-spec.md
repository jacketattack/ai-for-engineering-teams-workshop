# Spec: Health Score Calculator

## Feature: Health Score Calculator

### Context

**Purpose**: Build a comprehensive customer health scoring system that provides predictive analytics for customer relationship health and churn risk. This calculator serves as the business intelligence engine for the Customer Intelligence Dashboard.

**Role in the Application**:
- Core algorithm library for calculating customer health scores across multiple dimensions
- Foundational logic layer that powers dashboard visualizations and alerts
- Reusable utility that can be integrated into multiple UI components
- Demonstration of AI-assisted algorithm design and collaborative development

**System Integration**:
- Pure function library located at `/src/lib/healthCalculator.ts`
- Integrated with `CustomerHealthDisplay` widget component
- Works in conjunction with `CustomerSelector` for real-time health score updates
- Provides data structure for health score breakdown visualizations
- Follows existing dashboard component patterns for consistency

**Target Users**:
- Customer Success Managers monitoring customer health trends
- Account Managers identifying at-risk customers requiring intervention
- Executive stakeholders viewing aggregate health metrics
- Development team members implementing health-based features

---

### Requirements

#### Functional Requirements

**Core Algorithm**:
- Calculate customer health scores on a 0-100 scale with clear risk level categorization
- Multi-factor scoring system considering:
  - Payment history (40% weight)
  - Engagement metrics (30% weight)
  - Contract status (20% weight)
  - Support satisfaction (10% weight)
- Risk level classification:
  - **Healthy**: 71-100 (green)
  - **Warning**: 31-70 (yellow)
  - **Critical**: 0-30 (red)
- Return detailed breakdown of individual factor scores
- Support trend analysis for improving vs declining customers

**Pure Function Architecture**:
- All functions must be pure (no side effects) for predictable testing
- Individual scoring functions:
  - `calculatePaymentScore(paymentData: PaymentHistory): number`
  - `calculateEngagementScore(engagementData: EngagementMetrics): number`
  - `calculateContractScore(contractData: ContractInfo): number`
  - `calculateSupportScore(supportData: SupportData): number`
- Main calculator function:
  - `calculateHealthScore(customerData: CustomerHealthData): HealthScoreResult`
- Comprehensive input validation with descriptive error messages
- Normalization strategies for different data types and ranges

**Data Input Processing**:
- **Payment History**:
  - Days since last payment
  - Average payment delay (in days)
  - Overdue amount (numerical value)
  - Payment consistency score
- **Engagement Metrics**:
  - Login frequency (logins per month)
  - Feature usage count
  - Support tickets opened
  - Active user count
- **Contract Information**:
  - Days until renewal
  - Contract value (annual)
  - Recent upgrades (boolean or count)
  - Auto-renewal status
- **Support Data**:
  - Average resolution time (in hours)
  - Satisfaction scores (1-5 scale)
  - Escalation counts
  - Open ticket count

**Error Handling**:
- Custom error classes extending base Error:
  - `InvalidInputError` for data validation failures
  - `CalculationError` for mathematical operation failures
- Validation checks for:
  - Missing required fields
  - Out-of-range values
  - Invalid data types
  - Null/undefined handling
- Descriptive error messages indicating which field failed validation

**Edge Case Handling**:
- New customers with minimal data (< 30 days history)
- Missing optional data fields (graceful degradation)
- Zero values that would cause division errors
- Extreme outliers in data ranges
- Negative values where not expected

#### User Interface Requirements

**CustomerHealthDisplay Widget**:
- Overall health score displayed prominently with large numerals
- Color-coded visualization matching health score thresholds:
  - Critical (0-30): red background/border
  - Warning (31-70): yellow background/border
  - Healthy (71-100): green background/border
- Expandable breakdown showing individual factor scores:
  - Payment: score + visual indicator
  - Engagement: score + visual indicator
  - Contract: score + visual indicator
  - Support: score + visual indicator
- Loading state with skeleton UI during calculation
- Error state with clear error message and retry option
- Responsive design following dashboard breakpoints

**Integration with CustomerSelector**:
- Real-time health score updates when customer selection changes
- Smooth transitions between customer data
- Loading indicators during recalculation
- Error boundaries for calculation failures

#### Data Requirements

**TypeScript Interfaces**:

```typescript
// Input data structures
interface PaymentHistory {
  daysSinceLastPayment: number;
  averagePaymentDelay: number;
  overdueAmount: number;
  paymentConsistency?: number; // Optional 0-1 score
}

interface EngagementMetrics {
  loginsPerMonth: number;
  featureUsageCount: number;
  supportTicketsOpened: number;
  activeUserCount?: number;
}

interface ContractInfo {
  daysUntilRenewal: number;
  contractValue: number;
  hasRecentUpgrades: boolean;
  autoRenewalEnabled?: boolean;
}

interface SupportData {
  averageResolutionTimeHours: number;
  satisfactionScore: number; // 1-5 scale
  escalationCount: number;
  openTicketCount: number;
}

interface CustomerHealthData {
  payment: PaymentHistory;
  engagement: EngagementMetrics;
  contract: ContractInfo;
  support: SupportData;
  customerId?: string; // For logging/debugging
}

// Output data structures
interface FactorScore {
  score: number; // 0-100
  weight: number; // Percentage as decimal (e.g., 0.4 for 40%)
  weightedScore: number; // score * weight
}

interface HealthScoreResult {
  overallScore: number; // 0-100
  riskLevel: 'healthy' | 'warning' | 'critical';
  breakdown: {
    payment: FactorScore;
    engagement: FactorScore;
    contract: FactorScore;
    support: FactorScore;
  };
  calculatedAt: Date;
  customerId?: string;
}
```

**Mock Data Integration**:
- Extend `Customer` interface to optionally include `healthData: CustomerHealthData`
- Create mock customer health data for testing in `/src/data/mock-customer-health.ts`
- Maintain consistency with existing `mockCustomers` array

#### Integration Requirements

- Seamless integration with existing `CustomerSelector` component
- Consistent error handling patterns with other dashboard widgets
- Dashboard layout integration maintaining responsive design (320px+, 768px+, 1024px+)
- Color coding consistency with existing health score indicators
- Export all public interfaces and functions from calculator module
- No external API dependencies (pure computation)

---

### Constraints

#### Technical Stack
- **TypeScript**: Strict mode enabled (`strict: true`)
- **Next.js 15**: App Router architecture
- **React 19**: For UI component integration
- **Tailwind CSS v4**: For widget styling
- **No external libraries**: Pure TypeScript/JavaScript for calculations
- Path alias: `@/lib/healthCalculator` for imports

#### File Structure
- Calculator logic: `/src/lib/healthCalculator.ts`
- Type definitions: Co-located in calculator file or separate `/src/lib/healthCalculator.types.ts`
- Mock health data: `/src/data/mock-customer-health.ts`
- UI widget: `/src/components/CustomerHealthDisplay.tsx`
- Unit tests: `/src/lib/__tests__/healthCalculator.test.ts` (future)

#### Performance Requirements
- Health score calculation must complete in < 10ms for real-time updates
- Efficient algorithms avoiding O(n²) or worse complexity
- Minimal memory allocation (avoid excessive object creation)
- Consider memoization for repeated calculations of same customer
- Widget render time < 100ms for responsive dashboard experience

#### Code Quality Standards
- **JSDoc comments**: All public functions and interfaces must have comprehensive JSDoc
  - Explain business logic and mathematical formulas
  - Document parameter ranges and validation rules
  - Include example usage
- **Pure functions**: No side effects, no mutations
- **Comprehensive validation**: All inputs validated before processing
- **Type safety**: No `any` types, explicit return types on all functions
- **Error handling**: Try-catch blocks with specific error types
- **Code organization**: Logical grouping of related functions

#### Security Considerations
- Input sanitization for all customer data
- Prevent code injection through data fields
- No sensitive data logging (PII, financial data)
- Error messages must not expose system internals
- Rate limiting considerations for API integration (future)

#### Design Constraints
- Widget must fit within dashboard grid layout
- Responsive breakpoints:
  - Mobile (320px+): Stacked vertical layout
  - Tablet (768px+): Horizontal split layout
  - Desktop (1024px+): Full detail with charts
- Accessibility: WCAG 2.1 AA compliance
  - Color-blind safe color palette
  - Screen reader compatible
  - Keyboard navigation support
- Maximum widget height: 400px (collapsible for breakdown)

#### Mathematical Constraints
- All scores normalized to 0-100 scale
- Weighting scheme must sum to 100%:
  - Payment: 40%
  - Engagement: 30%
  - Contract: 20%
  - Support: 10%
- Threshold boundaries are inclusive:
  - Critical: [0, 30]
  - Warning: [31, 70]
  - Healthy: [71, 100]
- Rounding strategy: Round final score to nearest integer

---

### Acceptance Criteria

#### Core Functionality
- [ ] `calculateHealthScore` function accepts `CustomerHealthData` and returns `HealthScoreResult`
- [ ] Overall score is weighted average of all factor scores (40% payment, 30% engagement, 20% contract, 10% support)
- [ ] Risk level correctly categorized: 0-30 critical, 31-70 warning, 71-100 healthy
- [ ] Individual factor scores calculated and returned in breakdown
- [ ] All factor scores normalized to 0-100 scale
- [ ] `calculatedAt` timestamp included in result
- [ ] All calculations produce deterministic results (same input = same output)

#### Payment Score Calculation
- [ ] Days since last payment impacts score (0 days = best, 60+ days = worst)
- [ ] Average payment delay reduces score proportionally
- [ ] Overdue amounts significantly reduce score
- [ ] Payment consistency bonus applied when available
- [ ] Score correctly normalized to 0-100 range

#### Engagement Score Calculation
- [ ] Higher login frequency increases score
- [ ] Feature usage count positively impacts score
- [ ] Support ticket count moderately reduces score (indicates issues)
- [ ] Active user count (if available) boosts score
- [ ] Score correctly normalized to 0-100 range

#### Contract Score Calculation
- [ ] Days until renewal impacts score (360+ days = best, <30 days = urgent attention)
- [ ] Contract value provides stability bonus
- [ ] Recent upgrades significantly boost score
- [ ] Auto-renewal enabled provides confidence boost
- [ ] Score correctly normalized to 0-100 range

#### Support Score Calculation
- [ ] Lower average resolution time increases score
- [ ] Higher satisfaction scores (4-5) boost score significantly
- [ ] Escalation count reduces score proportionally
- [ ] Open ticket count moderately impacts score
- [ ] Score correctly normalized to 0-100 range

#### Input Validation
- [ ] Missing required fields throw `InvalidInputError` with descriptive message
- [ ] Negative values (where inappropriate) throw validation error
- [ ] Out-of-range values throw validation error with expected range
- [ ] Invalid data types throw validation error
- [ ] Null/undefined inputs handled gracefully with clear error

#### Edge Cases
- [ ] New customers (<30 days) receive default neutral scores with warning flag
- [ ] Missing optional fields handled without errors (graceful degradation)
- [ ] Zero values in denominators prevented (no division by zero)
- [ ] Extreme outliers capped at reasonable maximums
- [ ] Empty/minimal data returns valid result with low confidence indicator

#### TypeScript & Code Quality
- [ ] All interfaces exported from module
- [ ] Strict TypeScript mode passes with no errors
- [ ] No `any` types used anywhere
- [ ] All functions have explicit return types
- [ ] JSDoc comments on all public functions with examples
- [ ] Pure functions with no side effects or mutations

#### UI Component Integration
- [ ] `CustomerHealthDisplay` widget displays overall score prominently
- [ ] Color coding matches risk levels (red/yellow/green)
- [ ] Expandable breakdown shows all four factor scores
- [ ] Loading state displayed during calculation
- [ ] Error state displayed with retry option on calculation failure
- [ ] Smooth transitions between customer selections

#### Responsive Design
- [ ] Widget renders correctly on mobile (320px+)
- [ ] Widget renders correctly on tablet (768px+)
- [ ] Widget renders correctly on desktop (1024px+)
- [ ] Layout adjusts appropriately at each breakpoint
- [ ] Touch targets meet minimum size requirements (44x44px)

#### Integration Verification
- [ ] Calculator integrates with `CustomerSelector` component
- [ ] Real-time updates when customer selection changes
- [ ] Error boundaries catch and display calculation errors
- [ ] Dashboard layout maintains responsive design with widget
- [ ] Color coding consistent with other dashboard health indicators

#### Performance Validation
- [ ] Health score calculation completes in <10ms (tested with realistic data)
- [ ] Widget renders in <100ms from data received
- [ ] No memory leaks in repeated calculations
- [ ] Efficient re-renders when customer data changes
- [ ] Memoization implemented for repeated calculations (if applicable)

#### Testing Coverage
- [ ] Unit tests for all individual factor calculation functions
- [ ] Unit tests for main `calculateHealthScore` function
- [ ] Edge case tests for boundary conditions
- [ ] Input validation tests for all error scenarios
- [ ] Mathematical accuracy verification tests
- [ ] Mock data scenarios test realistic customer profiles

#### Documentation
- [ ] README section explaining algorithm design and weighting rationale
- [ ] JSDoc examples showing usage of all public functions
- [ ] Algorithm design decisions documented with business justification
- [ ] Edge case handling strategy documented
- [ ] Future refinement and A/B testing recommendations included
- [ ] Monitoring and calibration guidelines for production deployment

---

## Implementation Notes

**Algorithm Design Philosophy**:
This specification intentionally requires collaborative exploration of the algorithm design with AI assistance. Before implementation, developers should engage in a requirements refinement conversation covering:

1. **Weighting Justification**: Why 40/30/20/10 split? Business assumptions?
2. **Normalization Strategies**: How to normalize disparate data types consistently?
3. **Edge Case Philosophy**: Fail-safe vs fail-fast for missing data?
4. **Trend Analysis**: Should historical trends influence current score?
5. **New Customer Handling**: Default neutral score vs conservative pessimistic score?

**Explainability Requirement**:
All algorithm decisions must be explainable to non-technical stakeholders. The implementation should facilitate generating plain-English explanations of why a customer received a particular score.

**Future Enhancements**:
- Machine learning model integration for predictive scoring
- Historical trend analysis and forecasting
- Customizable weighting per customer segment
- Real-time alerting on score changes
- Integration with CRM systems for automated workflows
