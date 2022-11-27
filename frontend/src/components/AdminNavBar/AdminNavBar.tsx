import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavBarStyled = styled.div`
  width: 300px;
  bottom: 0;
  top: 0;
  padding: 20px;

  h1 {
    margin-bottom: 30px;
  }
`
const Menu = styled.nav`
  display: flex;
  flex-direction: column;
`

const LinkStyled = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  margin-bottom: 20px;
`

export const AdminNavBar = () => {
  return (
    <NavBarStyled>
      <h1>Event Name</h1>
      <Menu>
        <LinkStyled to={'/dashboard'}>Dashboard</LinkStyled>
        <LinkStyled to={'/team'}>Team</LinkStyled>
        <LinkStyled to={'/tasklist'}>Task lists</LinkStyled>
        <LinkStyled to={'/taskpool'}>Tasks pool</LinkStyled>
        <LinkStyled to={'/setting'}>Settings</LinkStyled>
      </Menu>
    </NavBarStyled>
  )
}
