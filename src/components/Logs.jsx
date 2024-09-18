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

  useEffect(() => {
    fetchLogs();
  }, [page, size]);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${apiUrl}/log/findAllLog`, { page, size });
      setLogs(response.data.data.content);
      setTotalPages(response.data.data.totalPages);  // Assuming totalPages is available in response
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error fetching logs');
      console.error('Error fetching logs:', error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1);  // Adjusting page to be 0-indexed
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
                  <StyledTableCell>No.</StyledTableCell>
                  <StyledTableCell>Created At</StyledTableCell>
                  <StyledTableCell>Log Level</StyledTableCell>
                  <StyledTableCell>Log Context</StyledTableCell>
                  <StyledTableCell>Log Return</StyledTableCell>
                  <StyledTableCell>Log Address</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.length > 0 ? (
                  logs.map((log, index) => (
                    <TableRow hover key={log.id}>
                      <TableCell>{index + 1}</TableCell>  {/* Displaying ascending numbers */}
                      <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                      <TableCell>{log.logLevel}</TableCell>
                      <TableCell>{log.logContext}</TableCell>
                      <TableCell>{log.logReturn}</TableCell>
                      <TableCell>{log.logAddress}</TableCell>  {/* New column for log_address */}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
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
              page={page + 1}  // 1-indexed for Material UI Pagination
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
