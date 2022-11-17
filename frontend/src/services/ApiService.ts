import {TaskApi} from './TaskApi'

export class ApiService {
  private static taskApi = new TaskApi()

  static getAllTasks() {
    return this.taskApi.getAll()
  }

  static getTaskByUserId(userId = 1) {
    return this.taskApi.findByUserId(userId)
  }

  static getTaskById(id = 1) {
    return this.taskApi.findById(id)
  }

  static createTask({text, userId} = {text: '', userId: 0}) {
    return this.taskApi.create({text, userId})
  }

  static updateTask({id, text} = {id: 0, text: ''}) {
    return this.taskApi.update({id, text})
  }

  static deleteTask(id = 0) {
    return this.taskApi.delete(id)
  }
}