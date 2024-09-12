import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Add other routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
