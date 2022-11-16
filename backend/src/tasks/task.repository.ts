import {PrismaClient, Task} from '@prisma/client'
import {ITaskRepository} from './task.repository.interface'
import {ITask} from './task.interface'

export class TaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaClient) {}

  async getAll(): Promise<Task[] | null> {
    return this.prisma.task.findMany()
  }

  async findById(id: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {id}
    })
  }

  async findByUserId(userId: number): Promise<Task[] | null> {
    return this.prisma.task.findMany({
      where: {userId}
    })
  }

  async create({text, userId}: Omit<ITask, 'isDone'>): Promise<Task> {
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
  }

  async update(id: number, text: string): Promise<Task | null> {
    return this.prisma.task.update({
      where: {
        id
      }, data: {
        text
      }
    })
  }

  async delete(id: number): Promise<Task | null> {
    return this.prisma.task.delete({
      where: {
        id
      }
    })
  }
}