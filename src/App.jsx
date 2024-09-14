import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Dashboard from './pages/Dashboard';
import SignInPage from './pages/SignInPage';  // Import the SignInPage component

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<Dashboard />} />
        {/* Default route */}
        <Route path="*" element={<Navigate to="/signin" />} />
        {/* Add other routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
