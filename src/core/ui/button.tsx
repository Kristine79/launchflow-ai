import * as React from 'react';
import { cn } from '@/lib/utils';

const variantStyles = {
  default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
  outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
};

const sizeStyles = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-10 rounded-md px-8',
  icon: 'h-9 w-9',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  asChild?: boolean;
}

function Button({ className, variant = 'default', size = 'default', asChild, children, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (asChild && React.Children.count(children) === 1) {
    const child = React.Children.only(children) as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  return <button className={classes} {...props}>{children}</button>;
}

export { Button };
