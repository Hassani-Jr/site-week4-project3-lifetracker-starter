import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
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
          <a className="activity">Activity</a>
          <a className="activity">Exercise</a>
          <a className="activity">Nutrition</a>
          <a className="activity">Sleep</a>
        </div>
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
      </div>
    </nav>
  );
}
