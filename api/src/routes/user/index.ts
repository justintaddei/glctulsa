import { Router } from 'express'
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK
} from 'http-status'
import { userController } from '../../controllers'
import { Authority, ISimpleUser } from '../../models/User'
import { ERROR } from '../../types'
import authenticate from '../auth/authenticate'
import hashPassword from '../auth/utils/hash-password'
import hasAuthority from '../auth/utils/has-authority'

const router = Router()

// Get current User
router.get('/', authenticate(Authority.USER), async (req, res) => {
  try {
    const user = await userController.get(req.user._id)

    if (!user)
      return res.status(NOT_FOUND).json({ error: ERROR.USER_NOT_FOUND })

    res.status(OK).json(user)
  } catch (error) {
    res.status(BAD_REQUEST).json({ error })
  }
})

// Get specific User
router.get('/:id', authenticate(Authority.ADMIN), async (req, res) => {
  try {
    const user = await userController.get(req.params.id)

    if (!user)
      return res.status(NOT_FOUND).json({ error: ERROR.USER_NOT_FOUND })

    res.status(OK).json(user)
  } catch (error) {
    res.status(BAD_REQUEST).json({ error })
  }
})

// Get all Users
router.get('/all', authenticate(Authority.ADMIN), async (_req, res) => {
  const users = await userController.getAll()

  res.status(OK).json(users)
})

// Create new User
router.post('/', authenticate(Authority.ADMIN), async (req, res) => {
  try {
    console.log('req.body :>> ', req.body)

    const username = req.body.username
    const password = await hashPassword(req.body.password)

    const user: ISimpleUser = {
      username,
      password,
      authority: req.body.admin ? 1 : 0
    }

    try {
      const newUser = await userController.create(user)

      res.status(CREATED).json(newUser)
    } catch (error) {
      res.status(BAD_REQUEST).json({ error })
    }
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ error })
  }
})

// Update current User
router.patch('/', authenticate(Authority.USER), async ({ user, body }, res) => {
  const updateQuery: Partial<ISimpleUser> = {
    username: body.username,
    password: body.password
  }

  if (hasAuthority(user, Authority.ADMIN) && body.authority)
    updateQuery.authority = body.authority

  try {
    const newUser = await userController.update(user._id, updateQuery)

    res.status(OK).json(newUser)
  } catch (error) {
    res.status(BAD_REQUEST).json({ error })
  }
})

// Update specific User
router.patch(
  '/:id',
  authenticate(Authority.ADMIN),
  async ({ params, body }, res) => {
    const updateQuery: Partial<ISimpleUser> = {
      username: body.username,
      password: body.password,
      authority: body.authority
    }

    try {
      const newUser = await userController.update(params.id, updateQuery)

      res.status(OK).json(newUser)
    } catch (error) {
      res.status(BAD_REQUEST).json({ error })
    }
  }
)

// Delete User
router.delete(
  '/:id',
  authenticate(Authority.ADMIN),
  async ({ params }, res) => {
    try {
      const deletedUser = await userController.delete(params.id)

      res.status(OK).json(deletedUser)
    } catch (error) {
      res.status(BAD_REQUEST).json({ error })
    }
  }
)

export default router
