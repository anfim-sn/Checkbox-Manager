import styled, { css } from 'styled-components'

type ButtonTypes = {
  secondary: boolean
  primary: boolean
  small: boolean
  medium: boolean
  large: boolean
}

const stylesBySize = ({ small, large }: Partial<ButtonTypes>) => {
  if (large) {
    return css`
      padding: 10px;
      border-radius: 5px;
      font-size: 1.5em;
    `
  } else if (small) {
    return css`
      padding: 8px;
      border-radius: 4px;
      font-size: 1em;
    `
  } else {
    return css`
      padding: 8px;
      border-radius: 4px;
      font-size: 1em;
    `
  }
}

const stylesByType = ({ secondary }: Partial<ButtonTypes>) => {
  if (secondary) {
    return css`
      background: transparent;
      border: 2px solid #93fe96;
    `
  } else {
    return css`
      border: none;
      background: #93fe96;
    `
  }
}

export const Button = styled.button`
  display: block;
  font-weight: bold;
  cursor: pointer;
  box-shadow: none;
  margin: 20px 0;
  ${stylesBySize};
  ${stylesByType};
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    background: #eee;
    color: #666;
    opacity: 1;
    cursor: default;
  }
`
