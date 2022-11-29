import React from 'react'
import { Tasks } from '../components/Tasks/Tasks'
import { Header } from '../components/Header/Header'
import styled from 'styled-components'
import { ErrorBoundary } from 'react-error-boundary'
import { TaskErrorFallback } from '../components/TaskErrorFallback'

const TaskPageStyled = styled.div`
  width: 70%;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
`

export const TaskPage = () => (
  <>
    <Header />
    <TaskPageStyled>
      <ErrorBoundary FallbackComponent={TaskErrorFallback}>
        <Tasks userId={1} />
      </ErrorBoundary>
    </TaskPageStyled>
  </>
)