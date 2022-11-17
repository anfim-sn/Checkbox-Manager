import React, {useEffect} from 'react'
import styled from 'styled-components'
import {useApiService} from '../../contexts/AppContext'

const HeaderStyled = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0 60px;
  background: #925FF050;

  p {
    font-size: 30px;
    font-weight: bold;
    color: #333333;
  }
`

export const Header = () => {
  const api = useApiService()

  const tasks = api.getTaskByUserId(1)
  console.log(tasks)

  return <HeaderStyled><p>ESL Pro League</p></HeaderStyled>
}