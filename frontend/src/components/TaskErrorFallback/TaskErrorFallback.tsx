import React from 'react'
import { Button } from '../Button/Button'
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
      <Button large secondary type="submit" onClick={() => location.reload()}>
        F5
      </Button>
    </ErrorBoundaryStyled>
  )
}
