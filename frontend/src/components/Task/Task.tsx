import React, { ChangeEventHandler, useState } from 'react'
import styled from 'styled-components'
import { useApiService } from '../../contexts/ServiceContext'

const TaskStyled = styled.div<{ p: { checked: boolean; isConfirmLoading: boolean } }>`
  width: auto;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin: 15px 0;

  --main-color: #359d35;
  --light-main-color: #85d687;

  .checkbox__background {
    background: ${p => (p.p.checked ? 'var(--main-color)' : 'transparent')};
  }

  .checkbox__label::after {
    opacity: ${p => (p.p.checked ? '1' : '0')};
  }

  .checkbox__text {
    text-decoration: ${p => (p.p.checked ? 'line-through' : 'none')};
  }

  .checkbox__loader {
    opacity: ${p => (p.p.isConfirmLoading ? 1 : 0)};
  }
`

export const Task = ({ isDone = false, text = '', id = 0 }) => {
  const [checked, setChecked] = useState(isDone)
  const [isConfirmLoading, setIsConfirmLoading] = useState(false)
  const api = useApiService()

  const checkHandler: ChangeEventHandler = () => {
    setIsConfirmLoading(true)
    setChecked(prevState => !prevState)
    api
      .updateTask({ id, isDone: !checked })
      .catch(() => setChecked(prevState => !prevState))
      .finally(() => setIsConfirmLoading(false))
  }

  text = text
    .split('. ')
    .map(phrase => {
      return phrase.charAt(0).toUpperCase() + phrase.slice(1)
    })
    .join('. ')

  return (
    <TaskStyled p={{ checked, isConfirmLoading }}>
      <label className="checkbox__label">
        <div className="checkbox__loader" />
        <div className="checkbox__background" />
        <input className="checkbox__input" type="checkbox" checked={checked} onChange={checkHandler} />
      </label>
      <p className="checkbox__text">{text}</p>
    </TaskStyled>
  )
}
