import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function ServerConfigForm() {
  const [serverUrl, setServerUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to save the server URL
    console.log('Server URL:', serverUrl);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Server API URL"
        variant="outlined"
        fullWidth
        value={serverUrl}
        onChange={(e) => setServerUrl(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
}

export default ServerConfigForm;
