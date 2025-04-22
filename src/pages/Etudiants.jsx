import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Etudiants() {
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    axios.get('/poudlard/etudiant/all')
      .then(response => {
        setEtudiants(response.data);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des étudiants :", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">👩‍🎓 Liste des Étudiants</h2>

      {etudiants.length === 0 ? (
        <div className="alert alert-info">Aucun étudiant à afficher.</div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {etudiants.map(etudiant => (
              <tr key={etudiant.idEtudiant}>
                <td>{etudiant.nom}</td>
                <td>{etudiant.prenom}</td>
                <td>{etudiant.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Etudiants;
