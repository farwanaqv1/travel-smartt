import React from "react";
import { useLocation } from "react-router-dom";
import data from "./Data.json";
import './Detail.css'
export default function Detail() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get("id"));

  const destination = data.featuredDestinations.find(item => item.id === id);

  if (!destination) {
    return <h2 style={{ color: "red", padding: "20px" }}>Destination not found!</h2>;
  }

  return (
    <div className="detail"style={{ padding: "20px", color: "#fff" }}>
      <h1>{destination.name}</h1>
      <img
        src={destination.image}
        alt={destination.name}
        style={{ maxWidth: "100%", borderRadius: "10px", marginBottom: "20px" }}
      />
      <p>{destination.longdesc || destination.description}</p>
    </div>
  );
}
