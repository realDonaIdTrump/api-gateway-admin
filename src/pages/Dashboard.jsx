import React from 'react';
import Navigation from '../components/Navigation';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Skip authentication check during development
      return;
    }

    const isAuthenticated = !!localStorage.getItem('authToken');
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div>
      <Navigation />
      {/* Your Dashboard content here */}
    </div>
  );
}
