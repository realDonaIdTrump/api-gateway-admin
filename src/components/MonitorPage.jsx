import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography, CircularProgress } from '@mui/material';

const MonitorPage = () => {
    const [healthStatus, setHealthStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8085";

    useEffect(() => {
        const fetchHealth = async () => {
            try {
                const response = await axios.get(`${apiUrl}/monitor/health`); // Update with your endpoint
                setHealthStatus(response.data);
            } catch (error) {
                console.error('Error fetching health status:', error);
                setError('Error fetching health status');
            } finally {
                setLoading(false);
            }
        };
        fetchHealth();
    }, []);

    return (
        <Paper style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h4">Backend Monitoring</Typography>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {healthStatus && (
                <Typography variant="h6">Health Status: {healthStatus}</Typography>
            )}
        </Paper>
    );
};

export default MonitorPage;
