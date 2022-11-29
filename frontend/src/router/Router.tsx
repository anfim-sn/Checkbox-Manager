import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ManagePage } from '../pages/ManagePage'

export const Router = () => (
  <Routes>
    <Route path={'/'} element={<ManagePage />} />
  </Routes>
)
