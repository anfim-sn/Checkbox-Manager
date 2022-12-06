import React from 'react'
import styled from 'styled-components'
import { Typography, useTheme } from '@mui/material'
import { RHFTextInput } from '../Form/RHFTextInput'
import { MyButton } from '../Button/Button'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ValidationError } from 'yup'

const DynamicFormStyled = styled.div`
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

interface UserFormState {
  name: string
  age: number
  socialNumber: number
}

yup.addMethod<yup.NumberSchema>(
  yup.number,
  'minorAgeValidation',
  function (errorMessage) {
    return this.test(`test-minor-age`, errorMessage, function (value) {
      const ageValue: number = this.resolve(yup.ref('age'))
      if (ageValue < 18) {
        return this.createError({
          path: 'socialNumber',
          message: errorMessage,
        })
      } else return true
    })
  }
)

export const NewDynamicForm = () => {
  const theme = useTheme()

  const schema = yup
    .object({
      name: yup.string().required('Field are require'),
      age: yup.number().required('Field are require'),
      // .minorAgeValidation('Social number only for 18+'),
      socialNumber: yup
        .number()
        .required('Field are require')
        .when('age', {
          is: (age: number) => age < 18,
          then: yup.number().oneOf([yup.ref('age')], 'fuck'),
        }),
    })
    .required()

  const formMethods = useForm<UserFormState>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<UserFormState> = data => {
    console.log(data)
  }
  return (
    <DynamicFormStyled>
      <Typography
        style={{ color: theme.palette.text.primary }}
        variant="h4"
        component="h1"
        gutterBottom
      >
        User
      </Typography>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <RHFTextInput name="name" label="Name" />
          <RHFTextInput name="age" label="Age" />
          <RHFTextInput name="socialNumber" label="Social Number" />
          <MyButton variant="contained" size="medium" type="submit">
            Send
          </MyButton>
        </form>
      </FormProvider>
    </DynamicFormStyled>
  )
}
