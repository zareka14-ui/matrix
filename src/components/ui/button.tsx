export function Button({ children, disabled, className, onClick, size = 'default', variant = 'default' }: {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
}) {
  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
  };

  const variantClasses = {
    default: 'bg-purple-600 hover:bg-purple-700 text-white',
    outline: 'border border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 text-purple-600',
    ghost: 'hover:bg-purple-50 dark:hover:bg-purple-950 text-purple-600',
    destructive: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-md font-medium transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className || ''}
      `}
    >
      {children}
    </button>
  );
}
