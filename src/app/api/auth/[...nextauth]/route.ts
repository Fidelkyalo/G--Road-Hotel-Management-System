import NextAuth from 'next-auth';

import { authOptions } from '@/libs/auth';

/**
 * NextAuth handler for authentication.
 * Manages GET and POST requests for authentication routes.
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
