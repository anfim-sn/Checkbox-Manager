import React from 'react'
import { createGlobalStyle } from 'styled-components'
import './common/scss/common.scss'
import { ServicesProvider } from './contexts/ServiceContext'
import { ApiService } from './services/ApiService'
import { Router } from './router/Router'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    background: #333;
    color: #fff;
  }
`

export const App = () => {
  return (
    <>
      <GlobalStyled />
      <BrowserRouter>
        <ServicesProvider value={{ apiService: ApiService }}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </ServicesProvider>
      </BrowserRouter>
    </>
  )
}
