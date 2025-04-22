import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const DashboardProfesseur = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tableau de bord - Professeur</h1>

      {/* Navigation entre onglets */}
      <div className="flex space-x-4 mb-6">
        <NavLink
          to="notes"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`
          }
        >
          📝 Attribuer des notes
        </NavLink>

        <NavLink
          to="ajout-etudiants"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`
          }
        >
          ➕ Ajouter des étudiants
        </NavLink>
      </div>

      {/* Affichage de l'onglet sélectionné */}
      <Outlet />
    </div>
  );
};

export default DashboardProfesseur;
