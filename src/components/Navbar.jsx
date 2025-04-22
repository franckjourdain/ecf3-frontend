import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">🏰 Poudlard</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/etudiants">Étudiants</Link>
          </li>
          {role === 'ETUDIANT' && (
            <li className="nav-item">
              <Link className="nav-link" to="/mes-notes">Mes Notes</Link>
            </li>
          )}
          {role === 'PROFESSEUR' && (
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard-professeur">Dashboard Professeur</Link>
            </li>
          )}
          {role === 'ADMIN' && (
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard-admin">Dashboard Admin</Link>
            </li>
          )}
        </ul>

        <ul className="navbar-nav">
          {!token ? (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Connexion</Link>
            </li>
          ) : (
            <li className="nav-item">
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Déconnexion
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
