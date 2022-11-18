import {ITask} from './task.interface'
import {Task} from '@prisma/client'

export interface ITaskRepository {
  create: (task: ITask) => Promise<Task | string>
  findById: (id: number) => Promise<Task | string>
  getAll: () => Promise<Task[] | string>
  update: (id: number, text: string) => Promise<Task | string>
  delete: (id: number) => Promise<Task | string>
  findByUserId: (id: number) => Promise<Task[] | string>
  checked: (id: number) => Promise<Task | string>
  unchecked: (id: number) => Promise<Task | string>
}