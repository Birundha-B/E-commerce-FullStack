import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();


if (res.ok) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('role', data.role); // Ensure this line exists
  localStorage.setItem('email', data.email);
  alert('Login successful!');
  navigate('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Server error during login');
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-container">
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>

      <img
        src="https://i.postimg.cc/FzQnHmVB/3f8c61c0-fa4b-4d78-8255-f490b03c5798.jpg"
        alt="Login visual"
        className="login-image"
      />
    </form>
  );
}

export default Login;
