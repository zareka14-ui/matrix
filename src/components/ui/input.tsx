export function Input({ className, value, onChange, type = 'text', id, disabled, placeholder, ...props }: {
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  [key: string]: any;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      id={id}
      disabled={disabled}
      placeholder={placeholder}
      className={className || 'border rounded-md px-3 py-2 w-full'}
      {...props}
    />
  );
}
