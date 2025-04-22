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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Dashboard Étudiant
      </h1>

      {profil ? (
        <p className="mb-2">Bienvenue : {profil.email}</p>
      ) : (
        <p className="text-sm italic text-gray-500">Chargement du profil...</p>
      )}

      <h2 className="text-lg font-semibold mt-4 mb-2">Mes cours :</h2>
      {cours.length === 0 ? (
        <p className="italic text-gray-500">Aucun cours trouvé.</p>
      ) : (
        <ul className="list-disc ml-5">
          {cours.map((c) => (
            <li key={c.idCours}>
              <strong>{c.intitule}</strong> ({c.ref})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardEtudiant;
