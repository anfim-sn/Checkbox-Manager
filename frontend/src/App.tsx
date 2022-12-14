import React from 'react'
import { createGlobalStyle } from 'styled-components'
import './common/scss/common.scss'
import { ServicesProvider } from './contexts/ServiceContext'
import { ApiService } from './services/ApiService'
import { Router } from './router/Router'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6, p {
    font-family: "Roboto", sans-serif;
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
            <ThemeProvider theme={theme}>
              <Router />
            </ThemeProvider>
          </AuthProvider>
        </ServicesProvider>
      </BrowserRouter>
    </>
  )
}
