import React, {useContext, useEffect, useState} from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import './common/scss/common.scss'
import {Task} from './components/Task/Task'
import {Header} from './components/Header/Header'
import {ServicesContextProvider} from './contexts/AppContext'
import {ApiService} from './services/ApiService'

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

export const App = () => {

  return (
    <ServicesContextProvider value={{
      apiService: ApiService
    }}>
      <GlobalStyled/>
      <Header/>
      {/*<button onClick={createTask}>create</button>*/}
      {/*<button onClick={updateTask}>update</button>*/}
      {/*<button onClick={deleteTask}>delete</button>*/}
      <AppWrapper>
        {/*{tasks?.map((task) => <Task key={task.id} id={task.id} isDone={task.isDone} text={task.text}/>)}*/}
      </AppWrapper>
    </ServicesContextProvider>
  )
}
