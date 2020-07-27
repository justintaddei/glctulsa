import { sign } from 'jsonwebtoken'
import { IUser } from '../../../models/User'

export const enum TOKEN_TYPE {
  access,
  refresh
}

const TOKEN_EXPIRATION = {
  [TOKEN_TYPE.access]: '15s',
  [TOKEN_TYPE.refresh]: '7d'
}

export function generateToken(user: IUser, secret: string, type: TOKEN_TYPE) {
  return sign(user.toObject(), secret, { expiresIn: TOKEN_EXPIRATION[type] })
}
