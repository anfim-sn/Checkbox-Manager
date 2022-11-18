export interface ITask {
  id: number
  text: string
  isDone: boolean
  userId: number
}

export interface ITaskApi {
  url: string | undefined
  create: (task: ITask) => Promise<ITask>
  findById: (id: number) => Promise<ITask | null>
  getAll: () => Promise<ITask[] | null>
  update: (id: number, text: string) => Promise<ITask | null>
  delete: (id: number) => Promise<ITask | null>
  findByUserId: (id: number) => Promise<ITask[] | null>
}