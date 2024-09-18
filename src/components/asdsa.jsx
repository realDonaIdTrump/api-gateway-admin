import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  CircularProgress, Typography, Pagination, Box
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// Styled table header for modern look
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main || '#B70032', // Fallback color if theme is undefined
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const Log = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8085';
  
  const theme = useTheme(); // Access the theme object

  useEffect(() => {
    fetchLogs();
  }, [page, size]);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${apiUrl}/log/findAllLog`, { page, size });
      const { data } = response.data; // Adjust based on actual response structure
      setLogs(data.content || []); // Fallback to empty array if content is undefined
      setTotalPages(data.totalPages || 1); // Fallback to 1 page if totalPages is undefined
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error fetching logs');
      console.error('Error fetching logs:', error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1); // Adjusting page to be 0-indexed
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Logs Overview
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <>
          <TableContainer component={Paper} sx={{ maxHeight: '70vh' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Created At</StyledTableCell>
                  <StyledTableCell>Log Level</StyledTableCell>
                  <StyledTableCell>Log Context</StyledTableCell>
                  <StyledTableCell>Log Return</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <TableRow hover key={log.id}>
                      <TableCell>{log.id}</TableCell>
                      <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                      <TableCell>{log.logLevel}</TableCell>
                      <TableCell>{log.logContext}</TableCell>
                      <TableCell>{log.logReturn}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No logs found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
            <Pagination
              count={totalPages}
              page={page + 1} // 1-indexed for Material UI Pagination
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Log;
