import React from "react";
import ReactDOM from "react-dom/client";  // Import ReactDOM for rendering
import App from "./App";  // Import the main App component

document.addEventListener("DOMContentLoaded", () => {  // Ensure the DOM is fully loaded before rendering
    const rootElement = document.getElementById("root");  // Get the root element where the React app will be mounted

    if (rootElement) {  // Check if the root element exists
        const root = ReactDOM.createRoot(rootElement);  // Create a root for React 18+ rendering
        root.render(<React.StrictMode><App /></React.StrictMode>);  // Render the App component inside the root element
    } else {
        console.error("Root element not found. Make sure <div id='root'></div> exists in index.html.");  // Log an error if the root element is not found
    }
});

