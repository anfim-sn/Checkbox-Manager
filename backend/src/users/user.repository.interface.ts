import { IUser } from './user.interface'
import { User } from '@prisma/client'

export interface IUserRepository {
  create: (task: IUser) => Promise<User | string>
  findById: (id: number) => Promise<User | string>
  getAll: () => Promise<User[] | string>
  update: (fields: Partial<IUser>) => Promise<User | string>
  delete: (id: number) => Promise<User | string>
}