import { useContext } from 'react';
import { Context } from '../../context/Context';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './topbar.css';

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, dispatch } = useContext(Context);
  const location = useLocation();

  const PF = 'http://localhost:5000/images/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className={`topCenter ${isMenuOpen ? 'mobileMenu' : ''}`}>
        <ul className="topList">
          <li
            className={`topListItem ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li
            className={`topListItem ${isActive('/about') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li
            className={`topListItem ${isActive('/contact') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </li>
          <li
            className={`topListItem ${isActive('/write') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && (
            <li
              className="topListItem"
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
            >
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={user.profilePic ? PF + user.profilePic : PF + 'profile.jpg'}
              alt={user.username}
            />
          </Link>
        ) : (
          <ul className="topList myTopList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <i className="topSearchIcon fas fa-search"></i>
        <div className="hamburger" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </div>
    </div>
  );
}
