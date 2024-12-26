import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className='flex flex-col items-center justify-center bg-gray-800 w-full h-[100vh]'>
      <p className='text-lg text-white font-semibold'>404 | Page not found</p>
      <Link className='text-lg text-white font-semibold hover:text-blue-600' to="/">Back to : Home</Link>
    </div>
  )
}

export default Error
