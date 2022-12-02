import React from 'react'
import styled from 'styled-components'
import { TextField } from '@mui/material'
import {
  DeepMap,
  FieldError,
  FieldValues,
  get,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

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

type FormInputProps<TFormValues extends FieldValues> = {
  label: string
  type: any
  name: Path<TFormValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
}

export const RHFTextInput = <TFormValues extends Record<string, unknown>>({
  label,
  type,
  name,
  rules,
  register,
  errors,
}: FormInputProps<TFormValues>) => {
  const fieldError = get(errors, name)
  const errorMessage = fieldError?.message
  const hasError = !!(errors && fieldError)

  return (
    <StyledTextField
      label={label}
      type={type}
      {...(register && register(name, rules))}
      error={hasError}
      helperText={errorMessage}
    />
  )
}
