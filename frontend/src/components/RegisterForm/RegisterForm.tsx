import React from 'react'
import styled from 'styled-components'
import { TextField, Typography } from '@mui/material'
import { MyButton } from '../Button/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RHFTextInput } from '../Form/RHFTextInput'

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

    &.Mui-error fieldset {
      border-color: red;
    }
  }
`

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
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<IRegisterForm>({ mode: 'onBlur' })

  const emailValidate = (value: string) => {
    return value.split('').includes('@') || 'Invalid email'
  }

  const confirmEmailValidate = (value: string) => {
    return value === getValues('email') || 'Emails are not equal'
  }

  const passwordValidate = (value: string) => {
    const passwordRegExp = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
    return (
      passwordRegExp.test(value) ||
      'Password must have at least one char and number'
    )
  }

  const confirmPasswordValidate = (value: string) => {
    return value === getValues('password') || 'Passwords are not equal'
  }

  const onSubmit: SubmitHandler<IRegisterForm> = data => {
    console.log(data)
  }

  return (
    <RegisterFormStyled>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          label="login"
          {...register('login', {
            maxLength: {
              value: 20,
              message: 'Login must be less 20 chars',
            },
          })}
          error={!!errors?.login}
          helperText={errors?.login?.message}
        />
        <StyledTextField
          label="email"
          {...register('email', {
            required: 'Required field',
            validate: {
              emailValidate: value => emailValidate(value),
            },
          })}
          error={!!errors?.email}
          helperText={errors?.email?.message}
        />
        <StyledTextField
          label="confirm email"
          {...register('confirmEmail', {
            required: 'Required field',
            validate: {
              confirmEmailValidate: value => confirmEmailValidate(value),
            },
          })}
          error={!!errors?.confirmEmail}
          helperText={errors?.confirmEmail?.message}
        />
        <StyledTextField
          label="phone"
          {...register('phone', { required: 'Required field' })}
          error={!!errors?.phone}
          helperText={errors?.phone?.message}
        />
        <StyledTextField
          label="password"
          type="password"
          {...register('password', {
            required: 'Required field',
            minLength: {
              value: 6,
              message: 'Password must be lobger than 6 chars ',
            },
            validate: {
              passwordValidate: value => passwordValidate(value),
            },
          })}
          error={!!errors?.password}
          helperText={errors?.password?.message}
        />
        <StyledTextField
          label="confirm password"
          type="password"
          {...register('confirmPassword', {
            required: 'Required field',
            validate: {
              confirmPasswordValidate: value => confirmPasswordValidate(value),
            },
          })}
          error={!!errors?.confirmPassword}
          helperText={errors?.confirmPassword?.message}
        />
        {/*@ts-ignore*/}
        <RHFTextInput<IRegisterForm>
          label="country"
          type="text"
          name="country"
          register={register}
          rules={{
            required: 'Required custom field',
          }}
          errors={errors}
        />
        <MyButton variant="contained" size="medium" type="submit">
          Register
        </MyButton>
      </form>
    </RegisterFormStyled>
  )
}