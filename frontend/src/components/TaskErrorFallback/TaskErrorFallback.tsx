import React from 'react'
import { MyButton } from '../Button/Button'
import styled from 'styled-components'

const ErrorBoundaryStyled = styled.h1`
  p {
    text-align: center;
    color: red;
    font-size: 30px;
  }

  button {
    width: 100%;
  }
`

// @ts-ignore
export const TaskErrorFallback = ({ error }) => {
  console.log(error)
  return (
    <ErrorBoundaryStyled>
      <p>{error}</p>
      <MyButton onClick={() => location.reload()}>F5</MyButton>
    </ErrorBoundaryStyled>
  )
}
