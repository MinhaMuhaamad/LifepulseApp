import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/survey" className="navbar-brand">LifePulse</Link>
      <div className="navbar-right">
        {user && (
          <>
            <span className="navbar-user">👤 {user.name}</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
