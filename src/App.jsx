import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/organisms/Layout'
import Dashboard from '@/components/pages/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="today" element={<Dashboard filter="today" />} />
          <Route path="upcoming" element={<Dashboard filter="upcoming" />} />
          <Route path="completed" element={<Dashboard filter="completed" />} />
          <Route path="category/:categoryId" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App