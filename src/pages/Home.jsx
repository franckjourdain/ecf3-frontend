import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
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
        navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary" role="status" />
      <p className="mt-3">Redirection en cours...</p>
    </div>
  );
}

export default Home;
