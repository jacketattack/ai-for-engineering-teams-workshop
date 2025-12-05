/**
 * Health Score Calculator
 *
 * Comprehensive customer health scoring system that provides predictive analytics
 * for customer relationship health and churn risk. Calculates scores across multiple
 * dimensions: payment history, engagement metrics, contract status, and support satisfaction.
 *
 * @module healthCalculator
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Payment history data for a customer
 */
export interface PaymentHistory {
  /** Number of days since the last payment was received */
  daysSinceLastPayment: number;
  /** Average delay in payment processing (in days) */
  averagePaymentDelay: number;
  /** Current overdue amount in dollars */
  overdueAmount: number;
  /** Optional consistency score (0-1 scale) indicating payment reliability */
  paymentConsistency?: number;
}

/**
 * Customer engagement metrics
 */
export interface EngagementMetrics {
  /** Number of logins per month */
  loginsPerMonth: number;
  /** Count of features actively used */
  featureUsageCount: number;
  /** Number of support tickets opened */
  supportTicketsOpened: number;
  /** Optional count of active users in the account */
  activeUserCount?: number;
}

/**
 * Contract information for a customer
 */
export interface ContractInfo {
  /** Days remaining until contract renewal */
  daysUntilRenewal: number;
  /** Annual contract value in dollars */
  contractValue: number;
  /** Whether the customer has made recent upgrades */
  hasRecentUpgrades: boolean;
  /** Optional flag indicating if auto-renewal is enabled */
  autoRenewalEnabled?: boolean;
}

/**
 * Customer support interaction data
 */
export interface SupportData {
  /** Average time to resolve support tickets (in hours) */
  averageResolutionTimeHours: number;
  /** Customer satisfaction score (1-5 scale) */
  satisfactionScore: number;
  /** Number of tickets that were escalated */
  escalationCount: number;
  /** Number of currently open tickets */
  openTicketCount: number;
}

/**
 * Complete customer health data required for scoring
 */
export interface CustomerHealthData {
  /** Payment history information */
  payment: PaymentHistory;
  /** Engagement metrics */
  engagement: EngagementMetrics;
  /** Contract details */
  contract: ContractInfo;
  /** Support interaction data */
  support: SupportData;
  /** Optional customer ID for logging and debugging */
  customerId?: string;
}

/**
 * Individual factor score with weighting information
 */
export interface FactorScore {
  /** Raw score (0-100) */
  score: number;
  /** Weight as decimal (e.g., 0.4 for 40%) */
  weight: number;
  /** Weighted contribution to overall score (score * weight) */
  weightedScore: number;
}

/**
 * Risk level classification for customer health
 */
export type RiskLevel = 'healthy' | 'warning' | 'critical';

/**
 * Complete health score calculation result
 */
export interface HealthScoreResult {
  /** Overall health score (0-100) */
  overallScore: number;
  /** Risk level classification */
  riskLevel: RiskLevel;
  /** Detailed breakdown of individual factor scores */
  breakdown: {
    payment: FactorScore;
    engagement: FactorScore;
    contract: FactorScore;
    support: FactorScore;
  };
  /** Timestamp when calculation was performed */
  calculatedAt: Date;
  /** Optional customer ID for reference */
  customerId?: string;
}

// ============================================================================
// Custom Error Classes
// ============================================================================

/**
 * Error thrown when input data fails validation
 */
export class InvalidInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidInputError';
    Object.setPrototypeOf(this, InvalidInputError.prototype);
  }
}

/**
 * Error thrown when calculation operations fail
 */
export class CalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CalculationError';
    Object.setPrototypeOf(this, CalculationError.prototype);
  }
}

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Validates that a number is non-negative
 * @throws {InvalidInputError} If value is negative
 */
function validateNonNegative(value: number, fieldName: string): void {
  if (value < 0) {
    throw new InvalidInputError(`${fieldName} must be non-negative, got ${value}`);
  }
}

/**
 * Validates that a number is within a specific range
 * @throws {InvalidInputError} If value is out of range
 */
function validateRange(value: number, min: number, max: number, fieldName: string): void {
  if (value < min || value > max) {
    throw new InvalidInputError(`${fieldName} must be between ${min} and ${max}, got ${value}`);
  }
}

/**
 * Validates that a required field is present
 * @throws {InvalidInputError} If value is null or undefined
 */
