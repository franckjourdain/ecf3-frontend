import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const DashboardProfesseur = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">📚 Tableau de bord - Professeur</h1>

      {/* Navigation entre onglets */}
      <ul className="nav nav-pills mb-4">
        <li className="nav-item">
          <NavLink
            to="notes"
            className={({ isActive }) =>
              'nav-link' + (isActive ? ' active' : '')
            }
          >
            📝 Attribuer des notes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="ajout-etudiants"
            className={({ isActive }) =>
              'nav-link' + (isActive ? ' active' : '')
            }
          >
            ➕ Ajouter des étudiants
          </NavLink>
        </li>
      </ul>

      {/* Affichage du contenu de l’onglet sélectionné */}
      <Outlet />
    </div>
  );
};

export default DashboardProfesseur;
