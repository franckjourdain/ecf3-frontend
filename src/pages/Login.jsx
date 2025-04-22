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
    setErreur('');
    try {
      const response = await api.post('/auth/login', { email, motDePasse });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      console.log("Bienvenue :", email);
      if (onLogin) onLogin();
      navigate('/');
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setErreur("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4 text-center">🔐 Connexion</h2>

        {erreur && <div className="alert alert-danger">{erreur}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Adresse email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="motDePasse" className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="motDePasse"
              placeholder="Entrez votre mot de passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
