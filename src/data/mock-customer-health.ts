/**
 * Mock customer health data for testing and demonstration
 * Provides realistic health data for each customer in mockCustomers array
 */

import { CustomerHealthData } from '@/lib/healthCalculator';

/**
 * Mock health data matching the customers from mock-customers.ts
 * Each customer ID corresponds to detailed health metrics
 */
export const mockCustomerHealthData: Record<string, CustomerHealthData> = {
  // Customer 1: John Smith - Acme Corp (Health Score: 85 - Healthy)
  '1': {
    customerId: '1',
    payment: {
      daysSinceLastPayment: 5,
      averagePaymentDelay: 1,
      overdueAmount: 0,
      paymentConsistency: 0.95
    },
    engagement: {
      loginsPerMonth: 48,
      featureUsageCount: 16,
      supportTicketsOpened: 2,
      activeUserCount: 12
    },
    contract: {
      daysUntilRenewal: 240,
      contractValue: 75000,
      hasRecentUpgrades: true,
      autoRenewalEnabled: true
    },
    support: {
      averageResolutionTimeHours: 6,
      satisfactionScore: 4.8,
      escalationCount: 0,
      openTicketCount: 1
    }
  },

  // Customer 2: Sarah Johnson - TechStart Inc (Health Score: 45 - Warning)
  '2': {
    customerId: '2',
    payment: {
      daysSinceLastPayment: 28,
      averagePaymentDelay: 12,
      overdueAmount: 2500,
      paymentConsistency: 0.65
    },
    engagement: {
      loginsPerMonth: 18,
      featureUsageCount: 6,
      supportTicketsOpened: 8,
      activeUserCount: 3
    },
    contract: {
      daysUntilRenewal: 45,
      contractValue: 15000,
      hasRecentUpgrades: false,
      autoRenewalEnabled: false
    },
    support: {
      averageResolutionTimeHours: 36,
      satisfactionScore: 3.2,
      escalationCount: 2,
      openTicketCount: 4
    }
  },

  // Customer 3: Michael Brown - Global Solutions (Health Score: 15 - Critical)
  '3': {
    customerId: '3',
    payment: {
      daysSinceLastPayment: 55,
      averagePaymentDelay: 28,
      overdueAmount: 8500,
      paymentConsistency: 0.35
    },
    engagement: {
      loginsPerMonth: 4,
      featureUsageCount: 2,
      supportTicketsOpened: 18,
      activeUserCount: 1
    },
    contract: {
      daysUntilRenewal: 15,
      contractValue: 12000,
      hasRecentUpgrades: false,
      autoRenewalEnabled: false
    },
    support: {
      averageResolutionTimeHours: 68,
      satisfactionScore: 1.8,
      escalationCount: 7,
      openTicketCount: 12
    }
  },

  // Customer 4: Emily Davis - Innovation Labs (Health Score: 92 - Healthy)
  '4': {
    customerId: '4',
    payment: {
      daysSinceLastPayment: 2,
      averagePaymentDelay: 0,
      overdueAmount: 0,
      paymentConsistency: 1.0
    },
    engagement: {
      loginsPerMonth: 58,
      featureUsageCount: 19,
      supportTicketsOpened: 1,
      activeUserCount: 25
    },
    contract: {
      daysUntilRenewal: 320,
      contractValue: 150000,
      hasRecentUpgrades: true,
      autoRenewalEnabled: true
    },
    support: {
      averageResolutionTimeHours: 3,
      satisfactionScore: 5.0,
      escalationCount: 0,
      openTicketCount: 0
    }
  },

  // Customer 5: David Wilson - Future Systems (Health Score: 60 - Warning)
  '5': {
    customerId: '5',
    payment: {
      daysSinceLastPayment: 18,
      averagePaymentDelay: 8,
      overdueAmount: 1200,
      paymentConsistency: 0.75
    },
    engagement: {
      loginsPerMonth: 28,
      featureUsageCount: 10,
      supportTicketsOpened: 5,
      activeUserCount: 6
    },
    contract: {
      daysUntilRenewal: 120,
      contractValue: 45000,
      hasRecentUpgrades: false,
      autoRenewalEnabled: true
    },
    support: {
      averageResolutionTimeHours: 24,
      satisfactionScore: 3.8,
      escalationCount: 1,
      openTicketCount: 3
    }
  },

  // Customer 6: Lisa Anderson - Smart Ventures (Health Score: 73 - Healthy)
  '6': {
    customerId: '6',
    payment: {
      daysSinceLastPayment: 10,
      averagePaymentDelay: 3,
      overdueAmount: 0,
      paymentConsistency: 0.88
    },
    engagement: {
      loginsPerMonth: 35,
      featureUsageCount: 13,
      supportTicketsOpened: 3,
      activeUserCount: 8
    },
    contract: {
      daysUntilRenewal: 200,
      contractValue: 55000,
      hasRecentUpgrades: true,
      autoRenewalEnabled: true
    },
    support: {
      averageResolutionTimeHours: 12,
      satisfactionScore: 4.3,
      escalationCount: 0,
      openTicketCount: 2
    }
  },

  // Customer 7: Robert Chen - DataFlow Analytics (Health Score: 88 - Healthy)
  '7': {
    customerId: '7',
    payment: {
      daysSinceLastPayment: 7,
      averagePaymentDelay: 2,
      overdueAmount: 0,
      paymentConsistency: 0.92
    },
    engagement: {
      loginsPerMonth: 52,
      featureUsageCount: 18,
      supportTicketsOpened: 2,
      activeUserCount: 18
    },
    contract: {
      daysUntilRenewal: 280,
      contractValue: 120000,
      hasRecentUpgrades: true,
      autoRenewalEnabled: true
    },
    support: {
      averageResolutionTimeHours: 8,
      satisfactionScore: 4.7,
      escalationCount: 0,
      openTicketCount: 1
    }
  },

  // Customer 8: Maria Rodriguez - CloudFirst Solutions (Health Score: 35 - Warning)
  '8': {
    customerId: '8',
    payment: {
      daysSinceLastPayment: 35,
      averagePaymentDelay: 18,
      overdueAmount: 4200,
      paymentConsistency: 0.55
    },
    engagement: {
      loginsPerMonth: 12,
      featureUsageCount: 4,
      supportTicketsOpened: 12,
      activeUserCount: 2
    },
    contract: {
      daysUntilRenewal: 60,
      contractValue: 18000,
      hasRecentUpgrades: false,
      autoRenewalEnabled: false
    },
    support: {
      averageResolutionTimeHours: 48,
      satisfactionScore: 2.9,
      escalationCount: 4,
      openTicketCount: 6
    }
  }
};

/**
 * Get health data for a specific customer
 * @param customerId - The customer ID to retrieve health data for
 * @returns Customer health data or undefined if not found
 */
export function getCustomerHealthData(customerId: string): CustomerHealthData | undefined {
  return mockCustomerHealthData[customerId];
}

/**
 * Get all customer health data as an array
 * @returns Array of all customer health data objects
 */
export function getAllCustomerHealthData(): CustomerHealthData[] {
  return Object.values(mockCustomerHealthData);
}
