import {ITask} from './task.interface'
import {Task} from '@prisma/client'

export interface ITaskRepository {
  create: (task: ITask) => Promise<Task | string>
  findById: (id: number) => Promise<Task | string>
  getAll: () => Promise<Task[] | string>
  update: (fields: Partial<ITask>) => Promise<Task | string>
  delete: (id: number) => Promise<Task | string>
  findByUserId: (id: number) => Promise<Task[] | string>
}