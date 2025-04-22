// src/pages/MesNotes.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

function MesNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
      const response = await api.get('/poudlard/etudiant/me/notes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
        setNotes(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des notes :", error);
        alert("Impossible de charger vos notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) return <p>Chargement des notes...</p>;

  return (
    <div>
      <h2>Mes Notes</h2>
      {notes.length === 0 ? (
        <p>Aucune note trouvée.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Cours</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.idNote}>
                <td>{note.cours?.intitule || 'Cours inconnu'}</td>
                <td>{note.valeur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MesNotes;
