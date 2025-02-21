import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  Modal,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";

import { onRationDetails } from "../network/actions/rationSearch";
import { useDispatch, useSelector } from "react-redux";

import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { FaceRetouchingOffRounded } from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";

import { onFamiliesList } from "../network/actions/familiesList";
import { onFamiliesDetailApi } from "../network/actions/familyDetailApi";
import { TopCard } from "./TopCard";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";

import TableRow from "@mui/material/TableRow";

import { onShowLoader } from "../network/actions/showLoader";
import Filters from "./dashboard/filters";
import { getToken } from "../utils/cookie";
import { onDashboarFilters } from "../network/actions/dashboardFilter";

const columns = [
  { id: "headOfFamily", label: "Head of Family", minWidth: 170 },
  { id: "rationCardNo", label: "Ration No.", minWidth: 100 },
  {
    id: "municipalName",
    label: "Municipality",
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "economicStatus",
    label: "Economic Status",
    minWidth: 170,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "wardName",
    label: "Ward Name",
    minWidth: 120,
    align: "left",
    format: (value) => value.toFixed(2),
  },

  {
    id: "socialCategory",
    label: "Social Category",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "religion",
    label: "Religion",
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "residentStatus",
    label: "Resident",
    align: "left",
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
  // border: '2px solid #000',
  boxShadow: 30,
  maxHeight: "80vh",
  overflow: "hidden",
  overflowY: "auto",
  p: 4,
  borderRadius: 1,
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

const Dashboard = () => {


  /**Handle Filters and Call the External Service */
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedVillage, setSelectDisabledVillage] = useState(null);

  /**
   * Dashboard Object
   */
  const [surveyInfo, setSurveyInfo] = useState([]);
  const [verificationInfoList, setVerificationInfoList] = useState([]);
  const [aadhaarEkycInfoList, setAadhaarEkycInfoList] = useState([]);
  const [economicCategoryInfoList, setEconomicCategoryInfoList] = useState([]);
  const [retainInInfoList, setRetainInInfoList] = useState([]);


  const dispatch = useDispatch();
  const dashboardFilterState = useSelector(
    (state) => state.dashboardFilterRedux
  );


  const handleFilterChange = ({ district, municipal, ward,village }) => {
    setSelectedDistrict(district);
    setSelectedMunicipality(municipal);
    setSelectedWard(ward);
    setSelectDisabledVillage(village)

    // if (district || municipal || ward || village) {
      const queryParams = createQueryParams(district, municipal?.value, ward?.value, village?.value);
      dispatch(onDashboarFilters(queryParams));
    // }
  };

  const createQueryParams = (
    selectedDistrict,
    selectedMunicipality,
    selectedWard,
    selectedVillage
  ) => {
    const queryParams = {};
    queryParams.districtId =
      selectedDistrict &&
      selectedDistrict.code !== null &&
      selectedDistrict.code !== undefined
        ? selectedDistrict.code
        : selectedDistrict;
    queryParams.municipalId =
      selectedMunicipality &&
      selectedMunicipality.value !== null &&
      selectedMunicipality.value !== undefined
        ? selectedMunicipality.value
        : selectedMunicipality;
    queryParams.wardId =
      selectedWard &&
      selectedWard.value !== null &&
      selectedWard.value !== undefined
        ? selectedWard.value
        : selectedWard;
    queryParams.villageId =
      selectedVillage &&
      selectedVillage.value !== null &&
      selectedVillage.value !== undefined
        ? selectedVillage.value
        : selectedVillage;

    // if (selectedMunicipality) queryParams.municipalId = selectedMunicipality;
    // if (selectedWard) queryParams.wardId = selectedWard;
    // if (selectedVillage) queryParams.villageId = selectedVillage;
    return queryParams;
  };

  const createQueryParamsDefault = (
    selectedDistrict,
    selectedMunicipality,
    selectedWard,
    selectedVillage
  ) => {
    const queryParams = {};

    if (selectedDistrict) queryParams.districtId = selectedDistrict;
    if (selectedMunicipality) queryParams.municipalId = selectedMunicipality;
    if (selectedWard) queryParams.wardId = selectedWard;
    if (selectedVillage) queryParams.villageId = selectedVillage;

    return queryParams;
  };

  /**
   * Calling the Use Effect with Default Ward ID, Municipality Id and District ID
   * Getting the Values from Global User
   * createQueryParamsDefault function is used to create parameters
   */

  useEffect(() => {
    try {
      const globalUser = getToken();
      const { districtDetail, municipalityDetail, ulb, roles } =
        globalUser || {};

      const queryParams = createQueryParamsDefault(
        districtDetail?.districtCode,
        municipalityDetail?.municipalId,
        ulb?.id
      );
      dispatch(onDashboarFilters(queryParams));
    } catch (e) {
      console.log("abcd",e)
    }
  }, []);

  /**
   * Calling the Use Effect with On Onchange event of District, Municipality and Ward
   * Getting the Values from Global User
   * createQueryParams function is used
   */

  useEffect(() => {
    if (selectedDistrict || selectedMunicipality || selectedWard) {
      const queryParams = createQueryParams(
        selectedDistrict,
        selectedMunicipality,
        selectedWard
      );
      // dispatch(onDashboarFilters(queryParams));
    }
  }, [
    dispatch,
    setSelectedDistrict,
    selectedDistrict,
    selectedMunicipality,
    selectedWard,
  ]);

  /**
   * Effect for logging or reacting to state changes
   * dispatch(onDashboarFilters(queryParams)); Redux
   */
  useEffect(() => {
    if (dashboardFilterState?.data) {
      // const { data, status, message } = dashboardFilterState.data || {};
      if (dashboardFilterState?.data) {
        // Set the parsed data to state variables
        setSurveyInfo(dashboardFilterState?.data?.surveyInfoList);
        setVerificationInfoList(dashboardFilterState?.data?.verificationInfoList);
        setAadhaarEkycInfoList(dashboardFilterState?.data?.aadhaarEkycInfoList);
        setEconomicCategoryInfoList(dashboardFilterState?.data?.economicCategoryInfoList);
        setRetainInInfoList(dashboardFilterState?.data?.retainInInfoList);


      } else {
        console.warn("No data in dashboardFilterState");
      }
    } else {
      console.warn("No data in dashboardFilterState");
    }
  }, [dashboardFilterState]);

  return (
    <>
      <Filters onChange={handleFilterChange} />
      <main className="p-6 space-y-6">
        {surveyInfo?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Survey Status
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={surveyInfo.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? item.headerValueCount : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}

        {verificationInfoList?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Verification Status
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={verificationInfoList.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? item.headerValueCount : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}

        {aadhaarEkycInfoList?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Aadhaar eKYC Status
              </Typography>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={aadhaarEkycInfoList.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? item.headerValueCount : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}



      {economicCategoryInfoList?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Economic Status (Family)
              </Typography>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={economicCategoryInfoList.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? item.headerValueCount : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}



      {retainInInfoList?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
               Urban / Rural Family Retention  Status
              </Typography>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={retainInInfoList.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? item.headerValueCount : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}


      </main>
    </>
  );
};

export default Dashboard;
