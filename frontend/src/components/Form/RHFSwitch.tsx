import React from 'react'
import { FormControlLabel, Switch, useTheme } from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'

type FormSwitchProps = {
  name: string
  label?: string
  defaultChecked?: boolean
}

export const RHFSwitch = ({ label, name, defaultChecked }: FormSwitchProps) => {
  const { control } = useFormContext()
  const theme = useTheme()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch {...field} defaultChecked={defaultChecked} />}
          label={label || name}
          style={{ color: theme.palette.text.primary }}
        />
      )}
    ></Controller>
  )
}
