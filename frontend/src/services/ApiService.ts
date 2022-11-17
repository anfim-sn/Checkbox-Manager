import axios from 'axios'
import {ITask} from '../typings'

type CreateTaskBody = Pick<ITask, 'text' | 'userId'>
type UpdateTaskBody = Pick<ITask, 'id' | 'text'>

export class ApiService {
  private static url = 'http://localhost:9001/'

  static async getAllTasks() {
    try {
      const response = await axios.get<ITask[] | string>(this.url)
      return response.data
    } catch (e) {
      return e as string
    }
  }

  static async getTaskByUserId(userId: number) {
    try {
      const url = `${this.url}task?userId=${userId}`
      const response = await axios.get<ITask[] | string>(url)
      return response.data
    } catch (e) {
      return e as string
    }
  }

  static async getTaskById(id: number) {
    try {
      const url = `${this.url}task/${id}`
      const response = await axios.get(url)
      return response.data
    } catch (e) {
      return e as string
    }
  }

  static async createTask({text, userId}: CreateTaskBody) {
    if (!text) return 'text is empty'
    try {
      const response = await axios.post<ITask | string>(this.url, {text, userId})
      return response.data
    } catch (e) {
      return e as string
    }
  }

  static async updateTask({id, text}: UpdateTaskBody) {
    if (!text) return 'text is empty'
    try {
      const url = `${this.url}task/${id}`
      const response = await axios.put(url, {text})
      return response.data
    } catch (e) {
      return e as string
    }
  }

  static async deleteTask(id: number) {
    try {
      const url = `${this.url}task/${id}`
      await axios.delete(url)
      return `${id} task is deleted`
    } catch (e) {
      return e as string
    }
  }
}