function validateRequired(value: unknown, fieldName: string): void {
  if (value === null || value === undefined) {
    throw new InvalidInputError(`${fieldName} is required but was not provided`);
  }
}

/**
 * Validates that a value is a finite number
 * @throws {InvalidInputError} If value is not a finite number
 */
function validateFiniteNumber(value: number, fieldName: string): void {
  if (!Number.isFinite(value)) {
    throw new InvalidInputError(`${fieldName} must be a finite number, got ${value}`);
  }
}

// ============================================================================
// Score Normalization Utilities
// ============================================================================

/**
 * Clamps a value between 0 and 100
 */
function clampScore(score: number): number {
  return Math.max(0, Math.min(100, score));
}

/**
 * Normalizes a value from a source range to 0-100 scale
 * Higher source values produce higher scores
 */
function normalizeToScore(value: number, min: number, max: number): number {
  if (max === min) return 50; // Neutral score for no range
  const normalized = ((value - min) / (max - min)) * 100;
  return clampScore(normalized);
}

/**
 * Inverse normalization: higher source values produce lower scores
 * Useful for metrics where lower is better (e.g., days overdue)
 */
function inverseNormalizeToScore(value: number, min: number, max: number): number {
  if (max === min) return 50; // Neutral score for no range
  const normalized = ((max - value) / (max - min)) * 100;
  return clampScore(normalized);
}

// ============================================================================
// Individual Factor Calculation Functions
// ============================================================================

/**
 * Calculate payment health score (0-100)
 *
 * Considers:
 * - Days since last payment (0 days = best, 60+ days = worst)
 * - Average payment delay (0 days = best, 30+ days = worst)
 * - Overdue amount (0 = best, higher = worse)
 * - Payment consistency bonus (optional)
 *
 * @param paymentData - Payment history information
 * @returns Normalized payment score (0-100)
 * @throws {InvalidInputError} If data validation fails
 *
 * @example
 * const score = calculatePaymentScore({
 *   daysSinceLastPayment: 15,
 *   averagePaymentDelay: 5,
 *   overdueAmount: 0,
 *   paymentConsistency: 0.9
 * }); // Returns ~85
 */
export function calculatePaymentScore(paymentData: PaymentHistory): number {
  validateRequired(paymentData, 'paymentData');

  const { daysSinceLastPayment, averagePaymentDelay, overdueAmount, paymentConsistency } = paymentData;

  // Validate required fields
  validateRequired(daysSinceLastPayment, 'daysSinceLastPayment');
  validateRequired(averagePaymentDelay, 'averagePaymentDelay');
  validateRequired(overdueAmount, 'overdueAmount');

  validateFiniteNumber(daysSinceLastPayment, 'daysSinceLastPayment');
  validateFiniteNumber(averagePaymentDelay, 'averagePaymentDelay');
  validateFiniteNumber(overdueAmount, 'overdueAmount');

  validateNonNegative(daysSinceLastPayment, 'daysSinceLastPayment');
  validateNonNegative(averagePaymentDelay, 'averagePaymentDelay');
  validateNonNegative(overdueAmount, 'overdueAmount');

  // Validate optional fields if present
  if (paymentConsistency !== undefined) {
    validateFiniteNumber(paymentConsistency, 'paymentConsistency');
    validateRange(paymentConsistency, 0, 1, 'paymentConsistency');
  }

  // Calculate component scores
  // Days since last payment: 0 days = 100, 60+ days = 0
  const daysSinceScore = inverseNormalizeToScore(Math.min(daysSinceLastPayment, 60), 0, 60);

  // Average payment delay: 0 days = 100, 30+ days = 0
  const delayScore = inverseNormalizeToScore(Math.min(averagePaymentDelay, 30), 0, 30);

  // Overdue amount: $0 = 100, $10000+ = 0
  const overdueScore = inverseNormalizeToScore(Math.min(overdueAmount, 10000), 0, 10000);

  // Weighted average of components
  let baseScore = (daysSinceScore * 0.3) + (delayScore * 0.35) + (overdueScore * 0.35);

  // Apply consistency bonus if available
  if (paymentConsistency !== undefined) {
    const consistencyBonus = paymentConsistency * 10; // Up to 10 point bonus
    baseScore = Math.min(100, baseScore + consistencyBonus);
  }

  return Math.round(clampScore(baseScore));
}

