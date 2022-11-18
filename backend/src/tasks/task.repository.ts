import {PrismaClient, Task} from '@prisma/client'
import {ITaskRepository} from './task.repository.interface'
import {ITask} from './task.interface'

export class TaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaClient) {}

  async getAll(): Promise<Task[] | string> {
    try {
      return this.prisma.task.findMany()
    } catch (e) {
      return e as string
    }
  }

  async findById(id: number): Promise<Task | string> {
    try {
      return this.prisma.task.findFirst({
        where: {id}
      })
    } catch (e) {
      return e as string
    }
  }

  async findByUserId(userId: number): Promise<Task[] | string> {
    try {
      return this.prisma.task.findMany({
        where: {userId}
      })
    } catch (e) {
      return e as string
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

  async update(id: number, text: string): Promise<Task | string> {
    try {
      return this.prisma.task.update({
        where: {
          id
        }, data: {
          text
        }
      })

    } catch (e) {
      return e as string
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
      return e as string
    }
  }

  async checked(id: number): Promise<Task | string> {
    try {
      return this.prisma.task.update({
        where: {
          id,
        }, data: {
          isDone: true
        }
      })
    } catch (error) {
      return error
    }
  }

  async unchecked(id: number): Promise<Task | string> {
    try {
      return this.prisma.task.update({
        where: {
          id,
        }, data: {
          isDone: false
        }
      })
    } catch (error) {
      return error
    }
  }
}