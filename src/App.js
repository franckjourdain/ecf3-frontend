import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './pages/Home';
import Etudiants from './pages/Etudiants';
import DashboardEtudiant from './pages/DashboardEtudiant';
import Login from './pages/Login';
import MesNotes from './pages/MesNotes';
import AjouterNote from './pages/AjouterNote';
import DashboardProfesseur from './pages/DashboardProfesseur';
import NoteCours from './pages/NoteCours';
import AjoutEtudiantsCours from './pages/AjoutEtudiantsCours';

import Navbar from './components/Navbar'; // ✅ nouveau composant

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/etudiants" element={<Etudiants />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/mes-notes" element={<MesNotes />} />
        <Route path="/dashboard-etudiant" element={<DashboardEtudiant />} />
        <Route path="/ajouter-note" element={<AjouterNote />} />

        <Route path="/dashboard-professeur" element={<DashboardProfesseur />}>
          <Route index element={<Navigate to="notes" replace />} />
          <Route path="notes" element={<NoteCours />} />
          <Route path="ajout-etudiants" element={<AjoutEtudiantsCours />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
