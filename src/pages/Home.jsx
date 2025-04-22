// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      // Non connecté
      navigate('/login');
      return;
    }

    switch (role) {
      case 'ETUDIANT':
        navigate('/dashboard-etudiant');
        break;
      case 'PROFESSEUR':
        navigate('/dashboard-professeur');
        break;
      case 'ADMIN':
        navigate('/dashboard-admin');
        break;
      default:
        navigate('/login'); // rôle inconnu
    }
  }, [navigate]);

  return <p>Redirection en cours...</p>;
}

export default Home;
