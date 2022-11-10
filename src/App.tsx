import React from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import {Task} from './components/Task/Task'
import {_tasks} from './mock/tasks'
import './common/scss/common.scss'

const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }
`

const AppWrapper = styled.div`
  width: 90%;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`
type Props = { isDev?: boolean }
export const App = ({isDev = true}: Props) => (
  <>
    <GlobalStyled/>
    {/*@ts-ignore*/}
    <AppWrapper isDev={isDev}>
      {_tasks.map((task) => <Task key={task.id} id={task.id} isDone={task.isDone} text={task.text}/>)}
    </AppWrapper>
  </>
)
