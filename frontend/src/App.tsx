import React from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import {Task} from './components/Task/Task'
import {_tasks} from './mock/tasks'
import './common/scss/common.scss'
import {Header} from './components/Header/Header'

const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }
`

const AppWrapper = styled.div`
  width: 70%;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
`

export const App = () => (
  <>
    <GlobalStyled/>
    <Header/>
    {/*@ts-ignore*/}
    <AppWrapper>
      {_tasks.map((task) => <Task key={task.id} id={task.id} isDone={task.isDone} text={task.text}/>)}
    </AppWrapper>
  </>
)
