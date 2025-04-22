import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AjoutEtudiantsCours = () => {
  const [cours, setCours] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  const [etudiantsInscrits, setEtudiantsInscrits] = useState([]);
  const [selectedCoursId, setSelectedCoursId] = useState('');
  const [selectedEtudiants, setSelectedEtudiants] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCours();
    fetchEtudiants();
  }, []);

  useEffect(() => {
    if (selectedCoursId) {
      fetchEtudiantsInscrits(selectedCoursId);
    }
  }, [selectedCoursId]);

  const fetchCours = async () => {
    try {
      const response = await axios.get('http://localhost:8082/poudlard/cours/professeur', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCours(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours :', error);
    }
  };

  const fetchEtudiants = async () => {
    try {
      const response = await axios.get('http://localhost:8082/poudlard/etudiant/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEtudiants(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants :', error);
    }
  };

  const fetchEtudiantsInscrits = async (coursId) => {
    try {
      const response = await axios.get(`http://localhost:8082/poudlard/cours/${coursId}/etudiants`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEtudiantsInscrits(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants inscrits :", error);
    }
  };

  const handleCheckboxChange = (etudiantId) => {
    if (selectedEtudiants.includes(etudiantId)) {
      setSelectedEtudiants(selectedEtudiants.filter((id) => id !== etudiantId));
    } else {
      setSelectedEtudiants([...selectedEtudiants, etudiantId]);
    }
  };

  const handleAjouter = async () => {
    if (!selectedCoursId || selectedEtudiants.length === 0) {
      alert("Veuillez sélectionner un cours et au moins un étudiant.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8082/poudlard/cours/${selectedCoursId}/addEtudiants`,
        selectedEtudiants,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Étudiants ajoutés avec succès !");
      setSelectedEtudiants([]);
      fetchEtudiantsInscrits(selectedCoursId);
    } catch (error) {
      console.error("Erreur lors de l'ajout des étudiants :", error);
      alert("Échec de l'ajout.");
    }
  };

  const etudiantsDisponibles = etudiants.filter(
    (e) => !etudiantsInscrits.some((ei) => ei.idEtudiant === e.idEtudiant)
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Ajouter des étudiants à un cours</h2>

      <div className="mb-3">
        <label className="form-label">Sélectionner un cours :</label>
        <select
          value={selectedCoursId}
          onChange={(e) => setSelectedCoursId(e.target.value)}
          className="form-select"
        >
          <option value="">-- Choisir un cours --</option>
          {cours.map((cours) => (
            <option key={cours.idCours} value={cours.idCours}>
              {cours.intitule} ({cours.ref})
            </option>
          ))}
        </select>
      </div>

      {selectedCoursId && (
        <>
          <h5 className="mt-4 mb-3">Étudiants disponibles :</h5>
          {etudiantsDisponibles.length === 0 ? (
            <div className="alert alert-info">Aucun étudiant disponible pour ce cours.</div>
          ) : (
            <ul className="list-group mb-4">
              {etudiantsDisponibles.map((etudiant) => (
                <li key={etudiant.idEtudiant} className="list-group-item d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={selectedEtudiants.includes(etudiant.idEtudiant)}
                    onChange={() => handleCheckboxChange(etudiant.idEtudiant)}
                  />
                  {etudiant.nom} {etudiant.prenom}
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={handleAjouter}
            className="btn btn-success"
          >
            Ajouter au cours
          </button>
        </>
      )}
    </div>
  );
};

export default AjoutEtudiantsCours;
