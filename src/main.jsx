import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'  // Import createRoot from react-dom/client for React 18+ rendering
import './App.css'  // Import global CSS styles
import App from './App.jsx'  // Import the main App component

createRoot(document.getElementById('root')).render(  // Create a root for React 18+ rendering and mount the App component
  <StrictMode>
    <App />  {/* Render the App component inside StrictMode for additional checks and warnings in development */ }
  </StrictMode>,
)
