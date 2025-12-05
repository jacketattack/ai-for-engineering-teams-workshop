import { MouseEvent, KeyboardEvent } from 'react';

// TypeScript interface for Button component props
export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

// Button component with variants, loading state, and accessibility features
export function Button({
  label,
  onClick,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  // Determine if button should be interactive
  const isDisabled = disabled || isLoading;

  // Handle click events - only fire onClick when not disabled or loading
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      onClick();
    }
  };

  // Handle keyboard events for accessibility (Enter and Space)
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  // Base styles shared by all variants
  const baseStyles = `
    relative
    px-4 py-2.5
    min-h-[40px]
    max-w-[200px]
    rounded-md
    font-medium
    text-sm
    transition-all
    duration-200
    ease-in-out
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
  `;

  // Variant-specific styles
  const variantStyles = {
    primary: `
      bg-blue-600
      text-white
      hover:bg-blue-700
      focus:ring-blue-500
      active:bg-blue-800
      disabled:bg-blue-600
      disabled:opacity-50
      disabled:cursor-not-allowed
    `,
    secondary: `
      bg-gray-600
      text-white
      hover:bg-gray-700
      focus:ring-gray-500
      active:bg-gray-800
      disabled:bg-gray-600
      disabled:opacity-50
      disabled:cursor-not-allowed
    `,
    danger: `
      bg-red-600
      text-white
      hover:bg-red-700
      focus:ring-red-500
      active:bg-red-800
      disabled:bg-red-600
      disabled:opacity-50
      disabled:cursor-not-allowed
    `,
  };

  // Loading spinner styles
  const spinnerStyles = `
    inline-block
    w-5
    h-5
    border-2
    border-white
    border-t-transparent
    rounded-full
    animate-spin
  `;

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      aria-label={ariaLabel || label}
      aria-busy={isLoading}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className={spinnerStyles} aria-hidden="true" />
          <span className="opacity-70">{label}</span>
        </span>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}
