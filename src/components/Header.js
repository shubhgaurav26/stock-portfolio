// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav>
        <ul className="flex justify-around space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
          <li><Link to="/holding" className="hover:underline">Holdings</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
