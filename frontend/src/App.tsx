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
  }

  h1, h2, h3, h4, h5, h6, p {
    font-family: "Roboto", sans-serif;
    color: #fff;
  }

  body {
    background: #333;
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
