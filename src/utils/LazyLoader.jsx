import React from 'react'
import { PuffLoader } from 'react-spinners'

function LazyLoader() {
  return (
    <div>
      <div className='flex flex-col items-center justify-center h-screen'>
      <PuffLoader color="#004f92" size={100} speedMultiplier={1} />
      <h2 className='text-xl text-[#004f92] sm:ml-3 sm:pt-4'>The contents are being load...</h2>
    </div>
    </div>
  )
}

export default LazyLoader
