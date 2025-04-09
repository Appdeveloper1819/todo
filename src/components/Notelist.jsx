import React, { useState } from "react";
import { useSelector } from "react-redux";

const Notelist = () => {
  const notes = useSelector((state) =>
    Array.isArray(state.notes?.notes) ? state.notes.notes : []
  );


  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
    <div className="p-4">
      {notes.length === 0 ? (
        <p className="text-gray-600 text-center">No notes yet.</p>
      ) : (
        notes.map((note) => (
          <div
            key={note.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-4 max-w-md mx-auto"
          >
            {note.title && (
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {note.title}
              </h2>
            )}
            {note.content && (
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {note.content}
              </p>
            )}
            {note.image && (
              <img
                src={note.image}
                alt="Note"
                className="rounded w-full max-h-64 object-cover mt-2"
              />
            )}
            <p className="text-xs text-gray-500 mt-2">
              {new Date(note.timestamp).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
    { isExpanded && (
    <div  flex flex-col >
      <i className="material-symbols-rounded ">check_box</i>
    </div>
     )}
    </>
  );
};

export default Notelist;
