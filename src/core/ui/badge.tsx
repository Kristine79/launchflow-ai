import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

const badgeVariants = {
  default: 'border-transparent bg-primary text-primary-foreground shadow-sm',
  secondary: 'border-transparent bg-secondary text-secondary-foreground',
  destructive: 'border-transparent bg-destructive text-destructive-foreground shadow-sm',
  outline: 'text-foreground border',
  success: 'border-transparent bg-success/10 text-success border-success/20',
  warning: 'border-transparent bg-warning/10 text-warning border-warning/20',
  info: 'border-transparent bg-[hsl(var(--ai-card-bg))] text-[hsl(var(--ai-badge))] border-[hsl(var(--ai-card-border))]',
};

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants;
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
