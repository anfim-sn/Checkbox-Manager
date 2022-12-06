import React from 'react'
import { allRoles } from '../../mock/allRoles'
import { user } from '../../mock/user'
import styled from 'styled-components'
import { Typography, useTheme } from '@mui/material'
import { RHFTextInput } from '../Form/RHFTextInput'
import { MyButton } from '../Button/Button'
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { RHFSwitch } from '../Form/RHFSwitch'

const EditFormStyled = styled.div`
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

type Role = typeof allRoles[0]

interface RoleWithChecked extends Role {
  checked: boolean
}

interface UserFormState {
  name: string
  email: string
  roles: RoleWithChecked[]
  HEAD?: boolean
  MANAGER?: boolean
  TEACHER?: boolean
}

export const EditUserForm = () => {
  const theme = useTheme()
  
  const schema = yup
    .object({
      name: yup.string().required('Field are require'),
      email: yup.string().email('Invalid email').required('Field are require'),
    })
    .required()

  const defaultValueObject = (data: typeof user): UserFormState => {
    const { name, email, roles: userRoles } = data
    const roles: RoleWithChecked[] = allRoles.map(role => ({
      ...role,
      checked: Boolean(userRoles.find(({ code }) => code === role.code)),
    }))
    return { name, email, roles }
  }

  const formMethods = useForm<UserFormState>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: defaultValueObject(user),
  })

  const { fields } = useFieldArray({
    control: formMethods.control,
    name: 'roles',
  })

  const onSubmit: SubmitHandler<UserFormState> = data => {
    const roles = data.roles.reduce((acc, current) => {
      if (current.checked) {
        return [...acc, { code: current.code }]
      }
      return acc
    }, [] as Array<Record<'code', Role['code']>>)
    const mutation = { id: user.id, roles }
    console.log(mutation)
  }
  return (
    <EditFormStyled>
      <Typography
        style={{ color: theme.palette.text.primary }}
        variant="h4"
        component="h1"
        gutterBottom
      >
        Edit User
      </Typography>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <RHFTextInput name="name" />
          <RHFTextInput name="email" />
          {fields.map((field, index) => {
            return (
              <RHFSwitch
                key={field.id}
                label={field.name}
                name={`roles.${index}.checked`}
                defaultChecked={field.checked}
              />
            )
          })}
          <MyButton variant="contained" size="medium" type="submit">
            Register
          </MyButton>
        </form>
      </FormProvider>
    </EditFormStyled>
  )
}
