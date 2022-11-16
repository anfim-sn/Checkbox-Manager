import {ITask} from './task.interface'

import express, {request, response} from 'express'
import {HTTP_STATUSES} from '../../HTTP_STATUSES.js'
import {TaskRepository} from './task.repository.js'
import {prisma} from '../db/prismaClient.js'

const taskRepository = new TaskRepository(prisma)

type RequestType = typeof request;
type ResponseType = typeof response;

export const taskRouter = express.Router()

taskRouter.get('/', async (req: typeof request, res: typeof response) => {
  if (req.query?.userId) {
    const userId = Number(req.query['userId'])
    const tasks = await taskRepository.findByUserId(userId)
    res.status(HTTP_STATUSES.OK_200).json(tasks)
    return
  }
  const tasks = await taskRepository.getAll()
  res.status(HTTP_STATUSES.OK_200).json(tasks)
})

taskRouter.get('/:id', async (req: RequestType, res: ResponseType) => {
  const id = Number(req.params.id)
  const task = await taskRepository.findById(id)
  res.status(HTTP_STATUSES.OK_200).send(task)
})

taskRouter.post('/', async (req: RequestType, res: ResponseType) => {
  const userId = Number(req.body.userId)
  const text = req.body.text.trim()
  const task: Omit<ITask, 'isDone'> = {text, userId}
  const newTask = await taskRepository.create(task)
  res.status(HTTP_STATUSES.CREATED_201).json(newTask)
})
taskRouter.put('/:id', async (req: RequestType, res: ResponseType) => {
  const id = Number(req.params.id)
  const text = req.body.text.trim()
  const task = await taskRepository.update(id, text)
  res.status(HTTP_STATUSES.OK_200).json(task)
})
taskRouter.delete('/:id', async (req: RequestType, res: ResponseType) => {
  const id = Number(req.params.id)
  const task = await taskRepository.delete(id)
  res.status(HTTP_STATUSES.NO_CONTENT_204).json(task)
})