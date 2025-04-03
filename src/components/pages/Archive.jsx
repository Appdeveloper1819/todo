import React from "react";
import Sidebar from "../sidebar";
import Navbar from "../navbar";

const Archive = () => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-44">
        <i className="material-symbols-rounded text-slate-300 text-[80px]">archive</i>
        <p className="mt-9 text-[25px] text-gray-600">
          Your archive notes aprear here
        </p>
      </div>
    </div>
  );
};

export default Archive;
