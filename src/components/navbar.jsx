import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showdropdown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const [changeicon, setChangeIcon] = useState(false);
  const [darkmode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [isprogress, setIsProgress] = useState(false);
  
  // spin the cloud and refresh
  const toggleisprogress = () => {
    setIsProgress(true);

    setTimeout(() => {
      setIsProgress(false);
    }, 2000);
  };


  // Toggle Dropdown
  const toggledropdown = () => {
    setShowDropDown(!showdropdown);
  };

  // Toggle Icon
  const togglechangeicon = () => {
    setChangeIcon(!changeicon);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newTheme = darkmode ? "light" : "dark";
    setDarkMode(!darkmode);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Apply Dark Mode on Mount
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Handle Click Outside Dropdown
  const handleclickoutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleclickoutside);
    return () => {
      document.removeEventListener("mousedown", handleclickoutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-gray-300 dark:bg-gray-900 shadow flex flex-row px-12 py-2 items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <i className="material-symbols-rounded text-xl sm:text-2xl cursor-pointer dark:text-white">task</i>
          <span className="text-xl sm:text-2xl cursor-pointer dark:text-white">Short Notes</span>
        </div>
        <div className="hidden sm:flex items-center bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg w-1/2">
          <i className="material-symbols-rounded text-gray-600 dark:text-gray-300 cursor-pointer">search</i>
          <input
            type="search"
            placeholder="Search Here"
            className="bg-transparent focus:outline-none px-2 text-gray-700 dark:text-white flex-grow w-full"
          />
        </div>
        <div className="flex space-x-2 items-center">
          <i className="material-symbols-rounded text-gray-600 dark:text-white text-lg sm:text-2xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg sm:hidden"
            onClick={() => setShowSearch(true)}>
            search
          </i>
          <i className={`material-symbols-rounded text-gray-600 dark:text-white text-lg sm:text-2xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full ${isprogress? "animate-spin" : ""}`}
          onClick={toggleisprogress}>
             {isprogress ? "refresh" : "cloud_done"}
          </i>
          <i
            className="material-symbols-rounded text-gray-600 dark:text-white text-lg sm:text-2xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
            onClick={togglechangeicon}
          >
            {changeicon ? "splitscreen" : "grid_view"}
          </i>
          <div className="relative" ref={dropdownRef}>
            <i
              className="material-symbols-rounded text-gray-600 dark:text-white text-lg sm:text-2xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
              onClick={toggledropdown}
            >
              settings
            </i>
            {showdropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                <ul className="py-2 text-gray-700 dark:text-white">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Settings</li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={toggleDarkMode}>
                    {darkmode ? "Disable Dark Theme" : "Enable Dark Theme"}
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Send feedback</li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Help</li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">App downloads</li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Keyboard shortcuts</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
      {showSearch && (
        <div className="fixed top-2 left-11 right-2 bg-gray-100 dark:bg-gray-900 p-2 rounded-lg shadow-md flex items-center">
          <i
            className="material-symbols-rounded text-gray-600 dark:text-white cursor-pointer mr-2"
            onClick={() => setShowSearch(false)}
          >
            arrow_back
          </i>
          <input
            type="search"
            placeholder="Search Here"
            className="bg-transparent focus:outline-none px-2 text-gray-700 dark:text-white flex-grow w-1/2"
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
