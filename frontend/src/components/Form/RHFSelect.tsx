import React from 'react'
import styled from 'styled-components'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import {
  DeepMap,
  FieldError,
  FieldValues,
  get,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

const StyledSelectInput = styled(FormControl)`
  & label,
  label.Mui-focused {
    color: #fff;
  }

  & .MuiOutlinedInput-root {
    color: #fff;
    text-align: left;

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

  & .MuiSvgIcon-root {
    color: #fff;
  }
`

type FormSelectProps<TFormValues extends FieldValues> = {
  label: string
  options: []
  name: Path<TFormValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
}

export const RHFSelect = <TFormValues extends Record<string, unknown>>({
  label,
  name,
  rules,
  options,
  register,
  errors,
}: FormSelectProps<TFormValues>) => {
  const fieldError = get(errors, name)
  const errorMessage = fieldError?.message
  const hasError = !!(errors && fieldError)

  return (
    <StyledSelectInput>
      <InputLabel id={`${name}-select-label`} error={hasError}>
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-select-label`}
        label={label}
        error={hasError}
        {...(register && register(name, rules))}
      >
        <MenuItem value="rus">Russia</MenuItem>
        <MenuItem value="am">Armenia</MenuItem>
      </Select>
      {hasError && <FormHelperText error>{errorMessage}</FormHelperText>}
    </StyledSelectInput>
  )
}
