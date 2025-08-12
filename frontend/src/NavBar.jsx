import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-lg font-bold">HOTEL</div>
        <ul className="flex space-x-4 font-bold">
          <li>
            <Link to="/main/rooms" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/main/contact" className="hover:text-gray-200">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
