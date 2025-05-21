import React from "react";
import "./App.css";

const Card = ({ item }) => {
  return (
    <div className="card">
      <h2>Title: {item.title}</h2>
      <h3>Object Class: {item.object_class}</h3>

      {/* Display Image */}
      {item.image && (
        <img
          src={item.image}
          alt={item.title || "SCP Image"}
          className="scp-image"
        />
      )}

      {/* Special Containment Procedures */}
      <h3>Special Containment Procedures:</h3>
      <p>{item.special_containment_procedures}</p>

      {/* Description */}
      <h3>Description:</h3>
      <p>{item.description}</p>
    </div>
  );
};

export default Card;