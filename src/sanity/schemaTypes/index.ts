import { type SchemaTypeDefinition } from 'sanity'

import account from './account'
import booking from './booking'
import hotelRoom from './hotelRoom'
import review from './review'
import user from './user'
import verificationToken from './verificationToken'

export const schemaTypes: SchemaTypeDefinition[] = [
  account,
  booking,
  hotelRoom,
  review,
  user,
  verificationToken,
]
