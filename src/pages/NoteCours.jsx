// anciennement contenu de DashboardProfesseur.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoteCours = () => {
  const [cours, setCours] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  const [selectedCoursId, setSelectedCoursId] = useState(null);
  const [selectedEtudiantId, setSelectedEtudiantId] = useState('');
  const [note, setNote] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCours();
  }, []);

  const fetchCours = async () => {
    try {
      const response = await axios.get('http://localhost:8082/poudlard/cours/professeur', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setCours(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error);
    }
  };

  const fetchEtudiants = async (coursId) => {
    try {
      const response = await axios.get(`http://localhost:8082/poudlard/cours/${coursId}/etudiants`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setEtudiants(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants :", error);
    }
  };

  const handleAttribuerNote = (coursId) => {
    setSelectedCoursId(coursId);
    fetchEtudiants(coursId);
    setSelectedEtudiantId('');
    setNote('');
  };

  const handleSubmitNote = async () => {
    if (!selectedEtudiantId || !note) {
      alert('Sélectionne un étudiant et entre une note');
      return;
    }

    try {
      await axios.post(
        `http://localhost:8082/classes/notes/cours/${selectedCoursId}/etudiants/${selectedEtudiantId}`,
        {
          valeur: parseFloat(note), // ✅ correspond au modèle
          intitule: "Note contrôlée",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // ✅ requis pour JSON
          },
        }
      );
      alert('Note attribuée avec succès !');
      setSelectedCoursId(null);
    } catch (error) {
      console.error('Erreur lors de l’envoi de la note', error);
      alert("Erreur lors de l'envoi");
    }
  };


  return (
    <div>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Référence</th>
            <th className="px-4 py-2">Intitulé</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cours.map((cours) => (
            <tr key={cours.idCours}>
              <td className="border px-4 py-2">{cours.ref}</td>
              <td className="border px-4 py-2">{cours.intitule}</td>
              <td className="border px-4 py-2">
                {selectedCoursId === cours.idCours ? (
                  <div className="flex flex-col space-y-2">
                    {etudiants.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">
                        Aucun étudiant inscrit à ce cours.
                      </p>
                    ) : (
                      <select
                        value={selectedEtudiantId}
                        onChange={(e) => setSelectedEtudiantId(e.target.value)}
                        className="border p-1"
                      >
                        <option value="">-- Choisir un étudiant --</option>
                        {etudiants.map((etudiant) => (
                          <option key={etudiant.idEtudiant} value={etudiant.idEtudiant}>
                            {etudiant.nom} {etudiant.prenom}
                          </option>
                        ))}
                      </select>
                    )}
                    <input
                      type="number"
                      placeholder="Note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="border p-1"
                    />
                    <button
                      onClick={handleSubmitNote}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Valider
                    </button>
                    <button
                      onClick={() => setSelectedCoursId(null)}
                      className="bg-gray-300 px-2 py-1 rounded"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAttribuerNote(cours.idCours)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Attribuer une note
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoteCours;
