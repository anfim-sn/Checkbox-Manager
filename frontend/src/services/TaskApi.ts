import {ITask} from '../typings'

export class TaskApi {
  url = 'http://localhost:9001/task'

  async findByUserId(id: number): Promise<ITask[] | null> {
    const url = this.url + `?userId=${id}`
    const response = await fetch(url, {method: 'GET'})
    return response.json().then(data => data)
  }

  // async getAll(): Promise<ITask[] | null> {
  //   return _tasks
  // }
  //
  // async findById(id: number): Promise<ITask | null> {
  //   return _tasks[0]
  // }
  //
  // async create({text, userId}: Omit<ITask, 'isDone'>): Promise<ITask> {
  //   return _tasks[0]
  // }
  //
  // async update(id: number, text: string): Promise<ITask | null> {
  //   return _tasks[0]
  // }
  //
  // async delete(id: number): Promise<ITask | null> {
  //   return _tasks[0]
  // }
}