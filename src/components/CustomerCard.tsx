import { Customer } from '@/data/mock-customers';

export interface CustomerCardProps {
  customer: Customer;
  className?: string;
}

/**
 * Get health score color classes based on score thresholds
 * Red: 0-30 (critical), Yellow: 31-70 (warning), Green: 71-100 (healthy)
 */
function getHealthScoreColors(score: number): {
  text: string;
  bg: string;
  border: string;
} {
  if (score <= 30) {
    return {
      text: 'text-red-600',
      bg: 'bg-red-100',
      border: 'border-red-300',
    };
  } else if (score <= 70) {
    return {
      text: 'text-yellow-600',
      bg: 'bg-yellow-100',
      border: 'border-yellow-300',
    };
  } else {
    return {
      text: 'text-green-600',
      bg: 'bg-green-100',
      border: 'border-green-300',
    };
  }
}

/**
 * CustomerCard Component
 *
 * Displays individual customer information including:
 * - Customer name and company
 * - Color-coded health score (0-100)
 * - Domain information with hover tooltip for multiple domains
 *
 * Responsive design with mobile-first approach
 * Read-only presentation component
 */
export function CustomerCard({ customer, className }: CustomerCardProps) {
  const healthColors = getHealthScoreColors(customer.healthScore);
  const domainCount = customer.domains?.length || 0;

  return (
    <div
      className={`
        relative
        border border-gray-200 rounded-lg
        bg-white
        p-4
        shadow-sm
        min-h-[120px]
        max-w-[400px]
        ${className || ''}
      `}
    >
      {/* Header: Name and Health Score */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {customer.name}
          </h3>
          <p className="text-sm text-gray-600 truncate">
            {customer.company}
          </p>
        </div>

        {/* Health Score Badge */}
        <div
          className={`
            flex-shrink-0
            px-3 py-1
            rounded-full
            border
            font-semibold
            text-sm
            ${healthColors.bg}
            ${healthColors.text}
            ${healthColors.border}
          `}
        >
          {customer.healthScore}
        </div>
      </div>

      {/* Domains Section */}
      {domainCount > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-700">
              Domains ({domainCount})
            </span>
          </div>

          {/* Domain Display */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {domainCount === 1 ? (
              /* Single domain - show as simple tag */
              <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded truncate max-w-full">
                {customer.domains![0]}
              </span>
            ) : (
              /* Multiple domains - show light-blue hover tooltip tag */
              <div className="relative group inline-block">
                <span className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded cursor-default">
                  {customer.domains![0]} +{domainCount - 1} more
                </span>
                {/* Hover tooltip with bulleted list */}
                <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10 min-w-[200px]">
                  <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                    {customer.domains!.map((domain, index) => (
                      <li key={`${domain}-${index}`} className="truncate">
                        {domain}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
