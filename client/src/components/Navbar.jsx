import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')||'null');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if(!user) return null;

  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="font-bold text-lg">NITC Inventory</Link>
          <Link to="/equipment" className="text-sm text-gray-600">Catalog</Link>

          {user.role !== 'user' && (
            <Link to="/add" className="text-sm text-gray-600">Add Equipment</Link>
          )}

          {(user.role === 'lab-incharge' || user.role === 'admin') && (
            <Link to="/complaints" className="text-sm text-gray-600">Complaints</Link>
          )}

          {user.role === 'user' && (
            <Link to="/complaints" className="text-sm text-gray-600">My Complaints</Link>
          )}

          {user.role === 'admin' && (
            <>
              <Link to="/approvals" className="text-sm text-gray-600">Approvals</Link>
              <Link to="/users" className="text-sm text-gray-600">Users</Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm">{user.name || user.email}</div>
          <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
        </div>
      </div>
    </nav>
  );
}
