export function Button({ children, disabled, className, onClick }: { 
  children: React.ReactNode; 
  disabled?: boolean; 
  className?: string; 
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md text-white ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className || 'bg-purple-600'}`}
    >
      {children}
    </button>
  );
}
