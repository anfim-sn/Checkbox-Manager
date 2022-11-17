import React from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import './common/scss/common.scss'
import {Header} from './components/Header/Header'
import {ServicesContextProvider} from './contexts/AppContext'
import {ApiService} from './services/ApiService'
import {Tasks} from './components/Tasks/Tasks'

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
        <Tasks userId={1}/>
      </AppWrapper>
    </ServicesContextProvider>
  )
}
