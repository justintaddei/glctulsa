import User, { ISimpleUser, IUser } from '../models/User'

type UserID = Pick<IUser, '_id'> | string

class UserController {
  /**
   * Creates and returns a new `User`
   *
   * @param userConfig the user info for the new `User`
   *
   * @throws
   */
  async create(userConfig: ISimpleUser) {
    const user = new User(userConfig)

    const savedUser = await user.save()

    return savedUser
  }

  /**
   * Returns the `User` with id `userId`
   *
   * @param userId The ID of the `User` to get
   *
   * @throws
   */
  async get(userId: UserID) {
    const user = await User.findById(userId)

    return user
  }

  /**
   * Deletes and returns a `User`
   *
   * @param userId The `User` to delete
   */
  async delete(userId: UserID) {
    const deletedUser = await User.remove({ _id: userId })

    return deletedUser
  }

  /**
   * Updates and returns a `User`
   *
   * @param userId The `User` to update
   * @param user The new data for the `User`
   */
  async update(userId: UserID, user: Partial<ISimpleUser>) {
    const updatedUser = await User.updateOne({ _id: userId }, { $set: user })

    return updatedUser
  }

  /**
   * Returns the `User` matching `query`
   *
   * @param query An object containing the mongo query
   *
   * @throws
   */
  async search(query: Partial<IUser>) {
    const user = await User.findOne(query)

    return user
  }

  /**
   * Returns all `User`s in the database
   */
  async getAll() {
    const users = await User.find()

    return users
  }
}

export default UserController
