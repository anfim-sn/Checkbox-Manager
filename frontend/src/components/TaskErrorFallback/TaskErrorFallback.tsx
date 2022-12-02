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

export const TaskErrorFallback = ({ error }: { error: any }) => {
  console.log(error)
  return (
    <ErrorBoundaryStyled>
      <p>{error}</p>
      <MyButton variant="contained" onClick={() => location.reload()}>
        F5
      </MyButton>
    </ErrorBoundaryStyled>
  )
}
