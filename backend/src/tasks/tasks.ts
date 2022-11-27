import { ITask } from './task.interface'

import express, { request, response } from 'express'
import { HTTP_STATUSES } from '../../HTTP_STATUSES.js'
import { TaskRepository } from './task.repository.js'
import { prisma } from '../db/prismaClient.js'

const taskRepository = new TaskRepository(prisma)

type RequestType = typeof request
type ResponseType = typeof response

export const taskRouter = express.Router()

taskRouter.get('/', async (req: typeof request, res: typeof response) => {
  if (req.query?.userId) {
    const userId = Number(req.query['userId'])
    const tasks = await taskRepository.findByUserId(userId)
    if (typeof tasks === 'string') {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    } else {
      res.status(HTTP_STATUSES.OK_200).json(tasks)
    }
    return
  }
  const tasks = await taskRepository.getAll()
  res.status(HTTP_STATUSES.OK_200).json(tasks)
})

taskRouter.get('/:id', async (req: RequestType, res: ResponseType) => {
  const id = Number(req.params.id)
  const task = await taskRepository.findById(id)
  if (!task) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
  }
  res.status(HTTP_STATUSES.OK_200).json(task)
})

taskRouter.post('/', async (req: RequestType, res: ResponseType) => {
  const userId = Number(req.body.userId)
  const text = req.body.text?.trim()
  const description = req.body.description?.trim()
  const task: Omit<ITask, 'isDone'> = { text, description, userId }
  const newTask = await taskRepository.create(task)
  if (typeof newTask === 'string') {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  } else {
    res.status(HTTP_STATUSES.CREATED_201).json(newTask)
  }
})
taskRouter.patch('/', async (req: RequestType, res: ResponseType) => {
  const request = await taskRepository.update(req.body)
  if (typeof request === 'string') {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  } else {
    res.sendStatus(HTTP_STATUSES.OK_200)
  }
})
taskRouter.delete('/:id', async (req: RequestType, res: ResponseType) => {
  const id = Number(req.params.id)
  const task = await taskRepository.delete(id)
  if (typeof task === 'string') {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  } else {
    res.status(HTTP_STATUSES.OK_200).json(task)
  }
})
