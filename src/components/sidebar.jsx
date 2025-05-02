import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addLabel } from "../redux/actions/notesActions";

const Sidebar = ({ showSearch }) => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [labels, setLabels] = useState([]);
  const [lableInput, setLabelInput] = useState("");
  const [hover, setHover] = useState(null);
  const editRef = useRef(null);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleEditPopup = () => {
    setShowEditPopup(!showEditPopup);
  };


  const handleClickOutside = (e) => {
    if (editRef.current && !editRef.current.contains(e.target)) {
      setShowEditPopup(false);
    }
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
      setLabelInput("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addNewLabel = (newLabel) => {
    dispatch(addLabel(newLabel));
    setLabels((prev) => [...prev, newLabel]);
    setLabelInput("");
  };

  const handleSaveLabel = () => {
    const trimmed = lableInput.trim();
    if (!trimmed) return;
    addNewLabel(lableInput.trim());
    setShowEditPopup(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && lableInput.trim() !== "") {
      e.preventDefault();
      addNewLabel(lableInput.trim());
      setShowEditPopup(true);
    }
  };

  return (
    <>
      {!showSearch && (
        <button
          className="sm:hidden fixed top-4 left-2 bg-gray-300 dark:bg-gray-700 rounded-full shadow-lg z-[100]"
          onClick={toggleSidebar}
        >
          <i className="material-symbols-rounded text-gray-600 dark:text-gray-300">
            menu
          </i>
        </button>
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-gray-300 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex flex-col py-4 px-2 transition-all duration-300 z-50
        ${isSidebarOpen ? "w-48" : "w-12"}
        ${isSidebarOpen ? "sm:w-48" : "sm:flex sm:w-12 hidden "}`}
      >
        <div className="flex items-center justify-between w-full">
          <button
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500"
            onClick={toggleSidebar}
          >
            <i className="material-symbols-rounded">menu</i>
          </button>
          {isSidebarOpen && (
            <div className="flex items-center space-x-2 mr-6">
              <i className="material-symbols-rounded text-lg">task</i>
              <span className="text-lg font-semibold">Short Notes</span>
            </div>
          )}
        </div>

        <div className="mt-5 space-y-4">
          <Link to="/"  className="flex items-center space-x-2 hover:text-orange-500">
            <i className="material-symbols-rounded">home</i>
            {isSidebarOpen && <span>Home</span>}
          </Link>
          <Link to="/Notes" className="flex items-center space-x-2 hover:text-orange-500">
            <i className="material-symbols-rounded">lightbulb_2</i>
            {isSidebarOpen && <span>Notes</span>}
          </Link>
          <Link to="/reminders" className="flex items-center space-x-2 hover:text-orange-500">
            <i className="material-symbols-rounded">notifications</i>
            {isSidebarOpen && <span>Reminders</span>}
          </Link>
          <div className="flex items-center space-x-2 hover:text-orange-500 cursor-pointer"
            onClick={toggleEditPopup}>
            <i className="material-symbols-rounded">edit</i>
            {isSidebarOpen && <span>Edit Label</span>}
          </div>
          <Link to="/archive" className="flex items-center space-x-2 hover:text-orange-500">
            <i className="material-symbols-rounded">archive</i>
            {isSidebarOpen && <span>Archive</span>}
          </Link>
          <Link to="/bin" className="flex items-center space-x-2 hover:text-orange-500">
            <i className="material-symbols-rounded">delete</i>
            {isSidebarOpen && <span>Bin</span>}
          </Link>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 sm:hidden z-30"
          onClick={toggleSidebar}></div>
      )}

      {showEditPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-0">
          <div
            ref={editRef}
            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 max-w-xs sm:max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Edit Labels
            </h2>
            <div className="relative flex items-center">
              <i
                className="material-symbols-rounded text-gray-500 cursor-pointer mr-2"
                // onClick={() => setLabelInput("")}
              >
                {lableInput ? "close" : "add"}
              </i>
                <input
                  type="text"
                  placeholder="Create new label"
                  value={lableInput}
                  onChange={(e) => setLabelInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full border-b border-gray-400 dark:border-gray-600 outline-none p-2 mb-4 bg-transparent text-gray-900 dark:text-white"
                />
              {lableInput && (
                <i className="material-symbols-rounded text-green-500 cursor-pointer ml-2">
                  check
                </i>
              )}
            </div>

            <div className="mt-4">
              {labels.length > 0 && (
                <ul className="text-gray-800 dark:text-gray-200">
                  {labels.map((label, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between mb-2">
                      <i
                        className="material-symbols-rounded mr-2 text-gray-500 cursor-pointer"
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(null)}
                        >
                        {hover === index ? "delete" : "label"}
                      </i>
                      <span className="flex-grow">{label}</span>
                      <i
                        className="material-symbols-rounded ml-2 text-gray-500 hover:text-red-500 cursor-pointer">
                        edit
                      </i>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded sm:w-auto"
                onClick={toggleEditPopup}>
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded text-white sm:w-auto ${
                  lableInput ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!lableInput}
                onClick={handleSaveLabel}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
