import "./Navbar.css";
import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";

export default function Navbar({ handleLogout, user }) {
  return (
    <nav className="Navbar">
      <div className="navWrapper">
        <div className="activities">
          <Link to="/">
            <a>
              <img
                className="logo"
                src="https://i.imgur.com/QKbfRZI.png"
                alt="codepath-logo"
              ></img>
            </a>
          </Link>
          <Link to="/me">
            <a className="activity">Activity</a>
          </Link>
          <Link to="/exercise">
            <a className="activity">Exercise</a>
          </Link>
          <Link to="/nutrition">
            <a className="activity">Nutrition</a>
          </Link>
          <Link to="/sleep">
            <a className="activity">Sleep</a>
          </Link>
        </div>
        {user?.email ? (
          <Link to="/">
            <button
              className="registerBtn"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Link>
        ) : (
          <div className="loginAndRegisterBtns">
            <a className="login">
              <Link to="/login">
                <button className="loginBtn" type="button">
                  Sign In
                </button>
              </Link>
            </a>
            <a className="register">
              <Link to="/register">
                <button className="registerBtn" type="button">
                  Register
                </button>
              </Link>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
