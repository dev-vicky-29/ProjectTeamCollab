import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User } from 'lucide-react'; 
import { AuthContext } from '../contexts/AuthContext';
import { NotificationContext } from '../contexts/NotificationContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { notifications } = useContext(NotificationContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">ProjectTeamCollab</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/search" className="nav-link">Search</Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link btn btn-link text-white">Logout</button>
                </li>
                <li className="nav-item position-relative">
                  <Bell className="nav-link text-white" />
                  {notifications && notifications.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {notifications.filter(n => !n.isRead).length}
                    </span>
                  )}
                </li>
                <li className="nav-item">
                  <Link to={`/users/${user._id}`} className="nav-link">
                    <User className="text-white" />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;