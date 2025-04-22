import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Etudiants from './pages/Etudiants';
import DashboardEtudiant from './pages/DashboardEtudiant';
import Login from './pages/Login';
import MesNotes from './pages/MesNotes';
import AjouterNote from './pages/AjouterNote';
import DashboardProfesseur from './pages/DashboardProfesseur';
import NoteCours from './pages/NoteCours';
import AjoutEtudiantsCours from './pages/AjoutEtudiantsCours';
import { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/etudiants">Étudiants</Link></li>
          <li><Link to="/mes-notes">Mes Notes</Link></li>
          <li><Link to="/login">Connexion</Link></li>
          <li><Link to="/dashboard-professeur">Dashboard Professeur</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/etudiants" element={<Etudiants />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/mes-notes" element={<MesNotes />} />
        <Route path="/dashboard-etudiant" element={<DashboardEtudiant />} />
        <Route path="/ajouter-note" element={<AjouterNote />} />

        {/* Dashboard Professeur avec sous-routes */}
        <Route path="/dashboard-professeur" element={<DashboardProfesseur />}>
          {/* Redirection par défaut vers l'onglet "notes" */}
          <Route index element={<Navigate to="notes" replace />} />
          <Route path="notes" element={<NoteCours />} />
          <Route path="ajout-etudiants" element={<AjoutEtudiantsCours />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
