import React, { useState } from "react";
import { FaHome, FaStar } from 'react-icons/fa';
import { Link, useLocation } from "react-router-dom";

// Example icons

function NavBar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="flex items-center justify-evenly bg-gradient-to-r from-indigo-500 to-purple-500 w-4/5 mx-auto p-2 rounded-lg">
      <Link
        to={"/"}
        className={`flex items-center text-2xl ${
          activeLink === "/" ? "text-yellow-300" : "text-white"
        } hover:text-yellow-500 transition-all`}
        onClick={() => handleLinkClick("/")}
      >
        <FaHome className="mr-2" /> Home
      </Link>
      <Link
        to={"/Fav"}
        className={`flex items-center text-2xl ${
          activeLink === "/Fav" ? "text-yellow-300" : "text-white"
        } hover:text-yellow-500 transition-all`}
        onClick={() => handleLinkClick("/Fav")}
      >
        <FaStar className="mr-2" /> Favourites
      </Link>
    </div>
  );
}

export default NavBar;