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
      fetchEtudiantsInscrits(selectedCoursId); // mettre à jour la liste
    } catch (error) {
      console.error("Erreur lors de l'ajout des étudiants :", error);
      alert("Échec de l'ajout.");
    }
  };

  const etudiantsDisponibles = etudiants.filter(
    (e) => !etudiantsInscrits.some((ei) => ei.idEtudiant === e.idEtudiant)
  );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Ajouter des étudiants à un cours</h2>

      <div className="mb-4">
        <label className="mr-2">Sélectionner un cours :</label>
        <select
          value={selectedCoursId}
          onChange={(e) => setSelectedCoursId(e.target.value)}
          className="border p-1"
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
          <h3 className="text-md font-medium mb-2">Étudiants disponibles :</h3>
          {etudiantsDisponibles.length === 0 ? (
            <p className="text-sm text-gray-500 italic">Aucun étudiant disponible pour ce cours.</p>
          ) : (
            <ul className="mb-4">
              {etudiantsDisponibles.map((etudiant) => (
                <li key={etudiant.idEtudiant}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedEtudiants.includes(etudiant.idEtudiant)}
                      onChange={() => handleCheckboxChange(etudiant.idEtudiant)}
                    />
                    <span className="ml-2">
                      {etudiant.nom} {etudiant.prenom}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleAjouter}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Ajouter au cours
          </button>
        </>
      )}
    </div>
  );
};

export default AjoutEtudiantsCours;
