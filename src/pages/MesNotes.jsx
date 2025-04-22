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
            Authorization: `Bearer ${token}`
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

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Chargement des notes...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📑 Mes Notes</h2>

      {notes.length === 0 ? (
        <div className="alert alert-info">Aucune note trouvée.</div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Cours</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.idNote}>
                <td>{note.coursIntitule || 'Cours inconnu'}</td>
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
