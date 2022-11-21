import React from 'react'
import styled from 'styled-components'

const HeaderStyled = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  background: #bbeebb;

  h1 {
    font-size: 30px;
    font-weight: bold;
    color: #333333;
  }

  .bold {
    font-weight: bold;
  }

  p {
    font-size: 20px;
    font-weight: normal;
    color: #333333;
  }
`

export const Header = () => {
  return (
    <HeaderStyled>
      <h1>ESL Pro League</h1>
      <p>
        Anfim Snegirev / <span className="bold">Light Operator</span>
      </p>
    </HeaderStyled>
  )
}
