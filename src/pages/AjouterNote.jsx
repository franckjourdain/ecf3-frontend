// src/pages/AjouterNote.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

function AjouterNote() {
  const [etudiants, setEtudiants] = useState([]);
  const [cours, setCours] = useState([]);
  const [selectedEtudiant, setSelectedEtudiant] = useState('');
  const [selectedCours, setSelectedCours] = useState('');
  const [valeurNote, setValeurNote] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Charger les étudiants
    api.get('/poudlard/etudiant', config)
      .then(res => setEtudiants(res.data))
      .catch(err => console.error("Erreur étudiants", err));

    // Charger les cours
    api.get('/poudlard/cours', config)
      .then(res => setCours(res.data))
      .catch(err => console.error("Erreur cours", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.post(`/classes/notes/cours/${selectedCours}/etudiants/${selectedEtudiant}`, {
        valeur: valeurNote,
      }, config);

      setMessage("✅ Note ajoutée avec succès !");
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de l'ajout de la note.");
    }
  };

  return (
    <div>
      <h2>Ajouter une note</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <select value={selectedEtudiant} onChange={(e) => setSelectedEtudiant(e.target.value)} required>
          <option value="">Sélectionner un étudiant</option>
          {etudiants.map(e => (
            <option key={e.idEtudiant} value={e.idEtudiant}>
              {e.nom} ({e.email})
            </option>
          ))}
        </select>

        <select value={selectedCours} onChange={(e) => setSelectedCours(e.target.value)} required>
          <option value="">Sélectionner un cours</option>
          {cours.map(c => (
            <option key={c.idCours} value={c.idCours}>
              {c.intitule}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="0"
          max="20"
          step="0.5"
          value={valeurNote}
          onChange={(e) => setValeurNote(e.target.value)}
          placeholder="Note"
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AjouterNote;
