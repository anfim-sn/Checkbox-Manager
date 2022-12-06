import React from 'react'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import { MyButton } from '../Button/Button'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { RHFTextInput } from '../Form/RHFTextInput'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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

interface IRegisterForm {
  login: string
  email: string
  confirmEmail: string
  phone: string
  password: string
  confirmPassword: string
  country: string
}

export const RegisterForm = () => {
  const schema = yup
    .object({
      email: yup.string().email('Invalid email').required('Field are require'),
      login: yup.string().required('Field are require'),
    })
    .required()

  const formMethods = useForm<IRegisterForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<IRegisterForm> = data => {
    console.log(data)
  }

  return (
    <RegisterFormStyled>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <RHFTextInput name="email" />
          <RHFTextInput name="login" />
          <MyButton variant="contained" size="medium" type="submit">
            Register
          </MyButton>
        </form>
      </FormProvider>
    </RegisterFormStyled>
  )
}
