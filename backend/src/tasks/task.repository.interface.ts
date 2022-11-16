import {ITask} from './task.interface'
import {Task} from '@prisma/client'

export interface ITaskRepository {
  create: (task: ITask) => Promise<Task>
  findById: (id: number) => Promise<Task | null>
  getAll: () => Promise<Task[] | null>
  update: (id: number, text: string) => Promise<Task | null>
  delete: (id: number) => Promise<Task | null>
  findByUserId: (id: number) => Promise<Task[] | null>
}