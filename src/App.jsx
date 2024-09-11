import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Add other routes here if needed */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
