import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Helper from "./components/helper";
import Bin from "./components/pages/Bin";
import Archive from "./components/pages/Archive";

const App = () => {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
      <BrowserRouter>
        <Routes>
          <Route
           path="/"
           element={<Home/>}
           />
           <Route
           path="/Notes"
           element={<Helper/>}
           />
            <Route
           path="/reminders"
           element={<Helper/>}
           />
            <Route
           path="/bin"
           element={<Bin />}
           />
            <Route
           path="/archive"
           element={<Archive />}
           />
        </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;
