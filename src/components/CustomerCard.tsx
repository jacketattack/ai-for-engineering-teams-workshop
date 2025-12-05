import { Customer } from '@/data/mock-customers';

export interface CustomerCardProps {
  customer: Customer;
  className?: string;
}

export function CustomerCard({ customer, className = '' }: CustomerCardProps) {
  const { name, company, healthScore, domains } = customer;

  // Determine health status color based on score thresholds
  const getHealthColorClasses = (score: number): string => {
    if (score >= 0 && score <= 30) {
      return 'bg-red-100 text-red-800 border-red-300';
    } else if (score >= 31 && score <= 70) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    } else {
      return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const healthColorClasses = getHealthColorClasses(healthScore);
  const hasDomains = domains && domains.length > 0;
  const hasMultipleDomains = domains && domains.length > 1;

  return (
    <div
      className={`border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white ${className}`}
    >
      {/* Header with name and health score */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {name}
          </h3>
          <p className="text-sm text-gray-600 truncate">
            {company}
          </p>
        </div>

        {/* Health score indicator */}
        <div
          className={`flex-shrink-0 px-3 py-1 rounded-full border font-semibold text-sm ${healthColorClasses}`}
        >
          {healthScore}
        </div>
      </div>

      {/* Domain information */}
      {hasDomains && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          {hasMultipleDomains ? (
            <div className="relative group inline-block">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 cursor-default">
                {domains.length} domains
              </span>
              {/* Tooltip with domain list */}
              <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <ul className="space-y-1 text-sm text-gray-700">
                  {domains.map((domain, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span className="break-all">{domain}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-700 truncate">
              {domains[0]}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
