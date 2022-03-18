import { Router } from 'express'
import { User } from '../models/user.js'

const usersRouter = Router()

function sanitizeUsers(users) {
  const sanitizedUsers = users.map((user) => ({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    decks: user.decks,
    active: user.active
  }))
  return sanitizedUsers
}

const getUsers = async (req, res) => {
  const { userId } = req.user
  const requestor = await User.findById(userId)
  if (requestor.role === 'admin' || requestor.role === 'superuser') {
    const users = await User.find({})
    res.send(sanitizeUsers(users))
  } else {
    res.sendStatus(403)
  }
}

const getUsersById = async (req, res) => {
  const { userId } = req.user
  const requestor = await User.findById(userId)
  console.log(`[getUsersById] found requestor ${requestor} for userId ${userId} from param ${req.params.id}`)
  if (requestor.role === 'admin' || requestor.role === 'superuser' || requestor._id.toString() === req.params.id.toString()) {
    const user = await User.findById(req.params.id)
    const arr = sanitizeUsers([user])
    res.send(arr[0])
  } else {
    res.sendStatus(403)
  }
}

const updateUser = async (req, res) => {
  const { userId } = req.user
  const requestor = await User.findById(userId)
  if (requestor.role === 'admin') {
    const user = await User.findByIdAndUpdate(req.params.id, req.body)
    const arr = sanitizeUsers([user])
    res.send(arr[0])
  } else if (requestor.role === 'superuser' || requestor._id.toString() === req.params.id.toString()) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body)
    const arr = sanitizeUsers([user])
    res.send(arr[0])
  } else {
    res.status(403).send('Forbidden')
  }
}

const deleteUser = async (req, res) => {
  const { userId } = req.user
  const requestor = await User.findById(userId)
  const user = await User.findById(req.params.id)
  if (requestor.role === 'admin') {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    const arr = sanitizeUsers([deletedUser])
    res.send(arr[0])
  } else if (requestor.role === 'superuser' && user === userId) {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    const arr = sanitizeUsers([deletedUser])
    res.send(arr[0])
  } else if (requestor.role === 'user' && req.params.id === userId) {
    const deactivatedUser = await User.findByIdAndUpdate(req.params.id, { active: false })
    const arr = sanitizeUsers([deactivatedUser])
    res.send(arr[0])
  } else {
    res.status(403).send('Forbidden')
  }
}

usersRouter.get('/', getUsers)
usersRouter.get('/:id', getUsersById)
usersRouter.put('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)

export default usersRouter
