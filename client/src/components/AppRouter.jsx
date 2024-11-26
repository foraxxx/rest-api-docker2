import React from 'react'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Tasks from "../pages/Tasks.jsx"

const AppRouter = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/api/tasks" />} />
        <Route path='/api/tasks' element={<Tasks/>}/>

      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter