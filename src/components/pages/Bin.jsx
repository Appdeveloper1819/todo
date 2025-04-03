import React from 'react'
import Sidebar from '../sidebar'
import Navbar from '../navbar'

const Bin = () => {
  return (
    <div>
        <Sidebar />
        <Navbar />
      <div className='flex flex-col text-[20px] sm:text-[20px] italic text-center mt-5'>
        <h3>Notes in the Recycle Bin are deleted after 7 days.</h3>
      </div>
      <div className= 'flex flex-col items-center justify-center mt-44'>
      <i className="material-symbols-rounded text-slate-300 text-[80px]"> delete</i>    
      <p className='mt-9 text-[20px] text-gray-400'>No notes in Recycle Bin</p>
      </div>
    </div>
  )
}

export default Bin
