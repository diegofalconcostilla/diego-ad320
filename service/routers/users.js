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
  if (requestor.role[0] === 'admin' || requestor.role[0] === 'superuser') {
    const users = await User.find({})
    res.status(201).send(sanitizeUsers(users))
  } else {
    res.status(403).send('Forbidden')
  }
}

const getUsersById = async (req, res) => {
  const { userId } = req.user
  const requestor = await User.findById(userId)
  if (requestor.role[0] === 'admin' || requestor.role[0] === 'superuser') {
    const result = await User.findById(req.params.id)
    res.status(201).send(result)
  } else {
    res.status(403).send('Forbidden')
  }
}

const updateUser = async (req, res) => {
  const { userId } = req.user
  const requestor = await User.findById(userId)
  if (requestor.role[0] === 'admin') {
    const result = await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(201).send(`User updated ${result}`)
  } else if (req.params.id === userId && requestor.role[0] === 'superuser') {
    const result = await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(201).send(`User updated ${result}`)
  } else {
    res.status(403).send('Forbidden')
  }
}

const deleteUser = async (req, res) => {
  const { userId } = req.user
  const requestor = await User.findById(userId)
  const user = await User.findById(req.params.id)
  if (requestor.role[0] === 'admin') {
    const result = await User.findByIdAndDelete(req.params.id)
    res.status(201).send(`User deleted ${result}`)
  } else if (requestor.role[0] === 'superuser' && user === userId) {
    const result = await User.findByIdAndDelete(req.params.id)
    res.status(201).send(`User deleted ${result}`)
  } else if (requestor.role[0] === 'user' && req.params.id === userId) {
    const result = await User.findByIdAndUpdate(req.params.id, { active: false })
    res.status(201).send(`User deactivated ${result}`)
  } else {
    res.status(403).send('Forbidden')
  }
}

usersRouter.get('/', getUsers)
usersRouter.get('/:id', getUsersById)
usersRouter.put('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)

export default usersRouter
