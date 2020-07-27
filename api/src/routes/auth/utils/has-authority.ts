import { ISimpleUser, Authority } from '../../../models/User'

export default function hasAuthority(user: ISimpleUser, authority: Authority) {
  return user.authority >= authority
}
