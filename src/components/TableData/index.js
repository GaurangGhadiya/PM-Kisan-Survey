"use client";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";


import Typography from "@mui/material/Typography";



import { useDispatch, useSelector } from "react-redux";


import { Button, Grid, Paper } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";

import TableRow from "@mui/material/TableRow";

import {
  CollectionsBookmark,
  Edit,
  Feedback,
  Help,
  PermMedia,
  UploadFile,
  Work,
} from "@mui/icons-material";
import DownloadIcon from '@mui/icons-material/Download'; 
import { onSummaryReportDownload } from "../../network/actions/downloadSummaryReport";




const TableData = ({tableData,selectedWard, selectedMunicipal, selectedDistrict }) => {
    const dispatch = useDispatch();
    const downloadReport = () =>{

    // const {selectedDistrict, selectedWard, selectedMunicipal} = tableData || {};
     
  
        dispatch(
          
          onSummaryReportDownload(
  
          selectedWard?selectedWard.value:null,
          selectedMunicipal?selectedMunicipal.value:null, 
          selectedDistrict?selectedDistrict.code:null
          
          )
          
          )
      
  
    
    }
  
    return (
      <>
        <Box
          style={{
            background: "#074465",
            color: "#FFF",
            borderRadius: 6,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Typography
            fontSize={20}
            fontStyle={700}
            textAlign={"center"}
            style={{ paddingLeft: 10 }}
          >
            Summary Report
  
          
            <Button  onClick={()=>downloadReport()} variant="contained" color="primary">
              
              <DownloadIcon />   Download Excel
  
            </Button>
  
  
          </Typography>
         
        </Box>
  
        <Grid
          container
          sx={{
            flex: 1,
            background: "#FFF",
            borderRadius: 6,
            marginLeft: 3,
            marginRight: 3,
          }}
        >
          <Grid
            item={true}
            xs={12}
            md={12}
            lg={12}
            sx={{ background: "#FFF", borderRadius: 6 }}
          >
            <div
              style={{
                display: "table",
                tableLayout: "fixed",
                width: "97%",
                maxHeight: "400px",
              }}
            >
              <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 3 }}>
                <TableContainer
                  sx={{
                    height: '70vh', 
                    border: 1,
                    borderColor: "gray",
                  }}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {tableData.filteredHeaders.map(
                          (column, index) => (
                            <TableCell
                              key={column.id}
                              align={"left"}
                              style={{
                                minWidth: column.minWidth,
                                background: "#565656",
                                color: "#FFF",
                                borderBottom: 1,
                                fontStyle: "Bold",
                              }}
                            >
                              <Typography style={{ fontWeight: 600 }}>
                                {column}
                              </Typography>
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    </TableHead>
  
                    <TableBody>
                      {tableData.rowData.map((row) => (
                        <TableRow
                          key={row.municipalityName}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.2)", // Change this to your desired hover color
                            },
                          }}
                        >
                          {Object.values(row).map((value, index) => (
                            <TableCell key={index}>
                              <Typography
                                style={{
                                  fontWeight: 700,
                                  color: index === 0 ? "#074465" : "#000", // First element black, others red
                                }}
                              >
                                {value}
                              </Typography>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </>
    );
  };

  export default TableData;