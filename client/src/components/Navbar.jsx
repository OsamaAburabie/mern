import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Navbar.css";
function Navbar() {
  const { isLoggedIn, role, username } = useContext(AuthContext);

  const logout = async () => {
    localStorage.setItem("auth-token", "");
    window.location = "/login";
  };
  return (
    <nav>
      <div className="nav__logo">
        <Link className="logo_link" to="/">
          ABC
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="auth__buttons">
          <Link to="/profile">
            <button className="nav__btn transparent">{username}</button>
          </Link>

          {role === "admin" && (
            <Link to="/admin/manageTickits">
              <button className="nav__btn">Dashboard</button>
            </Link>
          )}
          <button className="nav__btn red" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="auth__buttons">
          <Link to="/login">
            <button className="nav__btn">Login</button>
          </Link>
          <Link to="/register">
            <button className="nav__btn">Sign up</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
