import { Customer } from '@/data/mock-customers';

export interface CustomerCardProps {
  customer: Customer;
  onClick?: (customer: Customer) => void;
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
 * - Customer name, email, and company
 * - Color-coded health score (0-100)
 * - Domain count and list
 *
 * Responsive design with mobile-first approach
 * Clickable with hover states for interaction
 */
export function CustomerCard({ customer, onClick }: CustomerCardProps) {
  const healthColors = getHealthScoreColors(customer.healthScore);
  const domainCount = customer.domains?.length || 0;

  const handleClick = () => {
    if (onClick) {
      onClick(customer);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(customer);
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`
        relative
        border border-gray-200 rounded-lg
        bg-white
        p-4
        shadow-sm
        transition-all duration-200
        min-h-[120px]
        max-w-[400px]
        ${onClick ? 'cursor-pointer hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5' : ''}
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

      {/* Email */}
      {customer.email && (
        <p className="text-sm text-gray-500 truncate mb-3">
          {customer.email}
        </p>
      )}

      {/* Domains Section */}
      {domainCount > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-gray-700">
              Domains ({domainCount})
            </span>
          </div>

          {/* Domain List - Responsive */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {customer.domains?.map((domain, index) => (
              <span
                key={`${domain}-${index}`}
                className="
                  inline-block
                  px-2 py-0.5
                  text-xs
                  bg-gray-100
                  text-gray-700
                  rounded
                  truncate
                  max-w-full
                  sm:max-w-[200px]
                "
                title={domain}
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
