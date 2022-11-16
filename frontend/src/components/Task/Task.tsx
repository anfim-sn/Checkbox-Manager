import React, {ChangeEventHandler, useState} from 'react'
import type {ITask} from '../../typings'
import styled from 'styled-components'

const TaskStyled = styled.div<Pick<ITask, 'isDone'>>`
  width: auto;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin: 15px 0;

  input {
    position: relative;
    z-index: -1;
    opacity: 0;
  }

  label {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  label::before {
    content: '';
    position: absolute;
    top: 0;
    display: inline-block;
    width: 25px;
    height: 25px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 2px solid #925FF0;
    border-radius: 9px;
    cursor: pointer;
    background: ${p => p.isDone ? '#925FF0' : 'transparent'};
    transition: all .1s;
  }

  label::after {
    content: '';
    position: relative;
    width: 11px;
    height: 7px;
    border: 3px solid white;
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
    top: 5px;
    right: 7px;
    opacity: ${p => p.isDone ? '1' : '0'};
  }


  p {
    position: relative;
    font-size: 25px;
    text-decoration: line-through;
    text-decoration-color: ${p => p.isDone ? 'black' : 'transparent'};;
    transition: text-decoration-color .1s;
  }
`

export const Task = ({isDone = false, text = ''}: ITask) => {
  const [checked, setChecked] = useState(isDone)

  const checkHandler: ChangeEventHandler = () => {
    setChecked(!checked)
  }

  return (
    <TaskStyled isDone={checked}>
      <label>
        <input type="checkbox" checked={checked} onChange={checkHandler}/>
      </label>
      <p>{text}</p>
    </TaskStyled>
  )
}