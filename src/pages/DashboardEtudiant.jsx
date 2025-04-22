import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardEtudiant = () => {
  const [cours, setCours] = useState([]);
  const [profil, setProfil] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProfil();
  }, []);

  useEffect(() => {
    if (profil?.idEtudiant) {
      fetchCoursByEtudiant(profil.idEtudiant);
    }
  }, [profil]);

  const fetchProfil = async () => {
    try {
      const response = await axios.get('http://localhost:8082/poudlard/etudiant/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfil(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération du profil étudiant :', error);
    }
  };

  const fetchCoursByEtudiant = async (idEtudiant) => {
    try {
      const response = await axios.get(`http://localhost:8082/poudlard/etudiant/${idEtudiant}/cours`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCours(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours de l’étudiant :', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h1 className="mb-3">🎓 Dashboard Étudiant</h1>
        {profil ? (
          <div className="alert alert-primary">
            Bienvenue : <strong>{profil.email}</strong>
          </div>
        ) : (
          <div className="text-muted">Chargement du profil...</div>
        )}
      </div>

      <div>
        <h2 className="mb-3">📚 Mes cours</h2>
        {cours.length === 0 ? (
          <div className="alert alert-warning">Aucun cours trouvé.</div>
        ) : (
          <ul className="list-group">
            {cours.map((c) => (
              <li key={c.idCours} className="list-group-item d-flex justify-content-between align-items-center">
                <span><strong>{c.intitule}</strong></span>
                <span className="badge bg-secondary">{c.ref}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardEtudiant;
