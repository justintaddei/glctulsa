import { compare } from 'bcrypt'
import { Router } from 'express'
import {
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  OK,
  UNAUTHORIZED
} from 'http-status'
import { verify } from 'jsonwebtoken'
import { ERROR } from '../../types'
import { generateToken, TOKEN_TYPE } from './utils/generate-access-token'
import { IUser, ISimpleUser } from '../../models/User'
import { userController } from '../../controllers'

const router = Router()

router.post('/login', async (req, res) => {
  debugger

  const user = await userController.search({ username: req.body.username })

  if (user == null)
    return res.status(BAD_REQUEST).json({
      error: ERROR.USER_NOT_FOUND
    })

  try {
    if (await compare(req.body.password, user.password)) {
      const accessToken = generateToken(
        user,
        process.env.ACCESS_TOKEN_SECRET!,
        TOKEN_TYPE.access
      )
      const refreshToken = generateToken(
        user,
        process.env.REFRESH_TOKEN_SECRET!,
        TOKEN_TYPE.refresh
      )

      res.status(OK).json({ accessToken, refreshToken })
    } else {
      res.status(UNAUTHORIZED).json({
        error: 'INVALID_CREDENTIALS'
      })
    }
  } catch (err) {
    console.log('err :>> ', err)
    res.status(INTERNAL_SERVER_ERROR).json({
      error: ERROR.UNKNOWN_ERROR
    })
  }
})

router.post('/refresh-token', (req, res) => {
  const refreshToken: string = req.body.refreshToken

  if (refreshToken == null) return res.sendStatus(UNAUTHORIZED)

  verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err, data) => {
    if (err || !data) return res.sendStatus(FORBIDDEN)

    const user = await userController.search({
      username: (data as ISimpleUser).username
    })

    if (user == null)
      return res.status(BAD_REQUEST).json({ error: ERROR.USER_NOT_FOUND })

    const accessToken = generateToken(
      user,
      process.env.ACCESS_TOKEN_SECRET!,
      TOKEN_TYPE.access
    )
    const refreshToken = generateToken(
      user,
      process.env.REFRESH_TOKEN_SECRET!,
      TOKEN_TYPE.refresh
    )

    res.json({ accessToken, refreshToken })
  })
})

router.delete('/logout', (_req, res) => {
  res.sendStatus(NO_CONTENT)
})

export default router
