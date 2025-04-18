import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { isTokenExpired } from '@/auth/auth.jsx'

import Login from '@/pages/Auth/Login';
import Dashboard from '@/pages/basic/Dashboard';
import Layout from '@/layout/Layout';
import Register from '@/pages/Auth/Register';
import Station from '@/pages/astronomy/Station';
import Bolide from '@/pages/astronomy/bolide';
import Profile from '@/pages/basic/Profile';
import Report from '@/pages/astronomy/report/report';
import NotFound from '@/pages/basic/NotFound'; // Importa el componente NotFound
import CustomizeSearch from '@/pages/search/customizeSearch';
import ActiveRain from '@/pages/astronomy/activeShower.jsx';
import RadiantReport from '@/pages/astronomy/report/radiantReport';
import PhotometryReport from './pages/astronomy/report/pages/photometryReport';
import QRLogin from './pages/Auth/QRLogin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga inicial



  // Verificar el token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (isTokenExpired(token)) {
      localStorage.removeItem('authToken');
    }

    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Finalizar la carga
  }, []);

  const loginHandler = (token, rol) => {
    const currentTime = new Date().toISOString();
    localStorage.setItem('rol', rol);
    localStorage.setItem('authToken', token);
    localStorage.setItem('loginTime', currentTime);
    setIsAuthenticated(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  // Si está cargando, muestra un mensaje de carga
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={loginHandler} />}
        />
        <Route path="/register" element={<Register />} />

        {/* Redirigir desde "/" a "/dashboard" si el usuario está autenticado */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path='/qr-login' element={<QRLogin onLogin={loginHandler} />} />

        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout onLogout={logoutHandler} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="station" element={<Station />} />
          <Route path="bolide/:bolideId" element={<Bolide />} />
          <Route path="/report/:reportId/bolide/:bolideId" element={<Bolide />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/report/:reportId" element={<Report />} />
          <Route path="/customize-search" element={<CustomizeSearch />} />
          <Route path="/active-rain" element={<ActiveRain />} />
          <Route path="/radiant-report/:reportId" element={<RadiantReport />} />
          <Route path="/photometry-report/:reportId" element={<PhotometryReport/>} />
          {/* Otras rutas protegidas */}
        </Route>

        {/* Ruta comodín para páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;