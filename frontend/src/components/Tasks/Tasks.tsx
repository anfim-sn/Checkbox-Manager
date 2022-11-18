import React, {useEffect, useState} from 'react'
import {useApiService} from '../../contexts/AppContext'
import {ITask} from '../../typings'
import {Task} from '../Task/Task'
import styled from 'styled-components'

const TasksStyled = styled.div<{ edit: boolean }>`
  --main-color: #7e1492;
  --light-main-color: #b24abf;

  .edit-button {
    background: ${p => p.edit ? 'var(--light-main-color)' : 'var(--main-color)'}
  }
`

export const Tasks = ({userId}: { userId: number }) => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [editMode, setEditMode] = useState<boolean>(false)
  const checkedTask = tasks.find(task => task.isDone)
  const isAllTaskUnchecked = !checkedTask
  const api = useApiService()

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

  const editModeHandler = () => {
    if (!isAllTaskUnchecked) setEditMode(prev => !prev)
  }

  return (
    <TasksStyled edit={editMode}>
      <button className="button edit-button" onClick={editModeHandler}>Uncheck</button>
      {tasks.map((task) =>
        <Task
          key={task.id}
          id={task.id}
          isDone={task.isDone}
          text={task.text}
          edit={editMode}
          setTasks={setTasks}
        />
      )}
    </TasksStyled>
  )
}
