import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className=" min-h-[calc(100vh-74px)] bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        {/* 404 Text */}
        <div className="text-9xl font-bold text-red-600 mb-8">404</div>
        
        {/* Dashboard Button */}
        <Link
          to="/dashboard"
          className="inline-block bg-red-500  text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound