import React, { useState, useEffect } from "react";
import "./App.css"; // Import CSS
import Auth from './Auth'; // Import Auth component
import Navbar from "./Navbar"; // Import Navbar
import Header from "./Header"; // Import Header
import Card from "./Card"; // Import Card
import Create from './Create'; // Import Create
import Update from './Update'; // Import Update
import Homepage from "./Homepage"; // Import Homepage
import Footer from "./Footer"; // Import Footer
import { supabase } from './supabaseClient' // Import Supabase client

// Main App component
const App = () => {
  const [session, setSession] = useState(null); // State to hold the auth session
  const [data, setData] = useState([]); // State to hold SCP data
  const [currentView, setCurrentView] = useState("home"); // State to manage current view (home, create, update)
  const [selectedCard, setSelectedCard] = useState(null); // State to hold the selected SCP card
  const [error, setError] = useState(null); // State to hold error messages
  const [showLogin, setShowLogin] = useState(false); // State to control login modal visibility
  const [isUpdating, setIsUpdating] = useState(false); // State to manage update mode

  // Get auth session and listen for auth state changes
  useEffect(() => { 
    const getSession = async () => { 
      const { data, error } = await supabase.auth.getSession();  // Fetch the current session
      setSession(data.session);
    };
    getSession();  // Call the function to get the session

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);  // Update session state on auth state change
    });

    return () => {
      listener?.subscription.unsubscribe();  // Clean up the listener on component unmount to prevent memory leaks
    };
  }, []);

  // Fetch SCP data from Supabase on component mount
  useEffect(() => {
    const fetchData = async () => {
      const { data: scpData, error } = await supabase.from("scp_files").select("*");  // Fetch all SCP records from the database table
      if (error) {
        console.error("Error loading data:", error);  // Log error if fetching data fails
        setError(error.message);
      } else {
        setData(scpData);  // Set the fetched data to state
        setError(null);  // Clear any previous error
      }
    };

    fetchData();  // Call the function to fetch data
  }, []);

  // Handlers for creating, updating, and deleting SCP records
  const handleNewEntry = (newItem) => {
    setData([...data, newItem]); // Add the new item to the existing data
    setSelectedCard(newItem); // Set the newly created item as the selected card
    setCurrentView("home"); // Switch back to home view
  };

  // Handler for updating an existing SCP record
  const handleUpdateComplete = (updatedItem) => {
    const updatedData = data.map(item => item.id === updatedItem.id ? updatedItem : item); // Update the item in the data array
    setData(updatedData);  // Set the updated data to state
    setSelectedCard(updatedItem);  // Set the updated item as the selected card
    setIsUpdating(false);  // Exit update mode
    setCurrentView("home");  // Switch back to home view
  };

  // Handler for deleting an SCP record
  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${selectedCard.title}"?`);  // Confirm deletion with the user
    if (!confirmDelete) return;  // If user cancels, exit the function

    const { error } = await supabase.from("scp_files").delete().eq("id", selectedCard.id);  // Delete the selected item from the database

    if (error) {
      console.error("Error deleting:", error.message);  // Log error if deletion fails
      alert("Failed to delete.");  // Notify user of failure
    } else {
      alert("Deleted successfully.");  // Notify user of successful deletion
      setData(data.filter(item => item.id !== selectedCard.id));  // Remove the deleted item from the local data state
      setSelectedCard(null);  // Clear the selected card
    }
  };

  // Render the main application
  return (
    <div className="container">
      
      {/* Conditional rendering for the login modal */}
      {showLogin && (
        <div className="auth-modal">
          <Auth                       // Auth component for login/signup
            onLogin={(session) => {   // Callback when login is successful
              setSession(session);    // Update session state
              setShowLogin(false);    // Close the login modal
            }}
            onCancel={() => setShowLogin(false)} // Optional cancel handler
          />
        </div>
      )}

      {/* Navbar component for navigation and session management */}
      <Navbar
        data={data}
        onSelect={(item) => {       // Handle item selection from the navbar
          setIsUpdating(false);     // Reset update mode
          setSelectedCard(item);    // Set the selected card
          setCurrentView("home");   // Switch to home view
        }}
        onNavigate={(view) => {     // Handle navigation to different views
          setIsUpdating(false);     // Reset update mode
          setCurrentView(view);     // Set the current view
        }}
        onLoginClick={() => setShowLogin(true)}  // Show login modal when login button is clicked
        session={session}                  // Pass the current session to the Navbar
        onLogout={async () => {            // Logout handler
          await supabase.auth.signOut();   // Sign out from Supabase
          setSession(null);                // Clear session state
        }}                                 
      />

      <Header />  {/* Header component for the application title and description */}

      {/* Display error messages if any */}
      {error && <div className="error-message">{error}</div>}

      {/* Main content area where different views are rendered based on the current state */}
      <div className="content">
        {currentView === "create" ? (  // Conditional rendering based on the current view
          <Create onCreate={handleNewEntry} />  // Render Create component for adding new SCP records
        ) : isUpdating && selectedCard ? (  // If in update mode and a card is selected
          <Update item={selectedCard} onUpdateComplete={handleUpdateComplete} />  // Render Update component for editing the selected SCP record
        ) : selectedCard ? (  // If a card is selected
          <>
            <Card item={selectedCard} />  {/* Render Card component to display the selected SCP record */}
            {session && (  // If user is logged in, show update and delete buttons
              <>
                <button onClick={() => { setIsUpdating(true); setCurrentView("update"); }} className="update-btn">
                  ✏️ Update SCP Record
                </button>
                <button onClick={handleDelete} className="delete-btn">
                  🗑️ Delete SCP Record
                </button>
              </>
            )}
          </>
        ) : (
          <Homepage  // Render Homepage component to display all SCP records
            data={data}  // Pass the SCP data to the Homepage
            onSelect={(item) => {  // Handle selection of an SCP record from the homepage
              setIsUpdating(false);  // Reset update mode
              setSelectedCard(item);  // Set the selected card
            }}
          />
        )}
      </div>
      <Footer />  {/* Footer component for additional information or links */}
    </div>
  );
};


export default App;