/**
 * Calculate engagement health score (0-100)
 *
 * Considers:
 * - Login frequency (higher = better)
 * - Feature usage count (higher = better)
 * - Support tickets opened (moderate count acceptable, very high = concerning)
 * - Active user count (higher = better, optional)
 *
 * @param engagementData - Engagement metrics
 * @returns Normalized engagement score (0-100)
 * @throws {InvalidInputError} If data validation fails
 *
 * @example
 * const score = calculateEngagementScore({
 *   loginsPerMonth: 45,
 *   featureUsageCount: 12,
 *   supportTicketsOpened: 3,
 *   activeUserCount: 8
 * }); // Returns ~78
 */
export function calculateEngagementScore(engagementData: EngagementMetrics): number {
  validateRequired(engagementData, 'engagementData');

  const { loginsPerMonth, featureUsageCount, supportTicketsOpened, activeUserCount } = engagementData;

  // Validate required fields
  validateRequired(loginsPerMonth, 'loginsPerMonth');
  validateRequired(featureUsageCount, 'featureUsageCount');
  validateRequired(supportTicketsOpened, 'supportTicketsOpened');

  validateFiniteNumber(loginsPerMonth, 'loginsPerMonth');
  validateFiniteNumber(featureUsageCount, 'featureUsageCount');
  validateFiniteNumber(supportTicketsOpened, 'supportTicketsOpened');

  validateNonNegative(loginsPerMonth, 'loginsPerMonth');
  validateNonNegative(featureUsageCount, 'featureUsageCount');
  validateNonNegative(supportTicketsOpened, 'supportTicketsOpened');

  // Validate optional fields if present
  if (activeUserCount !== undefined) {
    validateFiniteNumber(activeUserCount, 'activeUserCount');
    validateNonNegative(activeUserCount, 'activeUserCount');
  }

  // Calculate component scores
  // Logins per month: 0 = 0, 60+ = 100 (1-2 logins per day = excellent)
  const loginScore = normalizeToScore(Math.min(loginsPerMonth, 60), 0, 60);

  // Feature usage: 0 = 0, 20+ = 100
  const featureScore = normalizeToScore(Math.min(featureUsageCount, 20), 0, 20);

  // Support tickets: 0-5 = 100, 6-15 = moderate, 16+ = concerning
  let ticketScore: number;
  if (supportTicketsOpened <= 5) {
    ticketScore = 100;
  } else if (supportTicketsOpened <= 15) {
    ticketScore = inverseNormalizeToScore(supportTicketsOpened, 5, 15);
  } else {
    ticketScore = inverseNormalizeToScore(Math.min(supportTicketsOpened, 30), 15, 30);
  }

  // Base score without active user count
  let baseScore = (loginScore * 0.4) + (featureScore * 0.4) + (ticketScore * 0.2);

  // Apply active user bonus if available
  if (activeUserCount !== undefined) {
    // 1 user = neutral, 10+ users = significant bonus
    const userBonus = normalizeToScore(Math.min(activeUserCount, 10), 1, 10) * 0.15;
    baseScore = Math.min(100, baseScore + userBonus);
  }

  return Math.round(clampScore(baseScore));
}

/**
 * Calculate contract health score (0-100)
 *
 * Considers:
 * - Days until renewal (360+ days = best, <30 days = needs attention)
 * - Contract value (higher = more stable)
 * - Recent upgrades (strong positive signal)
 * - Auto-renewal status (confidence boost)
 *
 * @param contractData - Contract information
 * @returns Normalized contract score (0-100)
 * @throws {InvalidInputError} If data validation fails
 *
 * @example
 * const score = calculateContractScore({
 *   daysUntilRenewal: 180,
 *   contractValue: 50000,
 *   hasRecentUpgrades: true,
 *   autoRenewalEnabled: true
 * }); // Returns ~88
 */
