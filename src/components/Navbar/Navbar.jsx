import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-around items-center h-16 bg-blue-500 text-white">
      <div className="logo text-2xl font-bold">Todo</div>
      <ul className="nav-right flex gap-20 text-xl">
        <li className="hover:font-bold cursor-pointer transition-all">Home</li>
        <li className="hover:font-bold cursor-pointer transition-all">About</li>
      </ul>
    </nav>
  );
};

export default Navbar;
