import React, { useState } from "react";
import "./App.css";

const Navbar = ({ data, onSelect, onNavigate, onLoginClick, session, onLogout }) => { // Navbar component to display menu items
  const [isOpen, setIsOpen] = useState(false); // State to track menu visibility

  const toggleMenu = () => setIsOpen(!isOpen); // Toggle menu visibility
  const handleSelect = (item) => { // Handle item selection
    onSelect(item); // Pass selected item to parent component
    setIsOpen(false); // Close menu after selection
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <button onClick={() => onSelect(null)} className="navbar-btn">HOME</button>
        <button onClick={() => onNavigate("create")} className="navbar-btn">CREATE</button>
        {/*<button onClick={() => window.location.href = "/SCP_app/"} className="navbar-btn">Home</button>*/}
        <button onClick={toggleMenu} className="navbar-btn">MENU ☰</button>
        {session ? (
          <button onClick={onLogout} className="navbar-btn">LOGOUT</button>
        ) : (
          <button onClick={onLoginClick} className="navbar-btn">LOGIN</button>
        )}
      </div>

      {isOpen && ( // Render menu items if menu is open
        <ul className="nav-menu">
          {[...data] // Spread operator to create a new array from data
            .sort((a, b) => a.id - b.id) // Sort data by ID
            .map((item, index) => ( // Map through data to create menu items
              <li key={index}>
                <button onClick={() => handleSelect(item)}>{item.title}</button> {/* Display item title */}
              </li>
            ))}
        </ul>
      )}
    </nav>
  );
};
/*<button onClick={() => window.location.href = "/SCP_app/"}>Home</button>*/
export default Navbar;