export function calculateContractScore(contractData: ContractInfo): number {
  validateRequired(contractData, 'contractData');

  const { daysUntilRenewal, contractValue, hasRecentUpgrades, autoRenewalEnabled } = contractData;

  // Validate required fields
  validateRequired(daysUntilRenewal, 'daysUntilRenewal');
  validateRequired(contractValue, 'contractValue');
  validateRequired(hasRecentUpgrades, 'hasRecentUpgrades');

  validateFiniteNumber(daysUntilRenewal, 'daysUntilRenewal');
  validateFiniteNumber(contractValue, 'contractValue');
  validateNonNegative(contractValue, 'contractValue');

  // Validate optional fields if present
  if (autoRenewalEnabled !== undefined && typeof autoRenewalEnabled !== 'boolean') {
    throw new InvalidInputError('autoRenewalEnabled must be a boolean');
  }

  // Calculate component scores
  // Days until renewal: <30 = urgent, 30-180 = moderate, 180-360 = good, 360+ = excellent
  let renewalScore: number;
  if (daysUntilRenewal < 0) {
    renewalScore = 0; // Expired contract
  } else if (daysUntilRenewal < 30) {
    renewalScore = normalizeToScore(daysUntilRenewal, 0, 30) * 0.5; // Critical period
  } else if (daysUntilRenewal < 180) {
    renewalScore = 50 + normalizeToScore(daysUntilRenewal - 30, 0, 150) * 0.3;
  } else {
    renewalScore = 80 + normalizeToScore(Math.min(daysUntilRenewal - 180, 180), 0, 180) * 0.2;
  }

  // Contract value: $0 = 0, $100k+ = 100 (higher value = more stable relationship)
  const valueScore = normalizeToScore(Math.min(contractValue, 100000), 0, 100000);

  // Recent upgrades: strong positive signal
  const upgradeBonus = hasRecentUpgrades ? 15 : 0;

  // Auto-renewal: confidence boost
  const autoRenewalBonus = autoRenewalEnabled === true ? 10 : 0;

  // Weighted average with bonuses
  const baseScore = (renewalScore * 0.5) + (valueScore * 0.5);
  const finalScore = Math.min(100, baseScore + upgradeBonus + autoRenewalBonus);

  return Math.round(clampScore(finalScore));
}

/**
 * Calculate support health score (0-100)
 *
 * Considers:
 * - Average resolution time (lower = better)
 * - Satisfaction scores (4-5 = excellent)
 * - Escalation count (lower = better)
 * - Open ticket count (lower = better)
 *
 * @param supportData - Support interaction data
 * @returns Normalized support score (0-100)
 * @throws {InvalidInputError} If data validation fails
 *
 * @example
 * const score = calculateSupportScore({
 *   averageResolutionTimeHours: 12,
 *   satisfactionScore: 4.5,
 *   escalationCount: 1,
 *   openTicketCount: 2
 * }); // Returns ~82
 */
export function calculateSupportScore(supportData: SupportData): number {
  validateRequired(supportData, 'supportData');

  const { averageResolutionTimeHours, satisfactionScore, escalationCount, openTicketCount } = supportData;

  // Validate required fields
  validateRequired(averageResolutionTimeHours, 'averageResolutionTimeHours');
  validateRequired(satisfactionScore, 'satisfactionScore');
  validateRequired(escalationCount, 'escalationCount');
  validateRequired(openTicketCount, 'openTicketCount');

  validateFiniteNumber(averageResolutionTimeHours, 'averageResolutionTimeHours');
  validateFiniteNumber(satisfactionScore, 'satisfactionScore');
  validateFiniteNumber(escalationCount, 'escalationCount');
  validateFiniteNumber(openTicketCount, 'openTicketCount');

  validateNonNegative(averageResolutionTimeHours, 'averageResolutionTimeHours');
  validateRange(satisfactionScore, 1, 5, 'satisfactionScore');
  validateNonNegative(escalationCount, 'escalationCount');
  validateNonNegative(openTicketCount, 'openTicketCount');

  // Calculate component scores
  // Resolution time: 0-24 hours = excellent, 24-72 = good, 72+ = concerning
  const resolutionScore = inverseNormalizeToScore(Math.min(averageResolutionTimeHours, 72), 0, 72);

  // Satisfaction: 1 = 0, 5 = 100 (linear scale)
  const satisfactionScoreNormalized = normalizeToScore(satisfactionScore, 1, 5);

  // Escalations: 0 = 100, 10+ = 0
  const escalationScore = inverseNormalizeToScore(Math.min(escalationCount, 10), 0, 10);

  // Open tickets: 0 = 100, 20+ = 0
  const openTicketScore = inverseNormalizeToScore(Math.min(openTicketCount, 20), 0, 20);

  // Weighted average (satisfaction is most important)
  const finalScore = (resolutionScore * 0.25) +
                     (satisfactionScoreNormalized * 0.4) +
                     (escalationScore * 0.2) +
                     (openTicketScore * 0.15);

  return Math.round(clampScore(finalScore));
}

