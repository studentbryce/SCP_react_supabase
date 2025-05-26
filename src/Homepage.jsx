import React from "react";
import "./App.css";  // Import CSS for styling

// Card component to display individual SCP items
const Homepage = ({ data, onSelect }) => {
  return (
    <div className="homepage">
      {[...data]  // Spread operator to create a new array from data
        .sort((a, b) => a.id - b.id)  // Sort data by ID
        .map((item, index) => (  // Map through data to create homepage items
          <div key={index} className="homepage-item" onClick={() => onSelect(item)}>  {/* Handle item selection */ }
            {item.image && (  // Display Image if available
              <img
                src={item.image}
                alt={item.title || "SCP Image"}
                className="homepage-image"
              />
            )}
            <h2>{item.title}</h2>  {/* Display item title */}
          </div>
        ))}
    </div>
  );
};

export default Homepage;