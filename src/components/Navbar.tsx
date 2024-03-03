import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { SearchComponent } from './SearchComponent';

const links = [
  { to: "/", label: "Home" },
  { to: "/channels", label: "Channel" },
  { to: "/programs", label: "Program" },
  { to: "/myPage", label: "My Page" },
  { to: "/login", label: "Sign in" },
];

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  // const handleSearch = (query: string) => {
  //   console.log('Search query:', query);
 
  // };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };


  return (
    <nav className="bg-blue-600 p-6 flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center space-x-2 mb-4 sm:mb-0">
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Logo-de-World-Hits-Radio.png" alt="Radio logo" className="h-8 w-8" />
        <span className="text-white text-xl font-semibold tracking-tight">Sveriges Radio</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center space-x-4">
        <div className="space-x-4">
          {links.map((link) => (
            <Link to={link.to} className="text-white hover:text-blue-300 mb-2 sm:mb-0" key={link.to}>
              {link.label}
            </Link>
          ))}
        </div>
        <div>
          {/* <input
            type="text"
            placeholder="Sök på Sveriges Radio..."
            className="rounded py-2 px-4 text-gray-700 bg-white border-2 border-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
            // onChange={(event) => setSearch(event.target.value)}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          /> */}
          {/* <SearchComponent onSearch={handleSearch} /> */}
          <input
            type="text"
            placeholder="Sök på Sveriges Radio..."
            className="rounded py-2 px-4 text-gray-700 bg-white border-2 border-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <SearchComponent searchQuery={searchQuery} />
        </div>
      </div>
    </nav>
  );
}
