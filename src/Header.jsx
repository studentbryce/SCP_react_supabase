import React from "react";
import "./App.css";  // Import CSS for styling

// Header image links for the SCP application from Supabase storage
const headerImage = "https://fdznrrmsvyhwgglyeyit.supabase.co/storage/v1/object/public/scp-images//SCP_Header.png";
const headerTitle = "https://fdznrrmsvyhwgglyeyit.supabase.co/storage/v1/object/public/scp-images//SCP_Archives.jpg";

// Header component to display the SCP Foundation header images
const Header = () => {
  return (
    <header className="header">
      <img src={headerImage} alt="SCP Foundation" className="header-image" />
      <img src={headerTitle} alt="SCP Foundation Title" className="header-image" />
    </header>
  );
};

export default Header;

