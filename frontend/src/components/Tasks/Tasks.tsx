import React, { useEffect, useState } from 'react'
import { useApiService } from '../../contexts/ServiceContext'
import { ITask } from '../../typings'
import { Task } from '../Task/Task'
import styled from 'styled-components'

const TasksStyled = styled.div`
  .tasks__loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border-bottom: 2px solid black;
    animation: loading 0.5s linear infinite;
    margin: 0 auto;
  }

  .tasks__error {
    color: #de163d;
    text-align: center;
  }

  .tasks__desciption {
    font-size: 18px;
    color: slategray;
    margin: 20px 0;
  }
`

export const Tasks = ({ userId }: { userId: number }) => {
  const api = useApiService()
  const [tasks, setTasks] = useState<ITask[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const hasTasks = tasks.length > 0

  useEffect(() => {
    setIsLoading(true)
    api
      .getTaskByUserId(userId)
      .then(
        responseData => {
          setTasks(responseData.sort((a, b) => a.id - b.id))
        },
        errorData => {
          setError(errorData)
        }
      )
      .finally(() => setIsLoading(false))
  }, [userId])

  return (
    <TasksStyled className="tasks">
      {isLoading ? (
        <div className="tasks__loader" />
      ) : hasTasks ? (
        <>
          <p className="tasks__desciption">Click to checked task</p>
          {tasks.map(task => (
            <Task key={task.id} id={task.id} isDone={task.isDone} text={task.text} />
          ))}
        </>
      ) : error ? (
        <p className="tasks__error">{error}</p>
      ) : (
        <p className="tasks__description">No tasks</p>
      )}
    </TasksStyled>
  )
}
