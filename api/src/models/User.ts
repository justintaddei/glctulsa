import { Document, model, Schema } from 'mongoose'

export enum Authority {
  USER = 0,
  ADMIN = 1,
  ROOT = 2
}

export interface ISimpleUser {
  username: string
  password: string
  authority: Authority
}

export interface IUser extends ISimpleUser, Document {}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  authority: {
    type: Number,
    required: true,
    min: Authority.USER,
    max: Authority.ADMIN
  }
})

export default model<IUser>('User', UserSchema)
