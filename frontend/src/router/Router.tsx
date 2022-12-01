import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ManagePage } from '../pages/ManagePage'
import { AuthPage } from '../pages/AuthPage'

export const Router = () => (
  <Routes>
    <Route path={'/'} element={<ManagePage />} />
    <Route path={'/auth'} element={<AuthPage />} />
  </Routes>
)
