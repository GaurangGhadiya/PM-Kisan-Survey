import React, { useEffect, useState } from "react";
import Layout from "../components/dashboard/layout";
import { useDispatch, useSelector } from "react-redux";
import { onCSCSurveyList } from "../network/actions/csc_survey";
import { onShowLoader } from "../network/actions/showLoader";
import { getToken } from "../utils/cookie";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { FaceRetouchingOffRounded } from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Modal,
  Pagination,
  Paper,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ClosedCaption } from "@mui/icons-material";
import ErrorSnack from "../utils/ErrorSnack";
import { TableBody } from "mui-datatables";
import Filters from "../components/dashboard/userFilters";
import { onCscReportDownload } from "../network/actions/downloadCscReport";

const columns = [
  {
    id: "districtName",
    label: "District",
    minWidth: 170,
    align: "center",
    fontWeight: "bold",
  },
  { id: "municipalName", label: "Municipal", minWidth: 100, align: "center" },
  {
    id: "wardNo",
    label: "wardNo",
    align: "center",
  },
  {
    id: "wardName",
    label: "Ward Name",
    minWidth: 170,
    align: "center",
  },
  {
    id: "userCSCId",
    label: "CSC Id",
    minWidth: 170,
    align: "center"
  },
  {
    id: "userName",
    label: "User Name",
    align: "center",
  },
  {
    id: "userMobileNumber",
    label: "Mobile Number",
    align: "center",
  },
  {
    id: "surveyFamilyCount",
    label: "Survey Family Count",
    align: "center",
  },


];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #83a2b2",
  boxShadow: 30,
  height: "90vh",
  overflow: "hidden",
  overflowY: "auto",
  p: 4,
  borderRadius: 2,
};

function CustomCellRenderer(params) {
  const cellValue = params.value;

  const cellHeight =
    cellValue && cellValue.length > 1 ? cellValue.length * 20 : 40; // Adjust the height factor (20) as needed

  // Customize the cell rendering as needed
  return (
    <div style={{ height: `${cellHeight}px`, overflow: "auto" }}>
      {cellValue.map((item, index) => (
        <Typography
          style={{ color: "red", fontWeight: "500" }}
          key={index}
          variant="h7"
          component="h3"
        >
          {item}
        </Typography>
      ))}
    </div>
  );
}

