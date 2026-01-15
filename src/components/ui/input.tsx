export function Input({ className, value, onChange }: {
  className?: string;
  value?: string;
  onChange?: (e: any) => void;
}) {
  return (
    <input 
      type="text" 
      value={value} 
      onChange={onChange} 
      className={className || 'border rounded-md px-3'} 
    />
  );
}
