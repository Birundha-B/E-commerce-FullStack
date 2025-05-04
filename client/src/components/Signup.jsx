import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Signup.css";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Signup successful!');
        navigate('/login');
      } else {
       
        const errorMsg = data.msg || 'Signup failed. Please try again later.';
        alert(errorMsg);
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Error while signing up. Please check your connection.');
    }
  };

  return (
    <form onSubmit={handleSignup} className="signup-container">
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
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

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
