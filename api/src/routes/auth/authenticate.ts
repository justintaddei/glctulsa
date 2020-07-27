import { NextFunction, Request, Response } from 'express'
import { FORBIDDEN, UNAUTHORIZED } from 'http-status'
import { verify } from 'jsonwebtoken'
import { Authority, IUser } from '../../models/User'
import hasAuthority from './utils/has-authority'

export default function authenticate(minimumAuthority: Authority) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'] // Authorization: Bearer [token]
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(UNAUTHORIZED)

    verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, data) => {
      if (err || !data) return res.sendStatus(FORBIDDEN)

      const user = data as IUser

      if (!hasAuthority(user, minimumAuthority))
        return res.sendStatus(UNAUTHORIZED)

      req.user = user

      next()
    })
  }
}
