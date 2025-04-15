// src/pages/Login.jsx
import api from '../api/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
try {
  const response = await api.post('/auth/login', { email, motDePasse });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('role', response.data.role);

  console.log("Bienvenue :", email ); // ou response.data.email si tu le retournes

  navigate('/');
} catch (err) {
  console.error("Erreur lors de la connexion :", err);
  alert("Email ou mot de passe incorrect");
}
 };

  return (
    <div>
      <h2>Connexion</h2>
      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
