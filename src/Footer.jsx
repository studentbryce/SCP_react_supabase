import React from "react";
import "./App.css";  // Import CSS for styling

// Card component to display individual SCP items
const Footer = () => {
    return (
        <div className="footer">
            Powered by <a href="https://github.com/studentbryce/SCP_react_json_app" target="_blank" rel="noopener noreferrer">Github.com</a>
            &nbsp;|
            <a href="https://support.github.com/" target="_blank" rel="noopener noreferrer">Help</a>
            &nbsp;|
            <a href="https://docs.github.com/en/site-policy/github-terms/github-terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            &nbsp;|
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">Privacy</a>
            &nbsp;|
            <a href="https://docs.github.com/en/site-policy/security-policies/github-bug-bounty-program-legal-safe-harbor" target="_blank" rel="noopener noreferrer">Report a bug</a>
        </div>
    );
};

export default Footer;
