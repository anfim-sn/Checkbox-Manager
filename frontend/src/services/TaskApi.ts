import {ITask} from '../typings'

type CreateBody = {
  text: string
  userId: number
}

export class TaskApi {
  url = 'http://localhost:9001/task'

  async findByUserId(id: number): Promise<ITask[] | null> {
    const url = this.url + `?userId=${id}`
    const response = await fetch(url, {method: 'GET'})
    return response.json().then(data => data)
  }

  async getAll(): Promise<ITask[] | null> {
    const response = await fetch(this.url, {method: 'GET'})
    return response.json().then(data => data)
  }

  async findById(id: number): Promise<ITask | null> {
    const url = this.url + `/${id}`
    const response = await fetch(url, {method: 'GET'})
    return response.json().then(data => data)
  }

  async create({text, userId}: CreateBody): Promise<ITask | null> {
    if (!text) return null
    const body = JSON.stringify({
      text,
      userId
    })
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    return response.json().then(data => data)
  }

  async update(id: number, text: string): Promise<ITask | null> {
    if (!text) return null
    const url = this.url + `/${id}`
    const body = JSON.stringify({text})
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    return response.json().then(data => data)
  }

  async delete(id: number): Promise<void> {
    const url = this.url + `/${id}`
    await fetch(url, {method: 'DELETE'})
  }
}