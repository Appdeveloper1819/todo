import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../sidebar';
import Navbar from '../navbar';

const Bin = () => {
  const deletedNotes = useSelector((state) => state.deletedNotes);
  const notesToShow = deletedNotes ?? [];

  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className='flex flex-col text-[20px] italic text-center mt-5'>
        <h3>Notes in the Recycle Bin are deleted after 7 days.</h3>
      </div>

      {notesToShow.length === 0 ? (
        <div className='flex flex-col items-center justify-center mt-44'>
          <i className="material-symbols-rounded text-slate-300 text-[80px]"> delete </i>
          <p className='mt-9 text-[20px] text-gray-400'>No notes in Recycle Bin</p>
        </div>
      ) : (
        <div className="p-4">
          {notesToShow.map((note) => (
            <div key={note.id} className="border p-3 rounded my-2">
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bin;
