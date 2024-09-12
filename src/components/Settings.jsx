import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

const steps = [
  'Database Settings',
  'API Settings',
  'Redis Settings',
  'PREEvision API Metric Settings'
];

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiFormLabel-root': {
    color: 'grey', // Label color
  },
  '& .MuiFormLabel-asterisk': {
    color: '#B70032', // Required asterisk color
  },
}));

export default function Settings() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [database, setDatabase] = React.useState({
    url: '',
    username: '',
    password: ''
  });
  const [api, setApi] = React.useState({
    serverApiUrl: '',
    wopiUrl: '',
    thirdPartyTool: ''
  });
  const [redis, setRedis] = React.useState({
    host: '',
    port: ''
  });
  const [preevision, setPreevision] = React.useState({
    top: '',
    user: '',
    password: '',
    role: ''
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setDatabase({ url: '', username: '', password: '' });
    setApi({ serverApiUrl: '', wopiUrl: '', thirdPartyTool: '' });
    setRedis({ host: '', port: '' });
    setPreevision({ top: '', user: '', password: '', role: '' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (activeStep === 0) {
      setDatabase({ ...database, [name]: value });
    } else if (activeStep === 1) {
      setApi({ ...api, [name]: value });
    } else if (activeStep === 2) {
      setRedis({ ...redis, [name]: value });
    } else if (activeStep === 3) {
      setPreevision({ ...preevision, [name]: value });
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom marginBottom={3}>
        Setting Configuration
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ p: 3 }}>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <Box>
                <StyledTextField
                required 
                  label="Database URL"
                  name="url"
                  value={database.url}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <StyledTextField
                required
                  label="Username"
                  name="username"
                  value={database.username}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <StyledTextField
                required
                  label="Password"
                  name="password"
                  type="password"
                  value={database.password}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Box>
            )}
            {activeStep === 1 && (
              <Box>
                <TextField
                  label="Server API URL"
                  name="serverApiUrl"
                  value={api.serverApiUrl}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="WOPI URL"
                  name="wopiUrl"
                  value={api.wopiUrl}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  select
                  label="Third-Party Tool"
                  name="thirdPartyTool"
                  value={api.thirdPartyTool}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="feishu">Feishu</MenuItem>
                  <MenuItem value="jama">Jama</MenuItem>
                  <MenuItem value="jira">Jira</MenuItem>
                  <MenuItem value="codebeamer">CodeBeamer</MenuItem>
                  <MenuItem value="polarion">Polarion</MenuItem>
                </TextField>
              </Box>
            )}
            {activeStep === 2 && (
              <Box>
                <TextField
                  label="Redis Host"
                  name="host"
                  value={redis.host}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Redis Port"
                  name="port"
                  type="number"
                  value={redis.port}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Box>
            )}
            {activeStep === 3 && (
              <Box>
                <TextField
                  label="Top"
                  name="top"
                  type="number"
                  value={preevision.top}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="User"
                  name="user"
                  value={preevision.user}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={preevision.password}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Role"
                  name="role"
                  value={preevision.role}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}
