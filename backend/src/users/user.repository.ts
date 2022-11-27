import { PrismaClient, User } from '@prisma/client'
import { IUserRepository } from './user.repository.interface'
import { IUser } from './user.interface'

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async getAll(): Promise<User[]> {
    try {
      return this.prisma.user.findMany()
    } catch (e) {
      throw e
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      return this.prisma.user.findFirst({
        where: { id },
      })
    } catch (e) {
      throw e
    }
  }

  async create({ name }: IUser): Promise<User | string> {
    try {
      return this.prisma.user.create({
        data: {
          name,
        },
      })
    } catch (e) {
      throw e
    }
  }

  async update(fields: Partial<IUser>): Promise<User | string> {
    const { id, name } = fields
    try {
      const user = await this.prisma.user.findFirst({ where: { id } })
      return user
        ? this.prisma.user.update({
            where: { id },
            data: {
              name,
            },
          })
        : 'user not found'
    } catch (e) {
      throw e
    }
  }

  async delete(id: number): Promise<User | string> {
    try {
      const user = await this.prisma.user.findFirst({ where: { id } })
      return user
        ? this.prisma.user.delete({
            where: {
              id,
            },
          })
        : 'user not found'
    } catch (e) {
      throw e
    }
  }
}
