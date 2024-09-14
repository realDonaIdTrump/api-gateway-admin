import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Paper, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import logo from '../assets/Vector_Logo_black_red_RGB.png'; // Adjust the path as needed

// Custom styling for the background
const BackgroundBox = styled(Box)({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'url(https://source.unsplash.com/featured/?technology)', // Example: Background from Unsplash
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

// Ensure the Paper component has sufficient padding and spacing
const PaperContainer = styled(Paper)({
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  maxWidth: '400px',
  margin: '0 auto',
});

const SignInPage = () => {
  const [tabIndex, setTabIndex] = useState(0); // 0 for Sign In, 1 for Register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For registration
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (username && password) {
      // Simulate setting a token (replace this with real API call)
      localStorage.setItem('authToken', 'your-auth-token');
      navigate('/');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && password && password === confirmPassword) {
      // Replace this with actual API call to your backend
      fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Registration successful:', data);
          navigate('/'); // Redirect after successful registration
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <BackgroundBox>
      <Container maxWidth="xs">
        <PaperContainer elevation={6}>
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            style={{
              width: '100px', // Adjust size as needed
              height: 'auto', // Maintain aspect ratio
              margin: '0 auto 20px',
            }}
          />

          <Typography component="h1" variant="h5" gutterBottom>
            {tabIndex === 0 ? 'Sign In' : 'Register'}
          </Typography>

          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 2 }}
          >
            <Tab label="Sign In" />
            <Tab label="Register" />
          </Tabs>

          <Box component="form" onSubmit={tabIndex === 0 ? handleSignIn : handleRegister} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ borderRadius: '10px' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ borderRadius: '10px' }}
            />
            {tabIndex === 1 && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ borderRadius: '10px' }}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#B70032',
                '&:hover': {
                  backgroundColor: '#A6002E',
                },
              }}
            >
              {tabIndex === 0 ? 'Sign In' : 'Register'}
            </Button>
          </Box>
        </PaperContainer>
      </Container>
    </BackgroundBox>
  );
};

export default SignInPage;