// ============================================================================
// Main Health Score Calculator
// ============================================================================

/**
 * Calculate comprehensive customer health score
 *
 * Combines multiple factors with weighted averaging:
 * - Payment: 40% weight
 * - Engagement: 30% weight
 * - Contract: 20% weight
 * - Support: 10% weight
 *
 * Risk levels:
 * - Healthy: 71-100 (green)
 * - Warning: 31-70 (yellow)
 * - Critical: 0-30 (red)
 *
 * @param customerData - Complete customer health data
 * @returns Complete health score result with breakdown
 * @throws {InvalidInputError} If data validation fails
 * @throws {CalculationError} If calculation operations fail
 *
 * @example
 * const result = calculateHealthScore({
 *   payment: {
 *     daysSinceLastPayment: 10,
 *     averagePaymentDelay: 2,
 *     overdueAmount: 0,
 *     paymentConsistency: 0.95
 *   },
 *   engagement: {
 *     loginsPerMonth: 40,
 *     featureUsageCount: 15,
 *     supportTicketsOpened: 2,
 *     activeUserCount: 5
 *   },
 *   contract: {
 *     daysUntilRenewal: 200,
 *     contractValue: 75000,
 *     hasRecentUpgrades: true,
 *     autoRenewalEnabled: true
 *   },
 *   support: {
 *     averageResolutionTimeHours: 8,
 *     satisfactionScore: 4.5,
 *     escalationCount: 0,
 *     openTicketCount: 1
 *   },
 *   customerId: 'CUST-001'
 * });
 * // Returns: { overallScore: 87, riskLevel: 'healthy', breakdown: {...}, ... }
 */
export function calculateHealthScore(customerData: CustomerHealthData): HealthScoreResult {
  validateRequired(customerData, 'customerData');

  try {
    // Validate that all required sub-objects are present
    validateRequired(customerData.payment, 'customerData.payment');
    validateRequired(customerData.engagement, 'customerData.engagement');
    validateRequired(customerData.contract, 'customerData.contract');
    validateRequired(customerData.support, 'customerData.support');

    // Calculate individual factor scores
    const paymentScore = calculatePaymentScore(customerData.payment);
    const engagementScore = calculateEngagementScore(customerData.engagement);
    const contractScore = calculateContractScore(customerData.contract);
    const supportScore = calculateSupportScore(customerData.support);

    // Define weights (must sum to 1.0)
    const WEIGHTS = {
      payment: 0.4,
      engagement: 0.3,
      contract: 0.2,
      support: 0.1
    };

    // Calculate weighted scores
    const paymentWeighted = paymentScore * WEIGHTS.payment;
    const engagementWeighted = engagementScore * WEIGHTS.engagement;
    const contractWeighted = contractScore * WEIGHTS.contract;
    const supportWeighted = supportScore * WEIGHTS.support;

    // Calculate overall score
    const overallScore = Math.round(
      paymentWeighted + engagementWeighted + contractWeighted + supportWeighted
    );

    // Determine risk level
    let riskLevel: RiskLevel;
    if (overallScore >= 71) {
      riskLevel = 'healthy';
    } else if (overallScore >= 31) {
      riskLevel = 'warning';
    } else {
      riskLevel = 'critical';
    }

    // Build result object
    const result: HealthScoreResult = {
      overallScore,
      riskLevel,
      breakdown: {
        payment: {
          score: paymentScore,
          weight: WEIGHTS.payment,
          weightedScore: paymentWeighted
        },
        engagement: {
          score: engagementScore,
          weight: WEIGHTS.engagement,
          weightedScore: engagementWeighted
        },
        contract: {
          score: contractScore,
          weight: WEIGHTS.contract,
          weightedScore: contractWeighted
        },
        support: {
          score: supportScore,
          weight: WEIGHTS.support,
          weightedScore: supportWeighted
        }
      },
      calculatedAt: new Date(),
      customerId: customerData.customerId
    };

    return result;

  } catch (error) {
    if (error instanceof InvalidInputError) {
      throw error;
    }
    throw new CalculationError(
      `Failed to calculate health score: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
