// src/components/Header/Header.jsx
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function Header({ isLoggedIn, onOpenLogin, onSignOut }) {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Easy Budget Shopping App
      </Link>

      <nav className="header__nav">
        <NavLink to="/" className="header__link">
          Home
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink to="/profile" className="header__link">
              Profile
            </NavLink>
            <button className="header__btn" type="button" onClick={onSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="header__btn" type="button" onClick={onOpenLogin}>
            Sign In
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;

