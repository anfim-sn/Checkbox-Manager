import express, { request, response } from 'express'
import { HTTP_STATUSES } from '../../HTTP_STATUSES.js'
import { prisma } from '../db/prismaClient.js'
import { IUser } from './user.interface'
import { UserRepository } from './user.repository.js'

const userRepository = new UserRepository(prisma)

export const userRouter = express.Router()

userRouter.get('/', async (req: typeof request, res: typeof response) => {
  const users = await userRepository.getAll()
  res.status(HTTP_STATUSES.OK_200).json(users)
})

userRouter.get('/:id', async (req: typeof request, res: typeof response) => {
  const id = Number(req.params.id)
  const user = await userRepository.findById(id)
  if (!user) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }
  res.status(HTTP_STATUSES.OK_200).json(user)
})

userRouter.post('/', async (req: typeof request, res: typeof response) => {
  const name = req.body.name?.trim()
  const user: IUser = { name }
  const newUser = await userRepository.create(user)
  if (typeof newUser === 'string') {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  } else {
    res.status(HTTP_STATUSES.CREATED_201).json(newUser)
  }
})
userRouter.patch('/', async (req: typeof request, res: typeof response) => {
  const request = await userRepository.update(req.body)
  if (typeof request === 'string') {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  } else {
    res.sendStatus(HTTP_STATUSES.OK_200)
  }
})
userRouter.delete('/:id', async (req: typeof request, res: typeof response) => {
  const id = Number(req.params.id)
  const user = await userRepository.delete(id)
  console.log(user)
  if (typeof user === 'string') {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  } else {
    res.status(HTTP_STATUSES.OK_200).json(user)
  }
})
 