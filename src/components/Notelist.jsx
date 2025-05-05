import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes, updateImageUpload } from "../redux/actions/notesActions";
import Navlist from "./Navlist";

const Notelist = () => {
  const notes = useSelector((state) =>
    Array.isArray(state.notes?.notes) ? state.notes.notes : []
  );

  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [showDropdownId, setShowDropdownId] = useState(null);
  const [selectnote, setSelectNote] = useState([]);

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

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
  };

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNotes(noteId));
    setSelectNote((prevSelected) =>
      prevSelected.filter((id) => id !== noteId)
    );
  };

  const handleImageUpload = (e, noteId) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result;
      dispatch(updateImageUpload(noteId, imageDataUrl));
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <nav>
        <Navlist selectnote={selectnote} setSelectNote={setSelectNote} />
      </nav>

      <div className="p-4">
        {notes.length === 0 ? (
          <p className="text-gray-600 text-center">No notes yet.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              onMouseEnter={() => handleExpand(note.id)}
              onMouseLeave={() => handleExpand(null)}
              className="cursor-pointer bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-4 max-w-md mx-auto transition duration-300 hover:shadow-lg"
            >
              {expandedNoteId === note.id && (
                <div className="float-left text-gray-500 dark:text-gray-400">
                  <i
                    className={`material-symbols-rounded ${
                      selectnote.includes(note.id)
                        ? "text-blue-400"
                        : "text-gray-400"
                    }`}
                    onClick={() => toggleSelect(note.id)}
                  >
                    check_circle
                  </i>
                </div>
              )}

              {expandedNoteId === note.id && (
                <div className="flex float-right text-gray-500 dark:text-gray-400">
                  <i className="material-symbols-rounded">keep</i>
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

              {Array.isArray(note.item) && (
                <div className="mt-2 space-y-2">
                  {note.item.map((itemText, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-500"
                      />
                      <span className="text-gray-800 dark:text-white">
                        {itemText}
                      </span>
                    </div>
                  ))}
                </div>
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
                  <div>
                    <i
                      className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300"
                      onClick={() => fileInputRef.current.click()}
                    >
                      image
                    </i>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => handleImageUpload(e, note.id)}
                    style={{ display: "none" }}
                    className="hidden"
                  />
                  <i className="material-symbols-rounded">archive</i>

                  <div className="relative">
                    <i
                      className="material-symbols-rounded cursor-pointer"
                      onClick={() => toggleDropdown(note.id)}
                    >
                      more_vert
                    </i>

                    {showDropdownId === note.id && (
                      <div className="absolute mt-2 w-48 right-0 left-0 -translate-x-3/4 sm:left-0 sm:translate-x-0 bg-white rounded-md shadow-lg dark:bg-gray-800 z-10">
                        <ul className="py-2 text-gray-700 dark:text-white">
                          <li
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleDeleteNote(note.id)}
                          >
                            Delete note
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Add label
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Add drawing
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Show tick boxes
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Make a copy
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Copy to Google Docs
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Version history
                          </li>
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
