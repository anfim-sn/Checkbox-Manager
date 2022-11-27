import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TaskPage } from '../pages/TaskPage'
import { ManagePage } from '../pages/ManagePage'

export const Router = () => (
  <Routes>
    <Route path={'/'} element={<ManagePage />} />
  </Routes>
)
