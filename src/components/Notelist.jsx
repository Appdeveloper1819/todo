import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes } from "../redux/actions/notesActions";

const Notelist = () => {
  const notes = useSelector((state) =>
    Array.isArray(state.notes?.notes) ? state.notes.notes : []
  );

  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [showDropdownId, setShowDropdownId] = useState(null);
  const [selectnote, setSelectNote] = useState([]);


  const handleExpand = (noteId) => {
    setExpandedNoteId(expandedNoteId === noteId ? null : noteId);
    setShowDropdownId(null); 
  };

  const toggleDropdown = (noteId) => {
    setShowDropdownId(showDropdownId === noteId ? null : noteId);
  };

  const toggleSelect = (noteId) => {
    setSelectNote((prevSelected) =>
      prevSelected.includes(noteId)
        ? prevSelected.filter((id) => id !== noteId)
        : [...prevSelected, noteId]
    );
    console.log("Toggled selection for note:", noteId);
  };
  

  const dispatch = useDispatch();

const handleDeleteNote = (noteId) => {
  dispatch(deleteNotes(noteId)); 
  console.log("Deleted note with ID", noteId);
};


  const toolbarItems = [
    {icon: "keep"},
    {icon: "palette"},
    {icon: "add_alert"},
    {icon: "archive"},
    {icon: "more_vert"},
  ];
  

  return (
    <>
    <div className="p-4">
      {selectnote.length > 0 && (
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 shadow px-4 py-2 mb-4 rounded-md max-w-md mx-auto">
          <span className="text-sm text-gray-700 dark:text-white">
            {selectnote.length} selected
          </span>
          <div className="flex space-x-4 text-gray-500 dark:text-gray-300">
            {toolbarItems.map((toolbarItems , index) => (
              <i
                key={toolbarItems.icon+index} 
                className="material-symbols-rounded cursor-pointer hover:text-blue-500">
                {toolbarItems.icon}
              </i>
            ))}
          </div>
        </div>
      )}
      {notes.length === 0 ? (
        <p className="text-gray-600 text-center ">No notes yet.</p>
      ) : (
        notes.map((note) => (
          <div
            key={note.id}
            onMouseEnter={() => handleExpand(note.id)}
            onMouseLeave={() => handleExpand(null)}
            className="cursor-pointer bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-4 max-w-md mx-auto transition duration-300 hover:shadow-lg">
              {expandedNoteId === note.id && (
              <div className=" float-left text-gray-500 dark:text-gray-400">
              <i className={`material-symbols-rounded ${selectnote.includes(note.id) ? 'text-blue-400' : 'text-gray-400'}`} onClick={(e) => {
                toggleSelect(note.id);
                e.stopPropagation();
              }}>check_circle</i>
              </div>
              )}
              {expandedNoteId === note.id && (
             <div className="flex float-right text-gray-500 dark:text-gray-400">
              <i className="material-symbols-rounded flex right-4">keep</i>
              </div>
              )}
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
            {expandedNoteId === note.id && (
              <div className="flex flex-row space-x-4 mt-2">
                <i className="material-symbols-rounded">palette</i>
                <i className="material-symbols-rounded">notifications</i>
                <i className="material-symbols-rounded">person_add</i>
                <i className="material-symbols-rounded">image</i>
                <i className="material-symbols-rounded">archive</i>
                <div className="relative">
                  <i
                    className="material-symbols-rounded cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(note.id);  
                    }}>
                    more_vert
                  </i>
                  {showDropdownId === note.id && (
                   <div className="absolute mt-2 w-48 right-0 left-0 -translate-x-3/4 sm:left-0 sm:translate-x-0 bg-white rounded-md shadow-lg dark:bg-gray-800 z-10">
                      <ul className="py-2 text-gray-700 dark:text-white">
                        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={(e) => {
                          // e.stopPropagation();
                          handleDeleteNote(note.id);
                        }}>Delete note</li>
                        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Add label</li>
                        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Add drawing</li>
                        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Show tick boxes</li>
                        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Make a copy</li>
                        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Copy to Google Docs</li>
                        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Version history</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default Notelist;
