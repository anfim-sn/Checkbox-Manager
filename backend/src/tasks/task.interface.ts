export interface ITask {
  id?: number
  text: string
  description?: string
  isDone: boolean
  userId?: number
  categoryId?: number
  parentId?: number

  createdAt?: Date
  updatedAt?: Date
}