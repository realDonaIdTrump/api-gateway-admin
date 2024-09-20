import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { format } from "date-fns"; // Import date formatting function
import "../styles/table.css"; // Import the CSS file

export default function LogTable() {
  const [logs, setLogs] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [rowCount, setRowCount] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8085";
  // Function to fetch logs from backend
  const fetchLogs = async (page, size) => {
    try {
      const response = await axios.post(`${apiUrl}/log/findAllLog`, {
        page,
        size,
      });
      if (response.data.code === "200") {
        const startIndex = page * size; // Calculate starting index for the current page
        setLogs(
          response.data.data.content.map((log, index) => ({
            id: startIndex + index + 1, // Dynamically number rows
            logLevel: log.logLevel,
            logContext: log.logContext,
            createdAt: log.createdAt
              ? format(new Date(log.createdAt), "yyyy-MM-dd HH:mm:ss")
              : "N/A",
            logAddress: log.logAddress, // Assuming 'id' represents the log address
          }))
        );
        setRowCount(response.data.data.totalElements);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    // Fetch logs when the component loads or pagination changes
    fetchLogs(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
    },
    {
      field: "logLevel",
      headerName: "Log Level",
      flex: 0.3,
    },
    {
      field: "logContext",
      headerName: "Log Context",
      flex: 5,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 0.5,
    },
    {
      field: "logAddress",
      headerName: "Log Address",
      flex: 1,
    },
  ];

  return (
    <Paper
      sx={{
        height: "85vh",
        width: "100%",
      }}
    >
      <DataGrid
        rows={logs}
        columns={columns}
        getRowClassName={(params) =>
          params.row.logLevel === "ERROR" ? "error-log" : ""
        }
        rowCount={rowCount}
        pageSizeOptions={[5, 10, 20]}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => setPaginationModel(model)}
        sx={{
          border: 0,
          overflow: "hidden",
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#B70032",
            color: "white",
          },
          "& .MuiDataGrid-columnSeparator": {
            "& svg": {
              // Target the SVG within the separator
              "& rect": {
                fill: "white", // Default fill
                "&:hover": {
                  fill: "white !important", // Change fill color on hover
                },
              },
            },
          },
          "& .MuiButtonBase-root": {
            color: "#D3D3D3", // Change the button color to white (including menu icon)
            "&:hover": {
              color: "#A9A9A9", // Change fill color on hover
            },
          },
        }}
      />
    </Paper>
  );
}
