import { signUpHandler } from 'next-auth-sanity';

import sanityClient from '@/libs/sanity';

/**
 * Handler for user sign-up in Sanity.
 * Creates a new user document in the Sanity dataset.
 */
export const POST = signUpHandler(sanityClient);
