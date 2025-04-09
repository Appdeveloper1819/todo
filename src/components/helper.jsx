import React, { useRef, useState, useEffect } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../redux/actions/notesActions"; 
import Notelist from "./Notelist";

const NoteInput = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [image, setImage] = useState(null);
  const [showdropdown, setShowDropDown] = useState(false);
  const [showdrop, setShowdrop] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");

  const dropdownRef = useRef(null);
  const noteRef = useRef(null);

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes?.notes ?? []);
  console.log("Current notes:", notes);



  // Image upload handler
  const ImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const toggledropdown = () => setShowDropDown(!showdropdown);
  const toggledrop = () => setShowdrop(!showdrop);

  const handleclickoutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropDown(false);
      setShowdrop(false);
    }
    if (noteRef.current && !noteRef.current.contains(e.target)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleclickoutside);
    return () => document.removeEventListener("mousedown", handleclickoutside);
  }, []);

  const handleNoteSubmit = () => {
    if (!noteText.trim() && !noteTitle.trim() && !image) return;

    const newNote = {
      title: noteTitle,
      content: noteText,
      id: Date.now(),
      image: image,
      timestamp: new Date().toISOString(),
    };
    console.log("Dispatching note:", newNote);
    dispatch(addNote(newNote));

    // Reset input
    setNoteText("");
    setNoteTitle("");
    setImage(null);
    setIsExpanded(false);
  };  

  return (
    <>
      <Navbar />
      <Sidebar />
      
      <div className="flex flex-col items-center mt-5 px-4 sm:px-0">
        <div
          className="w-full max-w-sm sm:max-w-md bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white 
                     p-4 rounded-xl shadow-lg border border-gray-700 transition-all duration-300" ref={noteRef}
        >
          {isExpanded && (
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)} 
              placeholder="Title"
              className="w-full bg-transparent text-lg font-semibold outline-none mb-2 text-gray-800 dark:text-white" />
          )}
          <div onClick={() => setIsExpanded(true)} className="relative flex flex-col">
            <textarea
              type="text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value
              )}
              placeholder="Take a note..."
              className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
            />
            {image && <img src={image} alt="Note" className="mt-2 rounded w-full" />}
            {!isExpanded && (
              <div className="absolute flex right-2 bottom-2 space-x-2 text-gray-950 dark:text-white">
                <i className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300">
                  check_box
                </i>
                <i className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300">
                  brush
                </i>
                <label htmlFor="image-upload">
                  <i className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300">
                    image
                  </i>
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={ImageUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>
          {isExpanded && (
            <>
              <div className="flex flex-wrap justify-between items-center mt-4 text-gray-950 dark:text-white">
                <div className="flex flex-wrap gap-2">
                  <i className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300">
                    palette
                  </i>
                  <div className="relative sm:mt-0" ref={dropdownRef}>
                    <i
                      className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300"
                      onClick={toggledrop}
                    >
                      notifications
                    </i>
                    {showdrop && (
                      <div className="absolute left-0 sm:right-0 mt-2 w-48 sm:w-64 bg-white dark:bg-gray-800 
                                      rounded-md shadow-lg z-50">
                        <ul className="py-2 text-gray-700 dark:text-white">
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Remind me later</li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Saved in Google reminders</li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Later today</li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Tomorrow</li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Next Week</li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Select date and time</li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Select place</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <i className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300">
                    person_add
                  </i>

                  <label htmlFor="image-upload">
                    <i className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300">
                      image
                    </i>
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={ImageUpload}
                    className="hidden"
                  />

                  <i className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300">
                    archive
                  </i>
                  <div className="relative" ref={dropdownRef}>
                    <i
                      className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300"
                      onClick={toggledropdown}
                    >
                      more_vert
                    </i>
                    {showdropdown && (
                      <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                        <ul className="py-2 text-gray-700 dark:text-white">
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Add label</li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Add drawing</li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Show tick boxes</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <i className="material-symbols-rounded cursor-pointer opacity-50">undo</i>
                  <i className="material-symbols-rounded cursor-pointer opacity-50">redo</i>
                  
                  <button
                  onClick={handleNoteSubmit}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Save
                </button>
                </div>
                <button onClick={() => setIsExpanded(false)} className="text-gray-950 dark:text-white hover:text-slate-500 dark:hover:text-gray-300 mt-2 sm:mt-0">
                  Close
                </button>
              </div>
            </>
          )}
        </div>
        <Notelist />
      </div>
    </>
  );
};
export default NoteInput;

