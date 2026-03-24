import { NextAuthOptions } from 'next-auth';
import { SanityAdapter, SanityCredentials } from 'next-auth-sanity';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import sanityClient from './sanity';

/**
 * NextAuth configuration options.
 * Configures providers (Github, Google, Sanity), session strategy, and callbacks.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    SanityCredentials(sanityClient),
  ],
  session: {
    strategy: 'jwt',
  },
  adapter: SanityAdapter(sanityClient),
  //debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          isAdmin: token.isAdmin as boolean,
        },
      };
    },
    jwt: async ({ token, user }) => {
      if (user) {
        // This only runs on sign in
        const userEmail = user.email;
        const userIdObj = await sanityClient.fetch<{ _id: string; isAdmin: boolean }>(
          `*[_type == "user" && email == $email][0] {
              _id,
              isAdmin
          }`,
          { email: userEmail }
        );
        const rawId = userIdObj?._id ?? '';
        token.id = rawId.startsWith('drafts.') ? rawId.replace('drafts.', '') : rawId;
        token.isAdmin = userIdObj?.isAdmin ?? false;
      }
      return token;
    },
  },
};
