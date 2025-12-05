import { CustomerCard } from '@/components/CustomerCard';
import { mockCustomers } from '@/data/mock-customers';

export default function CustomerHealthPage() {
  // Filter customers by health score ranges
  const atRiskCustomers = mockCustomers.filter(
    (customer) => customer.healthScore >= 0 && customer.healthScore <= 30
  );

  const needsAttentionCustomers = mockCustomers.filter(
    (customer) => customer.healthScore >= 31 && customer.healthScore <= 70
  );

  const healthyCustomers = mockCustomers.filter(
    (customer) => customer.healthScore >= 71 && customer.healthScore <= 100
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Customer Health Dashboard</h1>

      {/* At-Risk Customers (Red: 0-30) */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <h2 className="text-2xl font-semibold text-red-700">
            At-Risk Customers
            <span className="ml-2 text-base font-normal text-gray-600">
              ({atRiskCustomers.length})
            </span>
          </h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Health Score: 0-30 - These customers require immediate attention
        </p>
        {atRiskCustomers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {atRiskCustomers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg">
            No at-risk customers at this time
          </p>
        )}
      </section>

      {/* Needs Attention Customers (Yellow: 31-70) */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
          <h2 className="text-2xl font-semibold text-yellow-700">
            Needs Attention
            <span className="ml-2 text-base font-normal text-gray-600">
              ({needsAttentionCustomers.length})
            </span>
          </h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Health Score: 31-70 - Monitor these customers closely
        </p>
        {needsAttentionCustomers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {needsAttentionCustomers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg">
            No customers needing attention at this time
          </p>
        )}
      </section>

      {/* Healthy Customers (Green: 71-100) */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <h2 className="text-2xl font-semibold text-green-700">
            Healthy Customers
            <span className="ml-2 text-base font-normal text-gray-600">
              ({healthyCustomers.length})
            </span>
          </h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Health Score: 71-100 - These customers are doing well
        </p>
        {healthyCustomers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthyCustomers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg">
            No healthy customers at this time
          </p>
        )}
      </section>
    </div>
  );
}
