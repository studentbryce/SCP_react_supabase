import React, { useState, useEffect } from "react";
import "./App.css"; // Import CSS
import Auth from './Auth';
import Navbar from "./Navbar"; // Import Navbar
import Header from "./Header"; // Import Header
import Card from "./Card"; // Import Card
import Create from './Create';
import Update from './Update';
import Homepage from "./Homepage"; // Import Homepage
import Footer from "./Footer"; // Import Footer
import { supabase } from './supabaseClient'


const App = () => {
  const [session, setSession] = useState(null);
  const [data, setData] = useState([]);
  const [currentView, setCurrentView] = useState("home");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  // Get auth session
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: scpData, error } = await supabase.from("scp_files").select("*");
      if (error) {
        console.error("Error loading data:", error);
        setError(error.message);
      } else {
        setData(scpData);
        setError(null);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleNewEntry = (newItem) => {
    setData([...data, newItem]);
    setSelectedCard(newItem);
    setCurrentView("home");
  };

  const handleUpdateComplete = (updatedItem) => {
    const updatedData = data.map(item => item.id === updatedItem.id ? updatedItem : item);
    setData(updatedData);
    setSelectedCard(updatedItem);
    setIsUpdating(false);
    setCurrentView("home");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${selectedCard.title}"?`);
    if (!confirmDelete) return;

    const { error } = await supabase.from("scp_files").delete().eq("id", selectedCard.id);

    if (error) {
      console.error("Error deleting:", error.message);
      alert("Failed to delete.");
    } else {
      alert("Deleted successfully.");
      setData(data.filter(item => item.id !== selectedCard.id));
      setSelectedCard(null);
    }
  };


  return (
    <div className="container">

      {showLogin && (
        <div className="auth-modal">
          <Auth
            onLogin={(session) => {
              setSession(session);
              setShowLogin(false);
            }}
            onCancel={() => setShowLogin(false)} // Optional cancel handler
          />
        </div>
      )}


      <Navbar
        data={data}
        onSelect={(item) => {
          setIsUpdating(false);
          setSelectedCard(item);
          setCurrentView("home");
        }}
        onNavigate={(view) => {
          setIsUpdating(false);
          setCurrentView(view);
        }}
        onLoginClick={() => setShowLogin(true)}
        session={session}                 // ✅ Pass session
        onLogout={async () => {
          await supabase.auth.signOut();
          setSession(null);
        }}                                 // ✅ Pass logout handler
      />


      <Header />

      {error && <div className="error-message">{error}</div>}

      <div className="content">
        {currentView === "create" ? (
          <Create onCreate={handleNewEntry} />
        ) : isUpdating && selectedCard ? (
          <Update item={selectedCard} onUpdateComplete={handleUpdateComplete} />
        ) : selectedCard ? (
          <>
            <Card item={selectedCard} />
            {session && (
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
          <Homepage
            data={data}
            onSelect={(item) => {
              setIsUpdating(false);
              setSelectedCard(item);
            }}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};


export default App;

