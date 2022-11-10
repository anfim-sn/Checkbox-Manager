import React, {ChangeEventHandler, useState} from 'react'
import type {ITask} from '../../typings'
import styled from 'styled-components'

const TaskStyled = styled.div<Pick<ITask, 'isDone'>>`
  width: auto;
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 10px auto;

  input {
    width: 25px;
    height: 25px;
  }

  p {
    font-size: 25px;
    text-decoration: ${p => p.isDone ? 'line-through' : 'none'}
  }
`

export const Task = ({isDone = false, text = ''}: ITask) => {
  const [checked, setChecked] = useState(isDone)

  const checkHandler: ChangeEventHandler = () => {
    setChecked(!checked)
  }

  return (
    <TaskStyled isDone={checked}>
      <input type="checkbox" checked={checked} onChange={checkHandler}/>
      <p>{text}</p>
    </TaskStyled>
  )
}