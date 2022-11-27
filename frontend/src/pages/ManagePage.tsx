import React from 'react'
import styled from 'styled-components'
import { AdminNavBar } from '../components/AdminNavBar/AdminNavBar'
import { useAuth } from '../contexts/AuthContext'
import { TaskPage } from './TaskPage'

const ManagePageStyled = styled.div`
  display: flex;
`

export const ManagePage = () => {
  const auth = useAuth()
  if (auth.isAdmin) {
    return (
      <ManagePageStyled>
        <AdminNavBar />
        <div>
          <h1>Admin</h1>
        </div>
      </ManagePageStyled>
    )
  } else {
    return <TaskPage></TaskPage>
  }
}
