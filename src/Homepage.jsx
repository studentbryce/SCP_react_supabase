import React from "react";
import "./App.css";

const Homepage = ({ data, onSelect }) => {
  return (
    <div className="homepage">
      {[...data]
        .sort((a, b) => a.id - b.id)
        .map((item, index) => (
          <div key={index} className="homepage-item" onClick={() => onSelect(item)}>
            {item.image && (
              <img
                src={item.image}
                alt={item.title || "SCP Image"}
                className="homepage-image"
              />
            )}
            <h2>{item.title}</h2>
          </div>
        ))}
    </div>
  );
};

export default Homepage;