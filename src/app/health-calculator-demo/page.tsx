'use client';

/**
 * Health Score Calculator Demo Page
 *
 * Demonstrates the CustomerHealthDisplay widget with a customer selector
 * allowing users to see real-time health score calculations and breakdowns
 */

import { useState } from 'react';
import { CustomerHealthDisplay } from '@/components/CustomerHealthDisplay';
import { mockCustomers } from '@/data/mock-customers';
import { getCustomerHealthData } from '@/data/mock-customer-health';

export default function HealthCalculatorDemoPage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    mockCustomers[0]?.id || null
  );

  const selectedCustomerHealthData = selectedCustomerId
    ? getCustomerHealthData(selectedCustomerId)
    : null;

  const selectedCustomer = mockCustomers.find(c => c.id === selectedCustomerId);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Health Score Calculator Demo
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Real-time customer health scoring with detailed breakdown
        </p>
      </header>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Selector - Left Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 sticky top-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Select Customer
            </h2>
            <div className="space-y-2">
              {mockCustomers.map((customer) => {
                const isSelected = selectedCustomerId === customer.id;
                let healthColorClass = 'bg-gray-100 border-gray-200';
                let healthTextColor = 'text-gray-700';

                if (customer.healthScore >= 71) {
                  healthColorClass = isSelected
                    ? 'bg-green-100 border-green-500 border-2'
                    : 'bg-green-50 border-green-200';
                  healthTextColor = 'text-green-700';
                } else if (customer.healthScore >= 31) {
                  healthColorClass = isSelected
                    ? 'bg-yellow-100 border-yellow-500 border-2'
                    : 'bg-yellow-50 border-yellow-200';
                  healthTextColor = 'text-yellow-700';
                } else {
                  healthColorClass = isSelected
                    ? 'bg-red-100 border-red-500 border-2'
                    : 'bg-red-50 border-red-200';
                  healthTextColor = 'text-red-700';
                }

                return (
                  <button
                    key={customer.id}
                    onClick={() => setSelectedCustomerId(customer.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${healthColorClass} ${
                      isSelected ? 'shadow-md' : 'hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {customer.name}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {customer.company}
                        </p>
                      </div>
                      <div className={`ml-2 font-bold text-lg ${healthTextColor}`}>
                        {customer.healthScore}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Health Score Display - Right Column */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Selected Customer Info */}
            {selectedCustomer && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCustomer.name}
                </h2>
                <p className="text-gray-600 mb-1">{selectedCustomer.company}</p>
                {selectedCustomer.email && (
                  <p className="text-sm text-gray-500 mb-2">{selectedCustomer.email}</p>
                )}
                {selectedCustomer.subscriptionTier && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {selectedCustomer.subscriptionTier.toUpperCase()}
                  </span>
                )}
              </div>
            )}

            {/* Health Score Calculator Widget */}
            <CustomerHealthDisplay
              customerData={selectedCustomerHealthData || null}
            />

            {/* Information Panel */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                About the Health Score Calculator
              </h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p>
                  <strong>Algorithm:</strong> Multi-factor scoring system with weighted averaging
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li><strong>Payment (40%):</strong> Days since payment, delays, overdue amounts</li>
                  <li><strong>Engagement (30%):</strong> Login frequency, feature usage, active users</li>
                  <li><strong>Contract (20%):</strong> Renewal date, value, upgrades, auto-renewal</li>
                  <li><strong>Support (10%):</strong> Resolution time, satisfaction, escalations</li>
                </ul>
                <p className="mt-3">
                  <strong>Risk Levels:</strong>
                </p>
                <ul className="list-none ml-2 space-y-1">
                  <li>🟢 <strong>Healthy (71-100):</strong> Customer relationship is strong</li>
                  <li>🟡 <strong>Warning (31-70):</strong> Monitor closely, may need attention</li>
                  <li>🔴 <strong>Critical (0-30):</strong> Immediate intervention required</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Technical Implementation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-gray-50 rounded">
            <p className="font-medium text-gray-900 mb-1">Calculator Library</p>
            <p className="text-gray-600 font-mono text-xs">
              /src/lib/healthCalculator.ts
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="font-medium text-gray-900 mb-1">UI Widget Component</p>
            <p className="text-gray-600 font-mono text-xs">
              /src/components/CustomerHealthDisplay.tsx
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="font-medium text-gray-900 mb-1">Mock Health Data</p>
            <p className="text-gray-600 font-mono text-xs">
              /src/data/mock-customer-health.ts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
