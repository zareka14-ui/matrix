export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className || 'block text-sm font-medium'}>{children}</label>;
}
