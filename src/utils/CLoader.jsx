import {ClipLoader} from 'react-spinners';

function CLoader() {
  return (
    <>
    <div className='flex items-center justify-center h-full'>
      <ClipLoader color="#004f92" size={35} speedMultiplier={1} />
    </div>
    </>
  )
}

export default CLoader
