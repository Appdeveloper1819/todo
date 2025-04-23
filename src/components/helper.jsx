import React, { useRef, useState, useEffect } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../redux/actions/notesActions";
import Notelist from "./Notelist";
import { updateImageUpload } from "../redux/actions/notesActions";

const NoteInput = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [image, setImage] = useState(null);
  const [showdropdown, setShowDropDown] = useState(false);
  const [showdrop, setShowdrop] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteItem, setNoteItem] = useState("");
  const [ischeck, setIsCheck] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const dropdownRef = useRef(null);
  const noteRef = useRef(null);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes?.notes ?? []);
  console.log("Current notes:", notes);

// image handle
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


  const toggledropdown = () => setShowDropDown(!showdropdown);
  const toggledrop = () => setShowdrop(!showdrop);
  const togglecheck = () => setIsCheck(!ischeck);

  const handleclickoutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropDown(false);
      setShowdrop(false);
    }
    if (noteRef.current && !noteRef.current.contains(e.target)) {
      // handleNoteSubmit();
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleclickoutside);
    return () => document.removeEventListener("mousedown", handleclickoutside);
  }, []);

  const handleNoteSubmit = () => {
    // if (!noteText.trim() && !noteTitle.trim() && !image) return;

    
    const newNote = {
      id: Date.now(),
      title: noteTitle,
      content: noteText,
      item: noteItem,
      image: image,
      timestamp: new Date().toISOString(),
    };
    console.log("Dispatching note:", newNote);
    dispatch(addNote(newNote));

    // Reset input
    setNoteText("");
    setNoteTitle("");
    setNoteItem("");
    setImage("");
    setIsExpanded(false);
  };

  const newNote = () => {
    if (!noteItem.trim()) return;
    
    const newChecklistNote = {
      id: Date.now(),
      title: "", 
      content: "", 
      item: noteItem.trim(),
      image: "",
      timestamp: new Date().toISOString(),
    };
  
    dispatch(addNote(newChecklistNote));
    setNoteItem("");
  };
  

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="flex flex-col items-center mt-5 px-4 sm:px-0">
        <div
          className="w-full max-w-sm sm:max-w-md bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white 
                     p-4 rounded-xl shadow-lg border border-gray-700 transition-all duration-300"
          ref={noteRef}
        >
          {isExpanded && (
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Title"
              className="w-full bg-transparent text-lg font-semibold outline-none mb-2 text-gray-800 dark:text-white"
              onKeyDown= {(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleNoteSubmit();
                }
              }}
            />
          )}
          <div
            onClick={() => setIsExpanded(true)}
            className="relative flex flex-col"
          >
            <textarea
              type="text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Take a note..."
              className="w-full bg-transparent outline-none text-gray-800 dark:text-white resize-none"
              // onKeyDown= {(e) => {
              //   if (e.key === "Enter") {
              //     e.preventDefault();
              //     handleNoteSubmit();
              //   }
              // }}
            />
            <div>
              <i className="material-symbols-rounded cursor-pointer">
                drag_indicator
              </i>
              <i
                className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300"
              >
                {inputFocused ? "check_box_outline_blank" : "add"}
              </i>
              <input
                type="text"
                placeholder="Add New Item"
                value={noteItem}
                onChange={(e) => setNoteItem(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => {setInputFocused(false);
                  newNote();
                }}
                onKeyDown= {(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    newNote();
                  }
                }}
                
                className="bg-transparent outline-none text-gray-800 dark:text-white absolute ml-2"
              />
              <i className="material-symbols-rounded cursor-pointer float-end">
                {inputFocused ? "close" : ""}
              </i>
            </div>
            {image && (
              <img src={image} alt="Note" className="mt-2 rounded w-full" />
            )}
            {!isExpanded && (
              <div className="absolute flex right-2 bottom-2 space-x-2 text-gray-950 dark:text-white">
                <div>
                  <i
                    className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300"
                    onClick={togglecheck}
                  >
                    check_box
                  </i>
                </div>
                <i className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300">
                  brush
                </i>
                <i
                  className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300"
                  onClick={() => fileInputRef.current.click()}
                >
                  image
                </i>
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
                      <div
                        className="absolute left-0 sm:right-0 mt-2 w-48 sm:w-64 bg-white dark:bg-gray-800 
                                      rounded-md shadow-lg z-50"
                      >
                        <ul className="py-2 text-gray-700 dark:text-white">
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Remind me later
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Saved in Google reminders
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Later today
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Tomorrow
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Next Week
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Select date and time
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Select place
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <i className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300">
                    person_add
                  </i>
                  <i
                    className="material-symbols-rounded cursor-pointer hover:text-slate-500 dark:hover:text-gray-300"
                    onClick={() => fileInputRef.current.click()}
                  >
                    image
                  </i>

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
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Add label
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Add drawing
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Show tick boxes
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <i className="material-symbols-rounded cursor-pointer opacity-50">
                    undo
                  </i>
                  <i className="material-symbols-rounded cursor-pointer opacity-50">
                    redo
                  </i>

                  <button
                    onClick={handleNoteSubmit}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-950 dark:text-white hover:text-slate-500 dark:hover:text-gray-300 mt-2 sm:mt-0"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
        <Notelist />
      </div>
    </>
  );
};
export default NoteInput;
