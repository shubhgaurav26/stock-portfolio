import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-black text-white shadow-lg py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-orange-500">
          Stock Portfolio Tracker
        </h1>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-lg text-white hover:text-green-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="text-lg text-white hover:text-green-400 transition duration-300"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/holdings"
              className="text-lg text-white hover:text-green-400 transition duration-300"
            >
              Holdings
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
