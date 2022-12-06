import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ManagePage } from '../pages/ManagePage'
import { AuthPage } from '../pages/AuthPage'
import { EditUserPage } from '../pages/EditUserPage'
import { NewDynamicForm } from '../components/NewDynamicForm/NewDynamicForm'

export const Router = () => (
  <Routes>
    <Route path={'/'} element={<ManagePage />} />
    <Route path={'/auth'} element={<AuthPage />} />
    <Route path={'/edit'} element={<EditUserPage />} />
    <Route path={'/dyn'} element={<NewDynamicForm />} />
  </Routes>
)
