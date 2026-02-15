import { defineField } from 'sanity';

/**
 * Sanity schema for Verification Token.
 * Used for email verification processes.
 */
const verificationToken = {
  name: 'verification-token',
  title: 'Verification Token',
  type: 'document',
  fields: [
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
    }),
    defineField({
      name: 'token',
      title: 'Token',
      type: 'string',
    }),
    defineField({
      name: 'expires',
      title: 'Expires',
      type: 'datetime',
    }),
  ],
};

export default verificationToken;
