import "./ActivityPage.css";
import { useNavigate } from "react-router-dom";

export default function ActivityPage({ user, setAppState }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/sleep");
  };

  return user?.email ? (
    <div className="activityHub">
      <h3>Welcome {user?.username}</h3>
      <h3>Where would you like to go</h3>
      <span>
        <button type="button" onClick={handleClick}>
          Sleep
        </button>
        <button type="button">Nutrition</button>
        <button type="button">Exercise</button>
      </span>
    </div>
  ) : (
    <h1>
      <b>Login to see your data</b>
    </h1>
  );
}
