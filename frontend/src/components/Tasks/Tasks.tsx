import React, {useEffect, useState} from 'react'
import {useApiService} from '../../contexts/AppContext'
import {ITask} from '../../typings'
import {Task} from '../Task/Task'
import styled from 'styled-components'

const TasksStyled = styled.div``

export const Tasks = ({userId}: { userId: number }) => {
  const api = useApiService()
  const [tasks, setTasks] = useState<ITask[]>([])
  // const checkedTask = tasks.find(task => task.isDone)
  // const isAllTaskUnchecked = !checkedTask

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getTaskByUserId(userId)
      if (typeof data === 'string') {
        throw new Error(data)
      }
      setTasks(data.sort((a, b) => a.id - b.id))
    }
    fetchData()
  }, [userId])

  const hasTasks = tasks.length > 0

  return (
    <TasksStyled>
      {hasTasks && (
        <>
          <p className="desciption__text">Click to checked task</p>
          {tasks.map((task) =>
            <Task
              key={task.id}
              id={task.id}
              isDone={task.isDone}
              text={task.text}
            />
          )}
        </>
      )}
      {!hasTasks && <p className="desciption__text">No tasks</p>}
      {/*{!error && <p className="desciption__text">No tasks</p>}*/}
    </TasksStyled>
  )
}
