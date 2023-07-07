import Hero from "../Hero/Hero";
import { Link } from "react-router-dom";
import "./Home.css";
import Tile from "../Tile/Tile";

export default function Home() {
  return (
    <div className="Home">
      <Hero />
      <Tile />
    </div>
  );
}
