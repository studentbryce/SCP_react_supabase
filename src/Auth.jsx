import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import "./App.css";

const Auth = ({ onLogin, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLogin = async () => {
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      onLogin(data.session); // send session back
    }
  };

  const handleSignUp = async () => {
    setError('');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert('Check your email to confirm your signup.');
      setIsSigningUp(false); // return to login view
    }
  };

  return (
    <div className="login-form">
      <h2>{isSigningUp ? 'Sign Up' : 'Login'}</h2>
      {error && <div className="error-message">{error}</div>}
      <input className="login-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {isSigningUp ? (
        <>
          <button onClick={handleSignUp} className="signup-btn">Sign Up</button>
          <p>
            Already have an account?{' '}
            <button onClick={() => setIsSigningUp(false)} className="signup-btn">Login</button>
          </p>
          {onCancel && <button onClick={onCancel} className="cancel-btn">Cancel</button>}
        </>
      ) : (
        <>
          <button onClick={handleLogin} className="login-btn">Login</button>
          <p>
            Don't have an account?{' '}
            <button onClick={() => setIsSigningUp(true)} className="login-btn">Sign Up</button>
          </p>
          {onCancel && <button onClick={onCancel} className="cancel-btn">Cancel</button>}
        </>
      )}
    </div>
  );
};

export default Auth;
