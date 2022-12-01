import React, { useState } from 'react'
import styled from 'styled-components'
import { TextField, Typography } from '@mui/material'
import { MyButton } from '../Button/Button'

const RegisterFormStyled = styled.div`
  width: 50%;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`

const StyledTextField = styled(TextField)`
  & label,
  label.Mui-focused {
    color: #fff;
  }

  & .MuiOutlinedInput-root {
    color: #fff;

    & fieldset {
      border-color: #fff;
    }

    &:hover fieldset {
      border-color: #d1d1d1;
    }

    &.Mui-focused fieldset {
      border-color: #fff;
    }
  }
`

export const RegisterForm = () => {
  const [login, setLogin] = useState('')

  return (
    <RegisterFormStyled>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <form>
        <StyledTextField label="login" value={login} onChange={event => setLogin(event.target.value)} />
        <StyledTextField label="password" type="password" />
        <MyButton variant="contained" size="medium" type="submit">
          Register
        </MyButton>
      </form>
    </RegisterFormStyled>
  )
}