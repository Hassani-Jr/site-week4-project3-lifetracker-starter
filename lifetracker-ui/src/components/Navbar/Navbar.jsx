import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="Navbar">
      <div className="navWrapper">
        <div className="activities">
          <Link to="/">
            <a className="logo">
              <img src="codepath-f1b3e41a.svg" alt="codepath-logo"></img>
            </a>
          </Link>
          <a className="activity">Activity</a>
          <a className="activity">Exercise</a>
          <a className="activity">Nutrition</a>
          <a className="activity">Sleep</a>
        </div>
        <div className="loginAndRegisterBtns">
          <a className="login">
            <button className="loginBtn" type="button">
              Sign In
            </button>
          </a>
          <a className="register">
            <Link to="/register">
              <button className="registerBtn" type="button">
                Register
              </button>
            </Link>
          </a>
        </div>
      </div>
    </nav>
  );
}
