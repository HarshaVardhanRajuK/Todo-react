import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-around items-center h-20 bg-[#1E0342] text-white">
      <div className="logo text-2xl font-bold">iTask - <span className="text-xl font-semibold">Manage Your Tasks</span></div>
      {/* <ul className="nav-right flex gap-20 text-xl">
        <li className="hover:font-bold cursor-pointer transition-all">Home</li>
        <li className="hover:font-bold cursor-pointer transition-all">About</li>
      </ul> */}
    </nav>
  );
};

export default Navbar;
