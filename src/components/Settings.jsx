import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper, MenuItem, Select, FormControl, InputLabel, Divider } from '@mui/material';

const Settings = () => {
  const [settings, setSettings] = useState({
    applicationName: '',
    datasourceUrl: '',
    datasourceUsername: '',
    datasourcePassword: '',
    selectedApiTool: '',
    feishuAddress: '',
    wopiAddress: '',
    serverApiAddress: '',
    jamaAddress: '',
    jiraAddress: '',
    codebeamerAddress: '',
    polarionAddress: '',
    redisHost: '',
    redisPort: '',
    redisPassword: '',
    mvcPathmatchStrategy: '',
    serverPort: '',
    serverApiTop: '',
    serverApiUser: '',
    serverApiPassword: '',
    serverApiRole: '',
    apiVersion: 'v1', // Default value for the API version dropdown
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(settings);
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Settings Configuration
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Application
              </Typography>
              <TextField
                fullWidth
                label="Application Name"
                name="applicationName"
                value={settings.applicationName}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />

              <Typography variant="h6" gutterBottom>
                Datasource
              </Typography>
              <TextField
                fullWidth
                label="URL"
                name="datasourceUrl"
                value={settings.datasourceUrl}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Username"
                name="datasourceUsername"
                value={settings.datasourceUsername}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                name="datasourcePassword"
                type="password"
                value={settings.datasourcePassword}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />

              <Typography variant="h6" gutterBottom>
                API Addresses
              </Typography>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="apiTool-label">Select Tool</InputLabel>
                <Select
                  labelId="apiTool-label"
                  name="selectedApiTool"
                  value={settings.selectedApiTool}
                  onChange={handleChange}
                  label="Select Tool"
                >
                  <MenuItem value="feishu">Feishu</MenuItem>
                  <MenuItem value="jama">Jama</MenuItem>
                  <MenuItem value="jira">Jira</MenuItem>
                  <MenuItem value="codebeamer">Codebeamer</MenuItem>
                  <MenuItem value="polarion">Polarion</MenuItem>
                </Select>
              </FormControl>

              {settings.selectedApiTool === 'feishu' && (
                <TextField
                  fullWidth
                  label="Feishu Address"
                  name="feishuAddress"
                  value={settings.feishuAddress}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              )}
              {settings.selectedApiTool === 'jama' && (
                <TextField
                  fullWidth
                  label="Jama Address"
                  name="jamaAddress"
                  value={settings.jamaAddress}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              )}
              {settings.selectedApiTool === 'jira' && (
                <TextField
                  fullWidth
                  label="Jira Address"
                  name="jiraAddress"
                  value={settings.jiraAddress}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              )}
              {settings.selectedApiTool === 'codebeamer' && (
                <TextField
                  fullWidth
                  label="Codebeamer Address"
                  name="codebeamerAddress"
                  value={settings.codebeamerAddress}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              )}
              {settings.selectedApiTool === 'polarion' && (
                <TextField
                  fullWidth
                  label="Polarion Address"
                  name="polarionAddress"
                  value={settings.polarionAddress}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                />
              )}
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Redis
              </Typography>
              <TextField
                fullWidth
                label="Host"
                name="redisHost"
                value={settings.redisHost}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Port"
                name="redisPort"
                value={settings.redisPort}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                name="redisPassword"
                type="password"
                value={settings.redisPassword}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />

              <Typography variant="h6" gutterBottom>
                MVC Pathmatch
              </Typography>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="mvcPathmatchStrategy-label">Matching Strategy</InputLabel>
                <Select
                  labelId="mvcPathmatchStrategy-label"
                  name="mvcPathmatchStrategy"
                  value={settings.mvcPathmatchStrategy}
                  onChange={handleChange}
                  label="Matching Strategy"
                >
                  <MenuItem value="ant-path-matcher">Ant Path Matcher</MenuItem>
                  <MenuItem value="path-matcher">Path Matcher</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="h6" gutterBottom>
                Server
              </Typography>
              <TextField
                fullWidth
                label="Port"
                name="serverPort"
                value={settings.serverPort}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />

              <Typography variant="h6" gutterBottom>
                Server API
              </Typography>
              <TextField
                fullWidth
                label="Top"
                name="serverApiTop"
                value={settings.serverApiTop}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="User"
                name="serverApiUser"
                value={settings.serverApiUser}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                name="serverApiPassword"
                type="password"
                value={settings.serverApiPassword}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Role"
                name="serverApiRole"
                value={settings.serverApiRole}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />

              <Typography variant="h6" gutterBottom>
                API Version
              </Typography>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="apiVersion-label">API Version</InputLabel>
                <Select
                  labelId="apiVersion-label"
                  name="apiVersion"
                  value={settings.apiVersion}
                  onChange={handleChange}
                  label="API Version"
                >
                  <MenuItem value="v1">V1</MenuItem>
                  <MenuItem value="v2">V2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3, textAlign: 'center' }}>
            <Button variant="contained" color="primary" type="submit">
              Save Settings
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Settings;
