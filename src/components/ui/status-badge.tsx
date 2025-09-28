import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'normal' | 'warning' | 'critical';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'normal':
        return {
          label: 'Normal',
          className: 'bg-success text-success-foreground'
        };
      case 'warning':
        return {
          label: 'Warning',
          className: 'bg-warning text-warning-foreground'
        };
      case 'critical':
        return {
          label: 'Critical',
          className: 'bg-critical text-critical-foreground'
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-muted text-muted-foreground'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
}