import { PrismaClient, Task } from '@prisma/client';
import { ITaskRepository } from './task.repository.interface';
import { ITask } from './task.interface';

export class TaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaClient) {}

  async getAll(): Promise<Task[]> {
    try {
      return this.prisma.task.findMany();
    } catch (e) {
      throw e;
    }
  }

  async findById(id: number): Promise<Task | null> {
    try {
      return this.prisma.task.findFirst({
        where: { id }
      });
    } catch (e) {
      throw e;
    }
  }

  async findByUserId(userId: number): Promise<Task[] | string> {
    try {
      const user = await this.prisma.user.findFirst({ where: { id: userId } });
      return user
        ? this.prisma.task.findMany({
            where: { userId }
          })
        : 'User not found';
    } catch (e) {
      throw e;
    }
  }

  async create({ text, userId }: Omit<ITask, 'isDone'>): Promise<Task | string> {
    try {
      const user = await this.prisma.user.findFirst({ where: { id: userId } });
      return user
        ? this.prisma.task.create({
            data: {
              text,
              isDone: false,
              user: { connect: { id: userId } }
            }
          })
        : 'User not found';
    } catch (e) {
      throw e;
    }
  }

  async update(fields: Partial<ITask>): Promise<Task | string> {
    const { id, text, isDone } = fields;
    try {
      const task = await this.prisma.task.findFirst({ where: { id } });
      return task
        ? this.prisma.task.update({
            where: { id },
            data: {
              text,
              isDone
            }
          })
        : 'task not found';
    } catch (e) {
      throw e;
    }
  }

  async delete(id: number): Promise<Task | string> {
    try {
      const task = await this.prisma.user.findFirst({ where: { id } });
      return task
        ? this.prisma.task.delete({
            where: {
              id
            }
          })
        : 'task not found';
    } catch (e) {
      throw e;
    }
  }
}
