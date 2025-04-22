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

    api.get('/poudlard/etudiant', config)
      .then(res => setEtudiants(res.data))
      .catch(err => console.error("Erreur étudiants", err));

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
      await api.post(`/classes/notes/cours/${selectedCours}/etudiants/${selectedEtudiant}`, {
        valeur: valeurNote,
      }, config);

      setMessage("✅ Note ajoutée avec succès !");
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de l'ajout de la note.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Ajouter une note</h2>

      {message && (
        <div className={`alert ${message.includes("succès") ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Étudiant</label>
          <select
            className="form-select"
            value={selectedEtudiant}
            onChange={(e) => setSelectedEtudiant(e.target.value)}
            required
          >
            <option value="">Sélectionner un étudiant</option>
            {etudiants.map(e => (
              <option key={e.idEtudiant} value={e.idEtudiant}>
                {e.nom} ({e.email})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Cours</label>
          <select
            className="form-select"
            value={selectedCours}
            onChange={(e) => setSelectedCours(e.target.value)}
            required
          >
            <option value="">Sélectionner un cours</option>
            {cours.map(c => (
              <option key={c.idCours} value={c.idCours}>
                {c.intitule}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Note (sur 20)</label>
          <input
            type="number"
            min="0"
            max="20"
            step="0.5"
            className="form-control"
            value={valeurNote}
            onChange={(e) => setValeurNote(e.target.value)}
            placeholder="Note"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Ajouter la note</button>
      </form>
    </div>
  );
}

export default AjouterNote;
