'use client';

import { SessionProvider } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

/**
 * NextAuth Session Provider wrapper.
 * Wraps the application to provide session state to all components.
 */
export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
