import {HashLoader} from 'react-spinners';

function Loader() {
  return (
    <>
    <div className='flex flex-col items-center justify-center h-full bg-black bg-opacity-10 relative z-500'>
      <HashLoader color="#004f92" size={60} speedMultiplier={1} />
      <h2 className='text-lg text-[#004f92] sm:ml-3 sm:pt-4'>Loading...</h2>
    </div>
    </>
  )
}

export default Loader
