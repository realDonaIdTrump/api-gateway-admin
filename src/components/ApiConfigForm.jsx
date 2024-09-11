import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function ApiConfigForm() {
  const [apiUrl, setApiUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to save the API properties
    console.log('API URL:', apiUrl);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Third-party API Address"
        variant="outlined"
        fullWidth
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="secondary">
        Save
      </Button>
    </Box>
  );
}

export default ApiConfigForm;
