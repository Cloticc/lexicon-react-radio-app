import { Link } from 'react-router-dom';
import { useState } from 'react';

const links = [
  { to: "/", label: "Home" },
  { to: "/Channel", label: "Channel" },
  { to: "/Program", label: "Program" },
  { to: "/MyPage", label: "My Page" },
  { to: "/Login", label: "Sign in" },
];

export function Navbar() {
  const [search, setSearch] = useState('');

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-600 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Logo-de-World-Hits-Radio.png" alt="Radio logo" className="h-8 w-8 mr-2" />
        <span className="font-semibold text-xl tracking-tight">Swedish Radio</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {links.map((link) => (
            <Link to={link.to} className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-300 mr-4" key={link.to}>
              {link.label}
            </Link>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Search Channel"
            className="bg-white appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
    </nav>
  );
}