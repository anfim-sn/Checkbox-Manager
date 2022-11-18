import React, {ChangeEventHandler, useState} from 'react'
import styled from 'styled-components'
import {useApiService} from '../../contexts/AppContext'

const TaskStyled = styled.div<{ checked: boolean }>`
  width: auto;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin: 15px 0;

  --main-color: #359d35;
  --light-main-color: #85d687;

  .checkbox__background {
    background: ${p => p.checked ? 'var(--main-color)' : 'transparent'};
  }

  .checkbox__label::after {
    opacity: ${p => p.checked ? '1' : '0'};
  }

  .checkbox__text {
    text-decoration: ${p => p.checked ? 'line-through' : 'none'};
  }
}
`

export const Task = ({isDone = false, text = '', id = 0}) => {
  const [checked, setChecked] = useState(isDone)
  const api = useApiService()

  const checkHandler: ChangeEventHandler = async () => {
    const response = await api.updateTask({id, isDone: true})
    response && setChecked(prevState => !prevState)
  }

  text = text.split('. ').map((phrase) => {
    return phrase.charAt(0).toUpperCase() + phrase.slice(1)
  }).join('. ')

  return (
    <TaskStyled checked={checked}>
      <label className="checkbox__label">
        <div className="checkbox__background"/>
        <input className="checkbox__input" type="checkbox" checked={checked} onChange={checkHandler}/>
      </label>
      <p className="checkbox__text">{text}</p>
    </TaskStyled>
  )
}

//TODO: skeleton animation on loading
//TODO: click doesnt must set cheked if server error
//TODO: show message if tasks doesnt load because server error
//TODO: catch the errors without fall the server