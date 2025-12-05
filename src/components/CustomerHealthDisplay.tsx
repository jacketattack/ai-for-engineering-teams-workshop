'use client';

/**
 * CustomerHealthDisplay Widget Component
 *
 * Displays comprehensive customer health score with expandable breakdown
 * showing individual factor scores. Provides real-time health monitoring
 * with color-coded risk level indicators.
 */

import { useState, useEffect } from 'react';
import {
  calculateHealthScore,
  type CustomerHealthData,
  type HealthScoreResult,
  type RiskLevel,
  InvalidInputError,
  CalculationError
} from '@/lib/healthCalculator';

export interface CustomerHealthDisplayProps {
  /** Customer health data to calculate and display */
  customerData: CustomerHealthData | null;
  /** Optional loading state override */
  isLoading?: boolean;
  /** Optional error message override */
  error?: string;
  /** Optional callback when score is calculated */
  onScoreCalculated?: (result: HealthScoreResult) => void;
}

/**
 * Get color classes for risk level
 */
function getRiskLevelColors(riskLevel: RiskLevel): {
  bg: string;
  border: string;
  text: string;
  badge: string;
} {
  switch (riskLevel) {
    case 'healthy':
      return {
        bg: 'bg-green-50',
        border: 'border-green-500',
        text: 'text-green-900',
        badge: 'bg-green-500 text-white'
      };
    case 'warning':
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-500',
        text: 'text-yellow-900',
        badge: 'bg-yellow-500 text-white'
      };
    case 'critical':
      return {
        bg: 'bg-red-50',
        border: 'border-red-500',
        text: 'text-red-900',
        badge: 'bg-red-500 text-white'
      };
  }
}

/**
 * Format risk level for display
 */
function formatRiskLevel(riskLevel: RiskLevel): string {
  return riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1);
}

/**
 * CustomerHealthDisplay component displays overall health score and detailed breakdown
 */
export function CustomerHealthDisplay({
  customerData,
  isLoading = false,
  error,
  onScoreCalculated
}: CustomerHealthDisplayProps) {
  const [healthResult, setHealthResult] = useState<HealthScoreResult | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate health score when customer data changes
  useEffect(() => {
    if (!customerData) {
      setHealthResult(null);
      setCalculationError(null);
      return;
    }

    const calculateScore = async () => {
      setIsCalculating(true);
      setCalculationError(null);

      try {
        // Simulate async calculation for smooth transitions
        await new Promise(resolve => setTimeout(resolve, 10));

        const result = calculateHealthScore(customerData);
        setHealthResult(result);

        if (onScoreCalculated) {
          onScoreCalculated(result);
        }
      } catch (err) {
        let errorMessage = 'Failed to calculate health score';

        if (err instanceof InvalidInputError) {
          errorMessage = `Invalid data: ${err.message}`;
        } else if (err instanceof CalculationError) {
          errorMessage = err.message;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        setCalculationError(errorMessage);
        setHealthResult(null);
      } finally {
        setIsCalculating(false);
      }
    };

    calculateScore();
  }, [customerData, onScoreCalculated]);

  // Loading state
  if (isLoading || isCalculating) {
    return (
      <div className="w-full max-h-[400px] border border-gray-300 rounded-lg p-6 bg-white">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-24 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || calculationError) {
    const displayError = error || calculationError;
    return (
      <div className="w-full max-h-[400px] border border-red-300 rounded-lg p-6 bg-red-50">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-red-900">Calculation Error</h3>
        </div>
        <p className="text-red-700 mb-4">{displayError}</p>
        <button
          onClick={() => {
            setCalculationError(null);
            if (customerData) {
              const result = calculateHealthScore(customerData);
              setHealthResult(result);
            }
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (!customerData || !healthResult) {
    return (
      <div className="w-full max-h-[400px] border border-gray-300 rounded-lg p-6 bg-gray-50">
        <div className="flex flex-col items-center justify-center h-48 text-gray-500">
          <svg
            className="w-12 h-12 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <p className="text-center">Select a customer to view health score</p>
        </div>
      </div>
    );
  }

  const colors = getRiskLevelColors(healthResult.riskLevel);

  return (
    <div
      className={`w-full max-h-[400px] border-2 ${colors.border} ${colors.bg} rounded-lg p-4 sm:p-6 transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${colors.text}`}>
          Customer Health Score
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.badge}`}>
          {formatRiskLevel(healthResult.riskLevel)}
        </span>
      </div>

      {/* Overall Score Display */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div className={`text-6xl sm:text-7xl font-bold ${colors.text} mb-2`}>
          {healthResult.overallScore}
        </div>
        <div className="text-gray-600 text-sm">
          out of 100
        </div>
      </div>

      {/* Expandable Breakdown Section */}
      <div className="border-t border-gray-300 pt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-left hover:bg-gray-100 p-2 rounded transition-colors"
        >
          <span className="font-medium text-gray-900">
            View Score Breakdown
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Breakdown Details */}
        {isExpanded && (
          <div className="mt-4 space-y-4 overflow-y-auto max-h-48">
            {/* Payment Score */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded border border-gray-200">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="font-medium text-gray-900">Payment</span>
                <span className="text-sm text-gray-500">
                  (Weight: {Math.round(healthResult.breakdown.payment.weight * 100)}%)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden min-w-[100px]">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${healthResult.breakdown.payment.score}%` }}
                  ></div>
                </div>
                <span className="font-bold text-gray-900 min-w-[3ch] text-right">
                  {healthResult.breakdown.payment.score}
                </span>
              </div>
            </div>

            {/* Engagement Score */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded border border-gray-200">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="font-medium text-gray-900">Engagement</span>
                <span className="text-sm text-gray-500">
                  (Weight: {Math.round(healthResult.breakdown.engagement.weight * 100)}%)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden min-w-[100px]">
                  <div
                    className="h-full bg-purple-500 transition-all duration-500"
                    style={{ width: `${healthResult.breakdown.engagement.score}%` }}
                  ></div>
                </div>
                <span className="font-bold text-gray-900 min-w-[3ch] text-right">
                  {healthResult.breakdown.engagement.score}
                </span>
              </div>
            </div>

            {/* Contract Score */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded border border-gray-200">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="font-medium text-gray-900">Contract</span>
                <span className="text-sm text-gray-500">
                  (Weight: {Math.round(healthResult.breakdown.contract.weight * 100)}%)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden min-w-[100px]">
                  <div
                    className="h-full bg-orange-500 transition-all duration-500"
                    style={{ width: `${healthResult.breakdown.contract.score}%` }}
                  ></div>
                </div>
                <span className="font-bold text-gray-900 min-w-[3ch] text-right">
                  {healthResult.breakdown.contract.score}
                </span>
              </div>
            </div>

            {/* Support Score */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded border border-gray-200">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="font-medium text-gray-900">Support</span>
                <span className="text-sm text-gray-500">
                  (Weight: {Math.round(healthResult.breakdown.support.weight * 100)}%)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden min-w-[100px]">
                  <div
                    className="h-full bg-teal-500 transition-all duration-500"
                    style={{ width: `${healthResult.breakdown.support.score}%` }}
                  ></div>
                </div>
                <span className="font-bold text-gray-900 min-w-[3ch] text-right">
                  {healthResult.breakdown.support.score}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Calculation Timestamp */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Calculated: {healthResult.calculatedAt.toLocaleString()}
      </div>
    </div>
  );
}

export default CustomerHealthDisplay;
