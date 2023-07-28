import CryptoJS from 'crypto-js'
import encBase64 from 'crypto-js/enc-base64'
import JWT from 'jsonwebtoken'
import uid2 from 'uid2'
import type { user_entity } from '@prisma/client'
import { SubscriptionEnum } from '~~/types'
import type { JWTTokenPayload } from '~~/types/entities/User'

/**
 * create hash password
 * @param salt string
 * @param password string recieved by front
 * @returns hash saved in DB
 */
export const generateHash = (salt: string, password: string) => {
  const hash = CryptoJS.SHA256(password + salt).toString(encBase64)
  return hash
}

function getUserfullName(user: Pick<user_entity, 'firstName' | 'lastName'>) {
  let str = ''
  if (user?.firstName)
    str += user.firstName
  if (user?.lastName)
    str += ` ${user.lastName}`
  return str
}

export function createJwtToken(user: JWTTokenPayload) {
  if (process.env.JWT_SECRET) {
    return JWT.sign(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: getUserfullName(user),
        roles: [user.roles],
        subscription: user.subscription ?? SubscriptionEnum.BASIC,
        uniJWT: uid2(128),
      },
      process.env.JWT_SECRET,
    )
  }
}
