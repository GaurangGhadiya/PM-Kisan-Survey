import React, { useEffect, useState } from "react";
import Layout from "../components/dashboard/layout";
import { useDispatch, useSelector } from "react-redux";
import { onFamiliesList } from "../network/actions/familiesList";
import { onFamiliesDetailApi } from "../network/actions/familyDetailApi";
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
import Filters from "../components/dashboard/filters";
import Members from "../components/verify/members/Members";
import FamilyDetails from "../components/verify/family/FamilyDetails";
import FamilyDetailsHeader from "../components/verify/family/FamilyDetailsHeader";
import MemberDetailsHeader from "../components/verify/members/MemberDetailsHeader";
import EditFamily from "../components/verify/family/EditFamily";
import Families from "../components/verify/family/Families";

const columns = [
  {
    id: "headOfFamily",
    label: "Head of Family",
    minWidth: 170,
    align: "center",
    fontWeight: "bold",
  },
  { id: "rationCardNo", label: "Ration No.", minWidth: 100, align: "center" },
  {
    id: "membersCount",
    label: "Total Members",
    align: "center",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "economicStatus",
    label: "Economic Status",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "socialCategory",
    label: "Social Category",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "religion",
    label: "Religion",
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "residentStatus",
    label: "Resident",
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "view",
    label: "Action",
    align: "center",
    format: (value) => value.toFixed(2),
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

  const [selectedItems, setSelectedItems] = useState([]);
  const [familyList, setfamilyList] = useState([]);
  const [selectedFamily, setselectedFamily] = useState({});
  const [detailCalled, setdetailCalled] = useState(false);
  const [isCardClicked, setCardClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  const dispatch = useDispatch();
  const familiesList = useSelector((state) => state.familiesList);
  const familiesDetailApi = useSelector((state) => state.familiesDetailApi);

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

  const handleFilterChange = ({ district, municipal, ward }) => {
    setSelectedDistrict(district);
    setSelectedMunicipality(municipal);
    setSelectedWard(ward);
    const queryParams = createQueryParamsDefault(
      0,
      100,
      district?.code,
      municipal?.value,
      ward?.id,
      2
    );
    dispatch(onFamiliesList(queryParams));
  };

  const handleCardClick = () => {
    setCardClicked(!isCardClicked);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    if (selectedDistrict || selectedMunicipality || selectedWard) {
      const queryParams = createQueryParamsDefault(
        newPage - 1,
        100,
        selectedDistrict?.code,
        selectedMunicipality?.municipalId,
        selectedWard?.id,
        2
      );
      dispatch(onFamiliesList(queryParams));
    } else {
      const globalUser = JSON.parse(getToken());
      const { districtDetail, municipalityDetail, ulb, roles } =
        globalUser || {};
      const queryParams = createQueryParamsDefault(
        newPage - 1,
        100,
        districtDetail?.districtCode,
        municipalityDetail?.municipalId,
        ulb?.id,
        2
      );
      dispatch(onFamiliesList(queryParams));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (familiesDetailApi?.data) {
      const { data, status, message, rationCardAlreadyExists } =
        familiesList.data || {};
      setShowModal(true);
      // setrationList(data);

      setselectedFamily(familiesDetailApi.data);
      setdetailCalled(false);
    }
  }, [familiesDetailApi]);

  useEffect(() => {
    setShowModal(false);
    if (familiesList.error) {
      setOpen(true);

      if (familiesList.error.response.data.message) {
        seterrorMessage(familiesList.error.response.data.message);
      }
    }
    if (familiesList?.data) {
      const { data, status, message, rationCardAlreadyExists } =
        familiesList.data || {};

      //dispatch(onShowLoader(true));

      // setrationList(data);

      if (familiesList.data.totalPages) {
        setTotalPage(familiesList.data.totalPages);
      }

      setfamilyList(familiesList.data);
    } else {
      //console.warn(familiesList.);
    }
  }, [dispatch, familiesList]);

  const createQueryParamsDefault = (
    pageNumber,
    pageSize,
    selectedDistrict,
    selectedMunicipality,
    selectedWard,
    verificationStatusId
  ) => {
    const queryParams = {};
    if (pageNumber) queryParams.page = pageNumber;
    if (pageSize) queryParams.size = pageSize;
    if (selectedDistrict) queryParams.districtCode = selectedDistrict;
    if (selectedMunicipality) queryParams.municipalId = selectedMunicipality;
    if (selectedWard) queryParams.wardId = selectedWard;
    if (verificationStatusId)
      queryParams.verificationStatusId = verificationStatusId;


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
      ulb?.id,
      2
    );
    dispatch(onFamiliesList(queryParams));
  }, []);

  //Testing Working Code
  const handleSendtoedit = (himParivarId, RationCard) => {

    // Construct the URL with query parameters
    const queryParam = new URLSearchParams({
      himParivarId,
      RationCard,
    }).toString();
    router.push(`/edit_modify?${queryParam}`);
  };

  return (
    <>
      <Layout>
        <Filters onChange={handleFilterChange} />
        {errorMessage && (
          <ErrorSnack open={open} setOpen={setOpen} message={errorMessage} />
        )}
        <main className="p-6 space-y-6">
          <>
            {familyList &&
            familyList.content &&
            familyList.content.length > 0 ? (
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
                          {familyList?.content &&
                            familyList?.content.map((row, index2) => {
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
                                              {/* {isAdmin && (
                                                <Button
                                                  color="success"
                                                  startIcon={
                                                    <RemoveRedEyeIcon />
                                                  }
                                                  onClick={(handleEvent) => {
                                                    
                                                    setSelectedItems(row);
                                                    setdetailCalled(true);
                                                    dispatch(
                                                      onFamiliesDetailApi(
                                                        row.himParivarId,
                                                        row.rationCardNo
                                                      )
                                                    );
                                                  }}
                                                >
                                                  View
                                                </Button>
                                              )} */}
                                              {/* {isAdmin && (
                                                <Button
                                                  color="error"
                                                  startIcon={<ModeEditIcon />}
                                                  onClick={() =>
                                                    handleSendtoedit(
                                                      row.himParivarId,
                                                      row.rationCardNo
                                                    )
                                                  }
                                                >
                                                  Verify
                                                </Button>
                                              )} */}

                                              <Button
                                                color="success"
                                                startIcon={<RemoveRedEyeIcon />}
                                                onClick={(handleEvent) => {
                                                  setSelectedItems(row);
                                                  setdetailCalled(true);
                                                  dispatch(
                                                    onFamiliesDetailApi(
                                                      row.himParivarId,
                                                      row.rationCardNo
                                                    )
                                                  );
                                                }}
                                              >
                                                View
                                              </Button>
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
                          Total Records Found: {familyList.totalElements}
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

            <div className="p-4 flex-grow">
              <Modal
                open={showModal}
                onClose={() => {
                  setShowModal(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div style={{}}>
                    <Grid container>
                      <Grid item={true} xs={11.5}>
                        <FamilyDetailsHeader />
                      </Grid>

                      <Grid
                        item={true}
                        xs={0.5}
                        style={{
                          justifyContent: "flex-end",
                          alignContent: "flex-end",
                          alignItems: "flex-end",
                        }}
                      >
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => setShowModal(false)}
                        >
                          <HighlightOffIcon fontSize="medium" />
                        </IconButton>
                      </Grid>
                    </Grid>

                    <Paper elevation={3} variant="elevation">
                      <Families selectedFamily={selectedFamily} />
                    </Paper>
                    <Divider>&nbsp; &nbsp;</Divider>
                    <Grid container>
                      <Grid item={true} xs={12}>
                        <MemberDetailsHeader />
                      </Grid>
                    </Grid>
                    {selectedFamily?.members &&
                      selectedFamily?.members.map((memberObject, index) => (
                        <Paper
                          elevation={3}
                          variant="elevation"
                          style={{ marginBottom: 8 }}
                          key={index}
                        >
                          <Members memberObject={memberObject} />
                        </Paper>
                      ))}
                  </div>
                </Box>
              </Modal>
            </div>
          </>
        </main>
      </Layout>
    </>
  );
};

export default VerifiedFamilyData;
