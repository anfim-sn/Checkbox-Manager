import React, {ChangeEventHandler, Dispatch, SetStateAction, useState} from 'react'
import type {ITask} from '../../typings'
import styled from 'styled-components'
import {useApiService} from '../../contexts/AppContext'

type TaskStyledProps = {
  checked: number,
  edit: boolean
}

const TaskStyled = styled.div<{ props: TaskStyledProps }>`
  width: auto;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin: 15px 0;

  --main-color: #7e1492;
  --light-main-color: #cf55de;

  .checkbox__label {
    cursor: ${p => p.props.checked === 0 ? p.props.edit ? 'not-allowed' : 'pointer' : 'pointer'};
    ${p => p.props.checked === 2 ? p.props.edit ? 'animation: edit .5s infinite linear alternate' : '' : ''};
  }

  .checkbox__label::before {
    cursor: ${p => p.props.checked === 0 ? p.props.edit ? 'not-allowed' : 'pointer' : 'pointer'};
    background: ${p => p.props.checked === 2 ? 'var(--main-color)' : 'transparent'};
  }

  .checkbox__loader {
    display: ${p => p.props.checked === 1 ? 'block' : 'none'};
  }

  .checkbox__loader-left::after {
    background: ${p => p.props.checked === 1 ? 'var(--light-main-color)' : 'transparent'};
  }

  .checkbox__loader-right::after {
    background: ${p => p.props.checked === 1 ? 'var(--light-main-color)' : 'transparent'};
  }

  .checkbox__label::after {
    opacity: ${p => p.props.checked === 2 ? '1' : '0'};
  }

  .checkbox__text {
    text-decoration: ${p => p.props.checked === 2 ? 'line-through' : 'none'};
  }
}
`

interface TaskProps extends Omit<ITask, 'userId'> {
  edit: boolean
  setTasks: Dispatch<SetStateAction<ITask[]>>
}

enum taskStatuses {
  UNCHECK,
  PRE_CHECK,
  CHECK
}

export const Task = ({isDone = false, text = '', id = 0, edit = false, setTasks}: TaskProps) => {
  const {UNCHECK, PRE_CHECK, CHECK} = taskStatuses
  const [checked, setChecked] = useState<number>(isDone ? CHECK : UNCHECK)
  const [timerId, setTimerId] = useState<NodeJS.Timeout>()
  const api = useApiService()

  const checkHandler: ChangeEventHandler = () => {
    switch (checked) {
      case UNCHECK: {
        if (edit) return
        const id = setTimeout(() => {
          setChecked(UNCHECK)
        }, 3000)
        setTimerId(id)
        setChecked(PRE_CHECK)
        return
      }
      case PRE_CHECK: {
        setChecked(CHECK)
        clearTimeout(timerId)
        api.checkedTask(id)
        setTasks(prevState =>
          prevState.map(task => {
            if (task.id === id) task.isDone = true
            return task
          }))
        return
      }
      case CHECK: {
        if (edit) {
          setChecked(UNCHECK)
          setTasks(prevState =>
            prevState.map(task => {
              if (task.id === id) task.isDone = false
              return task
            }))
          api.uncheckedTask(id)
        }
        return
      }
    }
  }

  text = text.split('. ').map((phrase) => {
    return phrase.charAt(0).toUpperCase() + phrase.slice(1)
  }).join('. ')

  return (
    <TaskStyled props={{checked, edit}}>
      <label className="checkbox__label">
        <div className="checkbox__loader">
          <div className="checkbox__loader-left"/>
          <div className="checkbox__loader-right"/>
        </div>
        <input className="checkbox__input" type="checkbox" checked={checked === CHECK} onChange={checkHandler}/>
      </label>
      <p className="checkbox__text">{text}</p>
    </TaskStyled>
  )
}