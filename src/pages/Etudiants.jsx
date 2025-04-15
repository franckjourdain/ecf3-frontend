// src/pages/Etudiants.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Etudiants() {
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    axios.get('/poudlard/etudiant/all') // ✅ Chemin corrigé ici
      .then(response => {
        setEtudiants(response.data);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des étudiants :", error);
      });
  }, []);

  return (
    <div>
      <h2>Liste des Étudiants</h2>
      <ul>
        {etudiants.map(etudiant => (
          <li key={etudiant.idEtudiant}>
            {etudiant.nom} {etudiant.prenom}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Etudiants;
