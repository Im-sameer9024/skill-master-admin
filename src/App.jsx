import React from 'react'
import Sidebar from './components/common/Sidebar/Sidebar'
import Navbar from './components/common/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <div className=' flex w-full h-full'>
      <Sidebar/>
      <div className='w-full h-full'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>} />
        </Routes>
      </div>

    </div>
  )
}

export default App