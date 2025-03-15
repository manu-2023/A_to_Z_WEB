// src/Components/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Admin from './Admin/Admin'; // Adjust path if necessary
import ErrorPage from './ErrorPage'; // Include other routes as needed

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<ErrorPage />} /> {/* Catch-all for 404 */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
