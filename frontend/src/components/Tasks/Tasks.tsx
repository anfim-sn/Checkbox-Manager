import React, {useEffect, useState} from 'react'
import {useApiService} from '../../contexts/AppContext'
import {ITask} from '../../typings'
import {Task} from '../Task/Task'

export const Tasks = ({userId}: { userId: number }) => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const api = useApiService()

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getTaskByUserId(userId)
      if (typeof data === 'string') {
        throw new Error(data)
      }
      setTasks(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      {tasks.map((task) => <Task key={task.id} id={task.id} isDone={task.isDone} text={task.text}/>)}
    </div>
  )
}
