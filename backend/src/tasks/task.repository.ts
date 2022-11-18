import {PrismaClient, Task} from '@prisma/client'
import {ITaskRepository} from './task.repository.interface'
import {ITask} from './task.interface'

export class TaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaClient) {}

  async getAll(): Promise<Task[]> {
    try {
      return this.prisma.task.findMany()
    } catch (e) {
      throw new Error(e)
    }
  }

  async findById(id: number): Promise<Task | string> {
    try {
      return this.prisma.task.findFirst({
        where: {id}
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async findByUserId(userId: number): Promise<Task[] | string> {
    try {
      return this.prisma.task.findMany({
        where: {userId}
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async create({text, userId}: Omit<ITask, 'isDone'>): Promise<Task | string> {
    try {
      return this.prisma.task.create({
        data: {
          text,
          isDone: false,
          user: {
            connect: {
              id: userId
            }
          }
        }
      })
    } catch (e) {
      return e as string
    }
  }

  async update(fields: Partial<ITask>): Promise<Task | string> {
    const {id, text, isDone} = fields
    try {
      return this.prisma.task.update({
        where: {id}, data: {
          text,
          isDone,
        }
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async delete(id: number): Promise<Task | string> {
    try {
      return this.prisma.task.delete({
        where: {
          id
        }
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}