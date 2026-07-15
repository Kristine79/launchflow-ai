import { ClerkProvider as ClerkReactProvider } from '@clerk/clerk-react';
import { type ReactNode } from 'react';

export function ClerkProvider({ children }: { children: ReactNode }) {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    return <>{children}</>;
  }

  return (
    <ClerkReactProvider publishableKey={PUBLISHABLE_KEY}>
      {children}
    </ClerkReactProvider>
  );
}
