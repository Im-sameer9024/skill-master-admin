import React, { useState, useRef } from 'react'
import Sidebar from './components/common/Sidebar/Sidebar'
import Navbar from './components/common/Navbar/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/Dashboard'
import UserPage from './pages/UserPage'
import NotFound from './pages/NotFound'
import BlogPage from './pages/BlogPage'

const App = () => {
  const path = useLocation().pathname;
  const [hasScrolled, setHasScrolled] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    // Add shadow when scrolled more than 10px
    if (scrollTop > 10) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  return (
    <div className='flex w-full h-screen'> 
      <Sidebar path={path}/>

      {/* Main content area with scroll */}
      <div className='flex-1 flex flex-col min-h-0'> 
        {/* Navbar - fixed height with conditional shadow */}
        <div className={`flex-shrink-0 transition-all duration-300 ease-in-out ${
          hasScrolled 
            ? 'shadow-lg bg-white z-10' 
            : 'shadow-none bg-gray-100 z-10'
        }`}> 
          <Navbar path={path}/>
        </div>
        
        {/* Routes section with scroll */}
        <div 
          ref={contentRef}
          className='flex-1 overflow-y-auto' 
          onScroll={handleScroll}
        > 
          <Routes>
            <Route path='/dashboard' element={<HomePage/>} />
            <Route path='/users' element={<UserPage/>}/>
            <Route path='/blogs' element={<BlogPage/>}/>


            <Route path='*' element={<NotFound/>} />

          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App