const VerifiedFamilyData = () => {
  const [wardId, setWardId] = useState();
  const [districtCode, setDistrictCode] = useState();
  const [municipalityId, setMunicipalityId] = useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [totalPage, setTotalPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [errorMessage, seterrorMessage] = React.useState("");

  const [totalPages, settotalPages] = React.useState(0);

  /**Handle Filters and Call the External Service */
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [selectedCSC, setselectedCSC] = useState(null);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null)
  const [CSCSurveyList, setCSCSurveyList] = useState([]);
  const dispatch = useDispatch();
  const cscSurveyReport = useSelector((state)=> state.cscSurveyList);
  const cscReportDownload = useSelector((state)=> state.cscReportDownload);

  
  const [isAdmin, setIsAdmin] = useState(false);

  const globalUser = getToken();
  const router = useRouter();

  useEffect(() => {
    const globalUser = JSON.parse(getToken());
    const { roles } = globalUser || {};
    // setIsAdmin(roles && roles.length > 0 && roles[0] === "Admin");
    setIsAdmin(
      roles &&
        roles.length > 0 &&
        (roles[0] === "Admin" || roles[0] === "Verifying Authority")
    );
  }, []);

  const handleFilterChange = ({ district, municipal, ward , userName, fromDate, toDate }) => {
  
    setSelectedDistrict(district);
    setSelectedMunicipality(municipal);
    setSelectedWard(ward);

    setselectedCSC(userName)
    setFromDate(fromDate)
    setToDate(toDate)
    
    const queryParams = createQueryParamsDefault(
      0,
      100,
      district?.code,
      municipal?.value,
      ward?.id,
      userName?.code,
      fromDate,
      toDate
    );
    dispatch(onCSCSurveyList(queryParams));
  };

  const handleCardClick = () => {
    setCardClicked(!isCardClicked);
  };


  const downloadReport = () =>{
    
    
      
      dispatch(
        
        onCscReportDownload(

        selectedWard?selectedWard.value:null,
       
        selectedMunicipality?selectedMunicipality.value:null, 
        selectedDistrict?selectedDistrict.code:null, 
        selectedCSC?selectedCSC.value:null,
        toDate || null,
        fromDate || null
        
        )
        
        )
    

  
  }

  const handleChangePage = (event, newPage) => {
   
    setPage(newPage);

    if (selectedDistrict || selectedMunicipality || selectedWard) {
      const queryParams = createQueryParamsDefault(
        newPage - 1,
        100,
        selectedDistrict?.code,
        selectedMunicipality?.municipalId,
        selectedWard?.id
      );
      dispatch(onCSCSurveyList(queryParams));
    } else {
      const globalUser = JSON.parse(getToken());
      const { districtDetail, municipalityDetail, ulb, roles } =
        globalUser || {};
      const queryParams = createQueryParamsDefault(
        newPage - 1,
        100,
        districtDetail?.districtCode,
        municipalityDetail?.municipalId,
        ulb?.id
      );
      dispatch(onCSCSurveyList(queryParams));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

 

  useEffect(() => {
    // Handle errors from the CSC survey report
    if (cscSurveyReport.error) {
      setOpen(true);
  
      if (cscSurveyReport.error.response?.data?.message) {
        seterrorMessage(cscSurveyReport.error.response.data.message);
      }
    }
  
    // Check if there is data in the CSC survey report
    if (cscSurveyReport?.data) {
      const { data, status, message, rationCardAlreadyExists } = cscSurveyReport.data || {};

      if (cscSurveyReport.data.data) {
      
        setTotalPage(cscSurveyReport.data.data.totalPages);

      }
  
      // Update CSCSurveyList state with the survey report data
      setCSCSurveyList(data);
    }
  
    // If needed, you can add more logic here based on the state changes
  
  }, [dispatch, cscSurveyReport]);



  const createQueryParamsDefault = (
    pageNumber,
    pageSize,
    selectedDistrict,
    selectedMunicipality,
    selectedWard,
    userName,
    fromDate,toDate
  ) => {
    const queryParams = {};
    if (pageNumber) queryParams.page = pageNumber;
    if (pageSize) queryParams.size = pageSize;
    if (selectedDistrict) queryParams.districtCode = selectedDistrict;
    if (selectedMunicipality) queryParams.municipalId = selectedMunicipality;
    if (selectedWard) queryParams.wardId = selectedWard;
    if (userName) queryParams.userName = userName;
    if (fromDate) queryParams.fromDate = fromDate;
    if (toDate) queryParams.toDate = toDate;

    return queryParams;
  };

  useEffect(() => {
    const globalUser = JSON.parse(getToken());
    const { districtDetail, municipalityDetail, ulb, roles } = globalUser || {};

    const queryParams = createQueryParamsDefault(
      0,
      100,
      districtDetail?.districtCode,
      municipalityDetail?.municipalId,
      ulb?.id
    );
    dispatch(onCSCSurveyList(queryParams));
  }, []);



  return (
    <>
      <Layout>
        <Grid container justifyContent={"center"} alignItems={"center"}>

            <Grid item lg={10}>
        <Filters onChange={handleFilterChange} downloadReport={downloadReport}/>

            </Grid>

          {/* <Grid item lg={2} mt={3}  >
              <Button onClick={()=>downloadReport()}  variant="contained">Download</Button>
          </Grid> */}
        </Grid>
        {errorMessage && (
          <ErrorSnack open={open} setOpen={setOpen} message={errorMessage} />
        )}
        <main className="p-6 space-y-6">
          <>
            {CSCSurveyList &&
            CSCSurveyList.content &&
            CSCSurveyList.content.length > 0 ? (
              <Grid container sx={{ background: "#FFF", borderRadius: 6 }}>
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
                      width: "100%",
                      maxHeight: "400px",
                    }}
                  >
                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                      <TableContainer sx={{ height: "65vh" }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns &&
                                columns.map((column, index) => (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                      minWidth: column.minWidth,
                                      background: "#074465",
                                      color: "#FFF",
                                    }}
                                  >
                                    {column.label}
                                  </TableCell>
                                ))}
                            </TableRow>
                          </TableHead>
                          {CSCSurveyList?.content &&
                            CSCSurveyList?.content.map((row, index2) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={index2}
                                >
                                  {columns.map((column, index) => {
                                    const value = row[column.id];
                                    return (
                                      <TableCell
                                        className="hoverable-cell"
                                        key={column.id}
                                        align={column.align}
                                        fontWeight={column.fontWeight}
                                      >
                                        {column.format &&
                                        typeof value === "number"
                                          ? column.format(value)
                                          : value}
                                        {index > 6 && (
                                          <>
                                            <Stack spacing={2} direction="row">
                                         

                                            </Stack>
                                          </>
                                        )}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                        </Table>
                      </TableContainer>

                      <Box
                        style={{
                          padding: 10,
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <Typography textAlign={"center"}>
                          Total Records Found: {CSCSurveyList.totalElements}
                        </Typography>
                        <Pagination
                          style={{
                            padding: 10,
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                          count={totalPage}
                          onChange={handleChangePage}
                          color="primary"
                        />
                      </Box>
                    </Paper>
                  </div>
                </Grid>
              </Grid>
            ) : (
              <div>
                {/* This is the "else" case, modify as needed */}
                <p>No data available.</p>
              </div>
            )}

            
          </>
        </main>
      </Layout>
    </>
  );
};

export default VerifiedFamilyData;
