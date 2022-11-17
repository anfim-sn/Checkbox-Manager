import React from 'react'
import styled from 'styled-components'

const HeaderStyled = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0 60px;
  background: #925FF050;

  p {
    font-size: 30px;
    font-weight: bold;
    color: #333333;
  }
`

export const Header = () => {
  return <HeaderStyled><p>ESL Pro League</p></HeaderStyled>
}