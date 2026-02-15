import { createClient } from 'next-sanity';

/**
 * Configured Sanity client for fetching and updating data.
 * Uses environment variables for project configuration.
 */
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_STUDIO_TOKEN,
  apiVersion: '2021-10-21',
});

export default sanityClient;

import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
