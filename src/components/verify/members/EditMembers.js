import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  Close,
  Delete,
  DoneAll,
  Edit,
  EditAttributes,
  EditAttributesOutlined,
  EditAttributesRounded,
  EditAttributesTwoTone,
  Error,
  ErrorOutline,
  ExpandMore,
  FileDownload,
  More,
  PictureInPicture,
  RemoveRedEye,
  Save,
  Update,
  Visibility,
} from "@mui/icons-material";
import ConfirmDialogEdit from "../ConfirmDialogEdit";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { onGenderList } from "../../../network/actions/genders";
import { onRelationList } from "../../../network/actions/relations";
import { onQualificationsList } from "../../../network/actions/qualifications";
import { onOccupationList } from "../../../network/actions/occupations";
import GenericModal from "../../generic/GenericModal";

export default function EditMembers({ onsave, memberObject }) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    updatedData: {},
    changedValues: {},
    existingData: {},
  });

  const [expanded, setExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableMemberObject, setEditableMemberObject] = useState({});

  const [genderList, setGenderList] = useState([]);
  const gender_reducer = useSelector((state) => state.gender);
  const [selectedGenderName, setSelectedGenderName] = useState();

  const [relationsList, setRelationsList] = useState([]);
  const relations_reducer = useSelector((state) => state.relations);
  const [selectedRelationName, setSelectedRelationName] = useState();

  const [qualificationList, setQualificationList] = useState([]);
  const qualifications_reducer = useSelector((state) => state.qualifications);
  const [selectedQualification, setSelectedQualification] = useState();

  const [occupationList, setOccupationList] = useState([]);
  const occupation_reducer = useSelector((state) => state.occupations);
  const [selectedOccupation, setSelectedOccupation] = useState();

  const [openDialog, setOpenDialog] = useState(false);
  const [changedValues, setChangedValues] = useState({});

  const dispatch = useDispatch();

  const [editedValues, setEditedValues] = useState({});
  const [initialPropertyData, setInitialPropertyData] = useState({});

  const [currentDisplayData, setCurrentDisplayData] = useState({});

  const [showModalImage, setShowModalImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [enlarged, setEnlarged] = useState(false);

  const handleToggleEnlarged = () => {
    setEnlarged(!enlarged);
  };

  useEffect(() => {
    setEditableMemberObject({ memberObject });
    setSelectedGenderName(memberObject.gender);
    setSelectedRelationName(memberObject.relation);
    setSelectedQualification(memberObject.educationQualification);
    setSelectedOccupation(memberObject.occupation);
    setInitialPropertyData(memberObject);
  }, [memberObject]);

  useEffect(() => {
    // Update the current display data when selectedFamily changes
    setCurrentDisplayData(memberObject);
  }, [memberObject]);

  useEffect(() => {
    if (!isEditMode) {
      // Reset edited values when exiting edit mode
      setEditedValues({});
    }
  }, [isEditMode]);

  /**


  /**
   * Gender List
   */
  useEffect(() => {
    let genderList = [];
    if (gender_reducer?.data) {
      const { data, status, message } = gender_reducer.data || {};
      // setdistrictCalled(false);

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            id: data[i].id,
            genderName: data[i].genderName,
          };
          genderList.push(object);
        }
        setGenderList(genderList);
      }
    }
  }, [gender_reducer]);

  /**
   * Relations List
   */
  useEffect(() => {
    let relationList = [];

    if (relations_reducer?.data) {
      const { data, status, message } = relations_reducer.data || {};
      // setdistrictCalled(false);

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            id: data[i].id,
            relationNameEnglish: data[i].relationNameEnglish,
          };
          relationList.push(object);
        }
        setRelationsList(relationList);
      }
    }
  }, [relations_reducer]);

  /**
   * onQualificationsList
   * Qualifications
   */
  useEffect(() => {
    let qualificationList = [];

    if (qualifications_reducer?.data) {
      const { data, status, message } = qualifications_reducer.data || {};
      // setdistrictCalled(false);

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            id: data[i].id,
            educationQualificationEnglish:
              data[i].educationQualificationEnglish,
          };
          qualificationList.push(object);
        }
        setQualificationList(qualificationList);
      }
    }
  }, [qualifications_reducer]);

  /**
   * Occupation List
   */
  useEffect(() => {
    let occupationList = [];

    if (occupation_reducer?.data) {
      const { data, status, message } = occupation_reducer.data || {};
      // setdistrictCalled(false);

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            id: data[i].id,
            professionName: data[i].professionName,
          };
          occupationList.push(object);
        }
        setOccupationList(occupationList);
      }
    }
  }, [occupation_reducer]);

  const handleViewOrCloseClick = () => {
    setExpanded(!expanded);
    setIsEditMode(false);
    if (isEditMode) {
      setEditableMemberObject(initialPropertyData);
      setEditedValues({});
      setCurrentDisplayData(initialPropertyData);
    }
  };

  const handleEditClick = () => {
    setOpenDialog(true);
  };
  const handleConfirmEdit = (editableMemberObject) => {
    setOpenDialog(false);
    setExpanded(true);
    setIsEditMode(true);
    dispatch(onGenderList());
    dispatch(onRelationList());
    dispatch(onQualificationsList());
    dispatch(onOccupationList());
  };

  const handleCancelEdit = () => {
    setOpenDialog(false);
  };

  const handleCloseClick = () => {
    setIsEditMode(false);
    setExpanded(false); // Optionally, collapse the accordion here

    setEditableMemberObject(initialPropertyData);
    setChangedValues({});
    setSelectedGenderName(initialPropertyData.gender);
    setSelectedRelationName(initialPropertyData.relation);
    setSelectedQualification(initialPropertyData.educationQualification);
    setSelectedOccupation(initialPropertyData.occupation);
  };

  /**
   * View Image
   */
  const handleViewAadhaarDocument = (currentValue) => {
    // Logic to show Aadhaar image on button click
    // For example, set the image URL and open the modal
    setImageUrl(currentValue);
    setShowModalImage(true);
  };

  /**
   * Handle Save
   * Save the Edited Data to Service
   */
  const handleSaveChanges = () => {
    // Here you can also merge the changes into memberData or send to a server

    if (Object.keys(changedValues).length === 0) {
      alert("No changes detected");
      return;
    }

    const updatedMemberData = { ...memberObject, ...changedValues };

    setShowModal(true);
    setModalData({
      updatedData: updatedMemberData,
      changedValues: changedValues,
      existingData: initialPropertyData,
    });
    //setChangedValues({});
  };

  const handleProceedModal = () => {
    setShowModal(false);
    onsave(modalData);
  };

  const handleCancelModal = () => {
    // Logic to handle the "Cancel" action when the user clicks the button
    // For example, you might want to reset the changes or perform other actions

    // Close the modal if needed
    setShowModal(false);
  };

  const renderMemberFields = (key, value, options = {}) => {
    // Use the value from changedValues if it exists, otherwise use the value
    const currentValue =
      changedValues[key] !== undefined ? changedValues[key] : value;

    if (isEditMode) {
      switch (key) {
        case "dateOfBirth":
          return (
            <>
              <Space direction="vertical">
                <DatePicker
                  key={key}
                  label={key}
                  defaultValue={value ? dayjs(value, "DD-MM-YYYY") : null}
                  format="DD-MM-YYYY"
                  disabledDate={(current) => {
                    return current && current > dayjs().endOf("day");
                  }}
                  onChange={(date, dateString) => {
                    if (date) {
                      setChangedValues((prevValues) => ({
                        ...prevValues,
                        [key]: dateString,
                      }));
                    } else {
                      setChangedValues((prevValues) => ({
                        ...prevValues,
                        [key]: null,
                      }));
                    }
                  }}
                />
              </Space>
            </>
          );

        case "gender":
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedGenderName}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedGenderName(newName);

                  const newId =
                    options.gender.find(
                      (option) => option.genderName === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: { id: newId, genderName: newName },
                  }));
                }}
              >
                {genderList.map((option) => (
                  <MenuItem key={option.id} value={option.genderName}>
                    {option.genderName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );

        case "aadhaarNumber":
          return (
            <TextField
              key={key}
              label={key}
              disabled={true}
              value={currentValue}
              onChange={(e) => {
                // Limit input to 10 characters
                if (e.target.value.length <= 12) {
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: e.target.value,
                  }));
                }
              }}
            />
          );

        case "relation":
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedRelationName}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedRelationName(newName);

                  const newId =
                    options.relation.find(
                      (option) => option.relationNameEnglish === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: { id: newId, relationNameEnglish: newName },
                  }));
                }}
              >
                {relationsList.map((option) => (
                  <MenuItem key={option.id} value={option.relationNameEnglish}>
                    {option.relationNameEnglish}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        case "educationQualification":
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedQualification}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedQualification(newName);

                  const newId =
                    options.educationQualification.find(
                      (option) =>
                        option.educationQualificationEnglish === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: {
                      id: newId,
                      educationQualificationEnglish: newName,
                    },
                  }));
                }}
              >
                {qualificationList.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.educationQualificationEnglish}
                  >
                    {option.educationQualificationEnglish}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        case "occupation":
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedOccupation}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedOccupation(newName);

                  const newId =
                    options.occupation.find(
                      (option) => option.professionName === newName
                    )?.id || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: {
                      id: newId,
                      professionName: newName,
                    },
                  }));
                }}
              >
                {occupationList.map((option) => (
                  <MenuItem key={option.id} value={option.professionName}>
                    {option.professionName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        case "mobileNumber":
          return (
            <TextField
              key={key}
              label={key}
              type="number"
              value={currentValue}
              onChange={(e) => {
                // Limit input to 10 characters
                if (e.target.value.length <= 10) {
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: e.target.value,
                  }));
                }
              }}
            />
          );
        case "aadhaarDocument":
          if (currentValue) {
            return (
              <div>
                <img
                  src={currentValue}
                  alt="Aadhaar Document"
                  style={{ height: "200px", width: "auto" }} // Set height to 200 pixels and let the width adjust automatically
                  onClick={handleToggleEnlarged} // Toggle the enlarged state on click
                />
                {enlarged && currentValue && (
                  <div
                    className="modal"
                    onClick={handleToggleEnlarged}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black background
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 999, // Set the z-index value to control the stacking order
                    }}
                  >
                    <div
                      className="modal-content"
                      style={{
                        position: "relative",
                      }}
                    >
                      <span
                        className="close"
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          color: "white",
                          fontSize: "24px",
                          cursor: "pointer",
                        }}
                        onClick={handleToggleEnlarged}
                      >
                        &times;
                      </span>
                      <img
                        src={currentValue}
                        alt="Aadhaar Document"
                        style={{
                          maxHeight: "80vh",
                          maxWidth: "80vw",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          } else {
            return null; // If aadhaarImageUrl is null, don't render anything
          }
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
      return (
        <Typography
          key={key}
        >{`${key}: ${currentDisplayData[key]}`}</Typography>
      );
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
                      {memberObject.memberName}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {memberObject.dateOfBirth}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {`XXXX-XXXX-${memberObject.aadhaarNumber
                        .toString()
                        .slice(-4)}`}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Box style={{ textAlign: "center" }}>
                      {memberObject.isEkycVerified ? (
                        <Chip
                          icon={<DoneAll fontSize="small" color="success" />}
                          label="Verified"
                          style={{ height: 20 }}
                        />
                      ) : (
                        <>
                          <Chip
                            icon={<Error color="error" fontSize="small" />}
                            label="Not Verified"
                            style={{ height: 20 }}
                          />
                          {memberObject.aadhaarDocument ? (
                            <Chip
                              icon={
                                <PictureInPicture
                                  fontSize="small"
                                  color="success"
                                />
                              }
                              label="Document Attached"
                              style={{ height: 20 }}
                            />
                          ) : (
                            <Chip
                              icon={
                                <ErrorOutline
                                  fontSize="small"
                                  color="success"
                                />
                              }
                              label="Document Not Attached"
                              style={{ height: 20 }}
                            />
                          )}
                        </>
                      )}
                    </Box>
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
                      handleEditClick(memberObject);
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
                    onClick={handleEditClick}
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
                    // onClick={handleCloseClick}
                    style={{ color: "#A04040" }}
                    startIcon={<Delete />}
                  >
                    Delete
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
                if (key === "himMemberId") return null; // Skip rendering for "himMemberId"
                if (key === "isActive") return null;
                if (key === "isEkycVerified") return null;
                if (value === null) return null; // Hide the key if the value is null

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
                      {isEditMode ? (
                        renderMemberFields(key, value?.toString(), {
                          gender: genderList,
                          relation: relationsList,
                          occupation: occupationList,
                          educationQualification: qualificationList,
                        })
                      ) : key === "aadhaarNumber" ? (
                        `XXXX-XXXX-${value.toString().slice(-4)}`
                      ) : key === "aadhaarDocument" ? (
                        <div>
                          {value && (
                            <img
                              src={value}
                              alt="Aadhaar Document"
                              style={{
                                height: "200px",
                                width: "auto",
                                cursor: "pointer",
                              }}
                              onClick={handleToggleEnlarged}
                            />
                          )}
                          {enlarged && value && (
                            <div
                              className="modal"
                              onClick={handleToggleEnlarged}
                              style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black background
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 100, // Set the z-index value to control the stacking order
                              }}
                            >
                              <div
                                className="modal-content"
                                style={{
                                  position: "relative",
                                }}
                              >
                                <span
                                  className="close"
                                  style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    color: "white",
                                    fontSize: "24px",
                                    cursor: "pointer",
                                  }}
                                  onClick={handleToggleEnlarged}
                                >
                                  &times;
                                </span>
                                <img
                                  src={value}
                                  alt="Aadhaar Document"
                                  style={{
                                    maxHeight: "80vh",
                                    maxWidth: "80vw",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : typeof value === "boolean" ? (
                        value ? (
                          <Chip
                            icon={<DoneAll fontSize="small" color="success" />}
                            label="Verified"
                            style={{ height: 20 }}
                          />
                        ) : (
                          <Chip
                            icon={<Error color="error" fontSize="small" />}
                            label="Not Verified"
                            style={{ height: 20 }}
                          />
                        )
                      ) : (
                        value?.toString()
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>

      <ConfirmDialogEdit
        open={openDialog}
        handleConfirm={() =>
          handleConfirmEdit(editableMemberObject.memberObject)
        }
        handleCancel={handleCancelEdit}
        memberObject={memberObject}
        sx={{ width: "50%", maxWidth: "600px", mx: "auto" }}
      />

      {/* Modla */}
      <GenericModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalData={modalData}
        onProceed={handleProceedModal}
        onCancel={handleCancelModal}
        parentClass="Member"
      />

      {/* Image Pop Up*/}
      {showModalImage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModalImage(false)}>
              &times;
            </span>
            <img src={imageUrl} alt="Aadhaar Document" />
          </div>
        </div>
      )}
    </>
  );
}
