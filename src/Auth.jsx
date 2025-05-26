import React, { useState } from 'react';
import { supabase } from './supabaseClient';  // Import Supabase client
import "./App.css";  // Import CSS for styling

// Auth component for user authentication (login/signup)
const Auth = ({ onLogin, onCancel }) => {
  const [email, setEmail] = useState('');  // State to hold email input
  const [password, setPassword] = useState('');  // State to hold password input
  const [error, setError] = useState('');  // State to hold error messages
  const [isSigningUp, setIsSigningUp] = useState(false);  // State to toggle between login and signup views

  // Function to handle login
  const handleLogin = async () => {
    setError('');  // Clear any previous error messages
    const { data, error } = await supabase.auth.signInWithPassword({  // Sign in with email and password
      email,
      password,
    });

    if (error) {  // If there's an error during login
      setError(error.message);  // Set the error message to state
    } else {
      onLogin(data.session); // Call the onLogin callback with the session data
    }
  };

  // Function to handle signup
  const handleSignUp = async () => {
    setError('');  // Clear any previous error messages
    const { data, error } = await supabase.auth.signUp({  // Sign up with email and password
      email,
      password,
    });

    if (error) {  // If there's an error during signup
      setError(error.message);  // Set the error message to state
    } else {
      alert('Check your email to confirm your signup.');  // Notify user to check their email
      setIsSigningUp(false); // Switch to login view after signup
    }
  };

  // Render the authentication form
  return (
    <div className="login-form">
      <h2>{isSigningUp ? 'Sign Up' : 'Login'}</h2>  {/* Display title based on the current view */}
      {error && <div className="error-message">{error}</div>}  {/* Display error message if exists */}
      <input className="login-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}  // Update email state on input change
      />
      <input className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}  // Update password state on input change
      />
      {isSigningUp ? (  // If in signup mode, show signup button and switch to login option
        <>
          <button onClick={handleSignUp} className="signup-btn">Sign Up</button>  {/* Signup button */}
          <p>
            Already have an account?{' '}
            <button onClick={() => setIsSigningUp(false)} className="signup-btn">Login</button>  {/* Switch to login option */}
          </p>
          {onCancel && <button onClick={onCancel} className="cancel-btn">Cancel</button>}  {/* Optional cancel button to close the auth modal */}
        </>
      ) : (
        <>
          <button onClick={handleLogin} className="login-btn">Login</button>  {/* Login button */}
          <p>
            Don't have an account?{' '}
            <button onClick={() => setIsSigningUp(true)} className="login-btn">Sign Up</button>  {/* Switch to signup option */}
          </p>
          {onCancel && <button onClick={onCancel} className="cancel-btn">Cancel</button>}  {/* Optional cancel button to close the auth modal */}
        </>
      )}
    </div>
  );
};

export default Auth;
