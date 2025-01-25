import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User } from 'lucide-react'; 
import { AuthContext } from '../contexts/AuthContext';
import { NotificationContext } from '../contexts/NotificationContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { notifications } = useContext(NotificationContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold">ProjectTeamCollab</Link>
        <div className="flex space-x-4">
          <Link to="/search" className="text-white hover:text-gray-300">Search</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
              <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
              <div className="relative">
                <Bell className="text-white" />
                {notifications && notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">{notifications.filter(n => !n.isRead).length}</span>
                )}
              </div>
              <Link to={`/users/${user._id}`}><User className="text-white" /></Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;