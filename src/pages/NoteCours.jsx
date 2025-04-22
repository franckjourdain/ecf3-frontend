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
    if (!selectedEtudiantId || note === '') {
      alert('Sélectionnez un étudiant et entrez une note');
      return;
    }

    const valeurNum = parseFloat(note);
    if (valeurNum < 0 || valeurNum > 20) {
      alert(' La note doit être comprise entre 0 et 20');
      return;
    }

    try {
      await axios.post(
        `http://localhost:8082/classes/notes/cours/${selectedCoursId}/etudiants/${selectedEtudiantId}`,
        {
          valeur: valeurNum,
          intitule: "Note contrôlée",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('✅ Note attribuée avec succès !');
      setSelectedCoursId(null);
    } catch (error) {
      console.error('Erreur lors de l’envoi de la note', error);
      alert(" Erreur lors de l'envoi");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">📝 Attribution des notes</h3>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Référence</th>
            <th>Intitulé</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cours.map((cours) => (
            <tr key={cours.idCours}>
              <td>{cours.ref}</td>
              <td>{cours.intitule}</td>
              <td>
                {selectedCoursId === cours.idCours ? (
                  <div className="p-3 border rounded bg-light">
                    {etudiants.length === 0 ? (
                      <div className="text-muted fst-italic">
                        Aucun étudiant inscrit à ce cours.
                      </div>
                    ) : (
                      <>
                        <div className="mb-2">
                          <select
                            className="form-select"
                            value={selectedEtudiantId}
                            onChange={(e) => setSelectedEtudiantId(e.target.value)}
                          >
                            <option value="">-- Choisir un étudiant --</option>
                            {etudiants.map((etudiant) => (
                              <option key={etudiant.idEtudiant} value={etudiant.idEtudiant}>
                                {etudiant.nom} {etudiant.prenom}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-2">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Note sur 20"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            min="0"
                            max="20"
                            step="0.5"
                          />
                        </div>
                        <div className="d-flex gap-2">
                          <button onClick={handleSubmitNote} className="btn btn-success btn-sm">
                            Valider
                          </button>
                          <button onClick={() => setSelectedCoursId(null)} className="btn btn-secondary btn-sm">
                            Annuler
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => handleAttribuerNote(cours.idCours)}
                    className="btn btn-primary btn-sm"
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
