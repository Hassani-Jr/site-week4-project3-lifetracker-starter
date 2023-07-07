import "./Tile.css";
import Athlete from "../../assets/athlete.jpg";
import Alarm from "../../assets/alarm.jpg";
import Calendar from "../../assets/calendar.jpg";
import Food from "../../assets/food.jpg";

export default function Tile() {
  return (
    <div className="homeTiles">
      <div className="homeTile">
        <div className="Tile">
          <img src={Athlete}></img>
        </div>
        <div className="Tile">
          <img src={Alarm}></img>
        </div>
        <div className="Tile">
          <img src={Calendar}></img>
        </div>
        <div className="Tile">
          <img src={Food}></img>
        </div>
      </div>
    </div>
  );
}
