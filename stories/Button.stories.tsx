import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from '../frontend/src/components/Button/Button'
import { Container } from '@mui/material'

export default {
  title: 'Button',
  component: Button,
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof Button>

export const Primary: ComponentStory<typeof Button> = ({
  children,
  ...props
}) => <Button {...props}>{children}</Button>

Primary.args = {
  children: 'Button',
  variant: 'contained',
  color: 'primary',
  size: 'medium',
}
