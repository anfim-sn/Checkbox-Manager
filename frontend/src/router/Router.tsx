import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ManagePage } from '../pages/ManagePage'
import { AuthPage } from '../pages/AuthPage'
import { EditUserPage } from '../pages/EditUserPage'

export const Router = () => (
  <Routes>
    <Route path={'/'} element={<ManagePage />} />
    <Route path={'/auth'} element={<AuthPage />} />
    <Route path={'/edit'} element={<EditUserPage />} />
  </Routes>
)
