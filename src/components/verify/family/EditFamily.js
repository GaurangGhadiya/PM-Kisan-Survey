import {
  Close,
  Delete,
  DoneAll,
  Error,
  More,
  RemoveRedEye,
  Save,
  Update,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Chip } from "@mui/material";
import ConfirmDialogEdit from "../ConfirmDialogEdit";
import { useEffect, useState } from "react";
import ConfirmDialogFamilyEdit from "../../dialogs/ConfirmDialogFamilyEdit";
import { DatePicker, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { onDistrict } from "../../../network/actions/district";
import { onMunicipalityList } from "../../../network/actions/municipality";
import { onWardList } from "../../../network/actions/wards";
import { onEconomicCategories } from "../../../network/actions/economicCategories";
import { onSocialCatList } from "../../../network/actions/socialCategories";
import { onResidentList } from "../../../network/actions/residentials";
import { onReligionList } from "../../../network/actions/religion";
import GenericModal from "../../generic/GenericModal";

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

export default function EditFamily({ onsave, selectedFamily }) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    updatedData: {},
    changedValues: {},
    existingData: {},
  });
  const [expanded, setExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableFamilyObject, setEditableFamilyObject] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [changedValues, setChangedValues] = useState({});

  const dispatch = useDispatch();

  const [districtList, setDistrictList] = useState([]);
  const district_reducer = useSelector((state) => state.district_reducer);
  const [selectedDistrictName, setselectedDistrictName] = useState();

  const [municipalityList, setMunicipalityList] = useState([]);
  const [municipalId, setMunicipalId] = useState("");
  const [selectedMunicipalityName, setSelectedMunicipalityName] = useState();
  const municipality_reducer = useSelector(
    (state) => state.municipality_reducer
  );

  const [wardList, setWardList] = useState([]);
  const [ward, setward] = useState("");
  const [wardId, setwardId] = useState("");
  const [selectedWardName, setSelectedWardName] = useState();
  const ward_reducer = useSelector((state) => state.ward_reducer);

  const [economicStatusList, setEconomicStatusList] = useState([]);
  const [selectedEconomicStatus, setSelectedEconomicStatus] = useState();
  const economic_reducer = useSelector((state) => state.economicCategories);

  const [socialCategoryList, setSocialCategoryList] = useState([]);
  const [selectedSocialCategory, setSelectedSocialCategory] = useState();
  const social_categories = useSelector((state) => state.social_categories);

  const [rsList, setRsList] = useState([]);
  const [selectedRs, setSsetSelectedRs] = useState();
  const residentList = useSelector((state) => state.residentList);

  const [religionList, setReligionList] = useState([]);
  const [selectedReligion, setSelectedReligion] = useState();
  const religion = useSelector((state) => state.religion);

  //headOfFamily
  const [headOfFamilyList, setHeadOfFamilyList] = useState([]);
  const [selectedHeadOfFamily, setSelectedHeadOfFamily] = useState();
  // const religion = useSelector((state) => state.religion);

  const [initialPropertyData, setInitialPropertyData] = useState({});
  const [currentDisplayData, setCurrentDisplayData] = useState({});
  const [editedValues, setEditedValues] = useState({});

  useEffect(() => {
    const extractedFamilyData = {
      districtName: selectedFamily.districtName,
      wardName: selectedFamily.wardName,
      houseAddress: selectedFamily.houseAddress,
      rationCardNo: selectedFamily.rationCardNo,
      economicStatus: selectedFamily.economicStatus,
      socialCategory: selectedFamily.socialCategory,
      religion: selectedFamily.religion,
      residentStatus: selectedFamily.residentStatus,
      headOfFamily: selectedFamily.headOfFamily,
      municipalName: selectedFamily.municipalName,
      membersDropDownList: selectedFamily.membersDropDownList,
    };
    setEditableFamilyObject(extractedFamilyData);
    setselectedDistrictName(extractedFamilyData?.districtName);
    setSelectedMunicipalityName(extractedFamilyData?.municipalName);
    setSelectedWardName(extractedFamilyData?.wardName);
    setSelectedEconomicStatus(extractedFamilyData?.economicStatus);
    setSelectedSocialCategory(extractedFamilyData?.socialCategory);
    setSsetSelectedRs(extractedFamilyData?.residentStatus);
    setSelectedReligion(extractedFamilyData?.religion);
    setSelectedHeadOfFamily(extractedFamilyData?.headOfFamily);
    setInitialPropertyData(extractedFamilyData);
  }, [selectedFamily]);

  useEffect(() => {
    // Update the current display data when selectedFamily changes
    setCurrentDisplayData(editableFamilyObject);
  }, [editableFamilyObject]);

  useEffect(() => {
    if (!isEditMode) {
      // Reset edited values when exiting edit mode
      setEditedValues({});
    }
  }, [isEditMode]);

  /**
   * District List
   */
  useEffect(() => {
    let districtList = [];
    if (district_reducer?.data) {
      const { data, status, message } = district_reducer.data || {};
      // setdistrictCalled(false);

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            districtCode: data[i].districtCode,
            districtName: data[i].districtName,
          };
          districtList.push(object);
        }
        setDistrictList(districtList);
        const newId =
          districtList.find(
            (option) => option.districtName === selectedDistrictName
          )?.districtCode || null;
        dispatch(onMunicipalityList(newId));
      }
    }
  }, [district_reducer, selectedDistrictName]);

  /**
   * Getting the Municipality List and Ward List Use Effect
   */
  useEffect(() => {
    let municipal_list = [];

    if (municipality_reducer?.data) {
      const { data, status, message } = municipality_reducer.data || {};

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            municipalName: data[i].municipalName,
            municipalId: data[i].municipalId,
          };
          municipal_list.push(object);
        }
        setMunicipalityList(municipal_list);
        const newId =
          municipalityList.find(
            (option) => option.municipalName === selectedMunicipalityName
          )?.municipalId || null;
        dispatch(onWardList(newId));
      }
    }
  }, [municipality_reducer, selectedMunicipalityName]);

  /**
   * Ward
   */
  useEffect(() => {
    let ward_list = [];

    if (ward_reducer?.data) {
      const { data, status, message } = ward_reducer.data || {};
      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            wardName: data[i].wardName, //+ " (" + data[i].wardNo + ")",
            id: data[i].id,
          };
          ward_list.push(object);
        }
        setWardList(ward_list);
      }
    }
  }, [ward_reducer]);

  /**
   * Economic Status
   */
  useEffect(() => {
    let economicStatus_List = [];

    if (economic_reducer?.data) {
      const { data, status, message } = economic_reducer.data || {};
      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            economicStatus: data[i].economicStatus, //+ " (" + data[i].wardNo + ")",
            id: data[i].id,
          };
          economicStatus_List.push(object);
        }
        setEconomicStatusList(economicStatus_List);
      }
    }
  }, [economic_reducer]);

  /**
   * Social Category
   */
  useEffect(() => {
    let socialCategoriesList = [];
    if (social_categories?.data) {
      const { data, status, message } = social_categories.data || {};
      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            socialCategoryNameEnglish: data[i].socialCategoryNameEnglish,
            id: data[i].id,
          };
          socialCategoriesList.push(object);
        }
        setSocialCategoryList(socialCategoriesList);
      }
    }
  }, [social_categories]);

  /**
   * Residential Stataus
   */
  useEffect(() => {
    let rsList = [];
    if (residentList?.data) {
      const { data, status, message } = residentList.data || {};
      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            residentStatus: data[i].residentStatus,
            id: data[i].id,
          };
          rsList.push(object);
        }
        setRsList(rsList);
      }
    }
  }, [residentList]);

  /**
   * Religion
   */
  useEffect(() => {
    let religionList = [];
    if (religion?.data) {
      const { data, status, message } = religion.data || {};
      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            religionName: data[i].religionName,
            id: data[i].id,
          };
          religionList.push(object);
        }
        setReligionList(religionList);
      }
    }
  }, [religion]);

  /**
   * Head of Family
   */
  /**
   * Religion
   */
  useEffect(() => {
    let headOfFamilyList = [];
    if (editableFamilyObject?.membersDropDownList) {
      for (
        let i = 0;
        i < editableFamilyObject?.membersDropDownList.length;
        i++
      ) {
        let object = {
          himMemberId: editableFamilyObject?.membersDropDownList[i].himMemberId,
          name: editableFamilyObject?.membersDropDownList[i].name,
        };
        headOfFamilyList.push(object);
      }
      setHeadOfFamilyList(headOfFamilyList);
    }
  }, [editableFamilyObject]);

  const handleViewOrCloseClick = () => {
    setExpanded(!expanded);
    setIsEditMode(false);

    if (isEditMode) {
      setExtractedPropertyData(initialPropertyData);
      setEditedValues({});
      setCurrentDisplayData(initialPropertyData);
    }
  };

  const handleEditClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmEdit = (editableFamilyObject) => {
    setOpenDialog(false);
    setExpanded(true);
    setIsEditMode(true);
    dispatch(onDistrict());
    dispatch(onEconomicCategories());
    dispatch(onSocialCatList());
    dispatch(onResidentList());
    dispatch(onReligionList());
  };

  const handleCancelEdit = () => {
    setOpenDialog(false);
    //setEditableMemberObject(editableFamilyObject);
  };

  const handleCloseClick = () => {
    setIsEditMode(false);
    setExpanded(false); // Optionally, collapse the accordion here

    setEditableFamilyObject(initialPropertyData);
    setChangedValues({});

    setselectedDistrictName(initialPropertyData?.districtName);
    setSelectedMunicipalityName(initialPropertyData?.municipalName);
    setSelectedWardName(initialPropertyData?.wardName);
    setSelectedEconomicStatus(initialPropertyData?.economicStatus);
    setSelectedSocialCategory(initialPropertyData?.socialCategory);
    setSsetSelectedRs(initialPropertyData?.residentStatus);
    setSelectedReligion(initialPropertyData?.religion);
    setSelectedHeadOfFamily(initialPropertyData?.membersDropDownList);
  };

  // Generic Modal Buttons

  const handleProceedModal = () => {
    setShowModal(false);
    onsave(modalData);
  };

  const handleCancelModal = () => {
    setShowModal(false);
  };

  // const resetEditableFamilyObject = () => {
  //   setEditableFamilyObject(extractedFamilyData);
  //   setChangedValues({});
  // };

  /**
   * Handle Save
   * Save the Edited Data to Service
   */
  const handleSaveChanges = () => {
   
    if (Object.keys(changedValues).length === 0) {
      alert("No changes detected");
      return;
    }

    const updatedFamilyData = { ...editableFamilyObject, ...changedValues };
    delete updatedFamilyData.membersDropDownList;
    delete initialPropertyData.membersDropDownList;

    setShowModal(true);
    setModalData({
      updatedData: updatedFamilyData,
      changedValues: changedValues,
      existingData: initialPropertyData,
    });
  };

  const renderFamilyFields = (key, value, options = {}) => {
    // Use the value from changedValues if it exists, otherwise use the value
    const currentValue =
      changedValues[key] !== undefined ? changedValues[key] : value;

    if (isEditMode) {
      switch (key) {
        case "districtName":
          return (
            <TextField
              key={key}
              label={key}
              value={currentValue}
              disabled={true}
              onChange={(e) => {
                setChangedValues((prevValues) => ({
                  ...prevValues,
                  [key]: e.target.value,
                }));
              }}
            />
          );

        case "municipalName":
          return (
            <TextField
              key={key}
              label={key}
              value={currentValue}
              disabled={true}
              onChange={(e) => {
                setChangedValues((prevValues) => ({
                  ...prevValues,
                  [key]: e.target.value,
                }));
              }}
            />
          );

        case "wardName":
          return (
            <TextField
              key={key}
              label={key}
              value={currentValue}
              disabled={true}
              onChange={(e) => {
                setChangedValues((prevValues) => ({
                  ...prevValues,
                  [key]: e.target.value,
                }));
              }}
            />
          );

        case "rationCardNo":
          return (
            <TextField
              key={key}
              label={key}
              value={currentValue}
              disabled={currentValue != "" || currentValue != null} // Disable if null, undefined, or empty
              onChange={(e) => {
                setChangedValues((prevValues) => ({
                  ...prevValues,
                  [key]: e.target.value,
                }));
              }}
            />
          );

        case "economicStatus":
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedEconomicStatus}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedEconomicStatus(newName);

                  const newId =
                    options.economicStatus.find(
                      (option) => option.economicStatus === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: {
                      id: newId,
                      economicStatus: newName,
                    },
                  }));
                }}
              >
                {economicStatusList.map((option) => (
                  <MenuItem key={option.id} value={option.economicStatus}>
                    {option.economicStatus}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        case "socialCategory":
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedSocialCategory}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedSocialCategory(newName);

                  const newId =
                    options.socialCategory.find(
                      (option) => option.socialCategoryNameEnglish === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: {
                      id: newId,
                      socialCategoryNameEnglish: newName,
                    },
                  }));
                }}
              >
                {socialCategoryList.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.socialCategoryNameEnglish}
                  >
                    {option.socialCategoryNameEnglish}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );

        case "residentStatus":
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedRs}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSsetSelectedRs(newName);

                  const newId =
                    options.residentStatus.find(
                      (option) => option.residentStatus === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: {
                      id: newId,
                      residentStatus: newName,
                    },
                  }));
                }}
              >
                {rsList.map((option) => (
                  <MenuItem key={option.id} value={option.residentStatus}>
                    {option.residentStatus}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        case "religion":
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedReligion}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedReligion(newName);

                  const newId =
                    options.religion.find(
                      (option) => option.religionName === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: {
                      id: newId,
                      religionName: newName,
                    },
                  }));
                }}
              >
                {religionList.map((option) => (
                  <MenuItem key={option.id} value={option.religionName}>
                    {option.religionName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        case "headOfFamily":
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedHeadOfFamily}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedHeadOfFamily(newName);

                  const newId =
                    options.headOfFamily.find(
                      (option) => option.name === newName
                    )?.himMemberId || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: {
                      himMemberId: newId,
                      name: newName,
                    },
                  }));
                }}
              >
                {headOfFamilyList.map((option) => (
                  <MenuItem key={option.himMemberId} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        default:
          return (
            <TextField
              key={key}
              label={key}
              value={currentValue}
              onChange={(e) => {
                setChangedValues((prevValues) => ({
                  ...prevValues,
                  [key]: e.target.value,
                }));
              }}
            />
          );
      }
    } else {
      <Typography key={key}>{`${key}: ${currentDisplayData[key]}`}</Typography>;
    }
  };

  return (
    <>
      <div>
        <Accordion expanded={expanded}>
          <Box display="flex" alignItems="center" width="100%">
            <Box flexBasis="80%">
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{
                  backgroundColor: "#FFF",
                  color: "#074465",
                  borderRadius: 5,
                }}
              >
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(4, 1fr)"
                  width="100%"
                  gap={1}
                >
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {editableFamilyObject.headOfFamily}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {editableFamilyObject.rationCardNo}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {editableFamilyObject.economicStatus}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {editableFamilyObject.socialCategory}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
            </Box>
            <Box
              flexBasis="20%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {!expanded && !isEditMode && (
                <>
                  <Button
                    style={{ color: "#344147" }}
                    startIcon={<More />}
                    onClick={handleViewOrCloseClick}
                  >
                    More
                  </Button>
                  <Button
                    style={{ color: "#42a5f5" }}
                    startIcon={<Update />}
                    onClick={() => {
                      handleEditClick(editableFamilyObject);
                    }}
                  >
                    Edit
                  </Button>
                </>
              )}
              {expanded && !isEditMode && (
                <>
                  <Button
                    onClick={handleViewOrCloseClick}
                    style={{ color: "#A04040" }}
                    endIcon={<Close />}
                  >
                    Close
                  </Button>
                  <Button
                    style={{ color: "#42a5f5" }}
                    startIcon={<Update />}
                    // onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                </>
              )}
              {isEditMode && (
                <>
                  <Button
                    onClick={handleSaveChanges}
                    startIcon={<Save />}
                    style={{ color: "#28a745" }}
                  >
                    Save
                  </Button>

                  <Button
                    onClick={handleCloseClick}
                    style={{ color: "#A04040" }}
                    startIcon={<Close />}
                  >
                    Close
                  </Button>
                </>
              )}
            </Box>
          </Box>

          <AccordionDetails>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gap={2}
              style={{
                borderTop: "2px dashed #ccc",
                padding: "10px",
              }}
            >
              {Object.entries(currentDisplayData).map(([key, value]) => {
                if (key === "membersDropDownList") return null; // Skip rendering for "membersDropDownList"
                return (
                  <Box
                    gridColumn="span 1"
                    key={key}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      wordWrap: "break-word",
                      padding: "5px",
                    }}
                  >
                    <Box
                      style={{
                        flex: 1,
                        textAlign: "right",
                        paddingRight: "5px",
                        fontWeight: "bold",
                        color: "#396984",
                      }}
                    >
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .charAt(0)
                        .toUpperCase() +
                        key
                          .replace(/([A-Z])/g, " $1")
                          .trim()
                          .slice(1)}
                      :
                    </Box>
                    <Box
                      style={{
                        flex: 1,
                        textAlign: "left",
                        fontWeight: "bold",
                        paddingLeft: "5px",
                        color: "#555",
                      }}
                    >
                      {isEditMode
                        ? renderFamilyFields(key, value?.toString(), {
                            districtName: districtList,
                            municipalName: municipalityList,
                            wardName: wardList,
                            economicStatus: economicStatusList,
                            socialCategory: socialCategoryList,
                            residentStatus: rsList,
                            religion: religionList,
                            headOfFamily: headOfFamilyList,
                          })
                        : value?.toString()}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>
      <ConfirmDialogFamilyEdit
        open={openDialog}
        handleConfirm={() => handleConfirmEdit(editableFamilyObject)}
        handleCancel={handleCancelEdit}
        editableFamilyObject={editableFamilyObject}
        sx={{ width: "50%", maxWidth: "600px", mx: "auto" }}
      />

      {/* Modla */}
      <GenericModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalData={modalData}
        onProceed={handleProceedModal}
        onCancel={handleCancelModal}
        parentClass="Family"
      />
    </>
  );
}
