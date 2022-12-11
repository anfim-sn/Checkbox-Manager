import React from 'react'
import styled from 'styled-components'
import BaseButton from '@mui/material/Button'

type BaseButtonProps = React.ComponentPropsWithRef<typeof BaseButton>

const ButtonStyled = styled(BaseButton)`
  background-color: #359d35;
`

interface Props extends BaseButtonProps {}

export const Button = ({ children, ...props }: Props) => (
  <ButtonStyled {...props}>{children}</ButtonStyled>
)