import React, { useState } from 'react'
import { FormControlLabel, Switch, TextField } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

type FormSwitchProps = {
  name: string
  label?: string
  defaultChecked?: boolean
}

export const RHFSwitch = ({ label, name, defaultChecked }: FormSwitchProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch {...field} defaultChecked={defaultChecked} />}
          label={label || name}
        />
      )}
    ></Controller>
  )
}
