import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

type FormInputProps = {
  name: string
  label?: string
}

export const RHFTextInput = ({ label, name }: FormInputProps) => {
  const { control, formState } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          value={field.value || ''}
          label={label || name}
          error={!!error}
          helperText={error?.message}
        />
      )}
    ></Controller>
  )
}
