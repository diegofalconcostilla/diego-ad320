import { User } from '../models/user.js'

export const getUsers = async (req, res) => {
  const users = await User.find({})
  res.send(users)
}
