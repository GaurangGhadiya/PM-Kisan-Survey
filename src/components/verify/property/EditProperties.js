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
  ExpandMore,
  More,
  RemoveRedEye,
  Save,
  Update,
  Visibility,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import ConfirmDialogPropertyEdit from "../../dialogs/ConfirmDialogPropertyEdit";
import GenericModal from "../../generic/GenericModal";

export default function EditProperties({ onsave, selectedFamily }) {
  const [expanded, setExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [changedValues, setChangedValues] = useState({});
  const [extractedPropertData, setExtractedPropertyData] = useState({});
  const [propertDetailsList, setPropertDetailsList] = useState([]);
  const [selectedPropertyDetail, setSelectedPropertyDetail] = useState();
  const [editedValues, setEditedValues] = useState({});
  const [initialPropertyData, setInitialPropertyData] = useState({});

  const [currentDisplayData, setCurrentDisplayData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    updatedData: {},
    changedValues: {},
    existingData: {},
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const extractedPropertyData = {
      propertyId: selectedFamily?.propertyDetail?.propertyId,
      propertyDetails: selectedFamily?.propertyDetail?.propertyDetails,
      rentGivenTo: selectedFamily?.propertyDetail?.rentGivenTo,
      electricityConsumerNo:
        selectedFamily?.propertyDetail?.electricityConsumerNo,
      waterConnectionNumber:
        selectedFamily?.propertyDetail?.waterConnectionNumber,
    };
    setExtractedPropertyData(extractedPropertyData);
    setSelectedPropertyDetail(extractedPropertyData?.propertyDetails);
    setInitialPropertyData(extractedPropertyData);
  }, [selectedFamily]);

  useEffect(() => {
    // Update the current display data when selectedFamily changes
    setCurrentDisplayData(extractedPropertData);
  }, [extractedPropertData]);

  useEffect(() => {
    if (!isEditMode) {
      // Reset edited values when exiting edit mode
      setEditedValues({});
    }
  }, [isEditMode]);

  /**
   * Property Details Array
   */
  useEffect(() => {
    let propertDetailsList = [];
    const addProperty = (propertyTypeId, propertyTypeName) => {
      propertDetailsList.push({
        propertyTypeId: propertyTypeId,
        propertyTypeName: propertyTypeName,
      });
    };
    addProperty(1, "Rented");
    addProperty(2, "Owned");
    addProperty(3, "Leased");
    setPropertDetailsList(propertDetailsList);
  }, [selectedPropertyDetail]);

  const handleViewOrCloseClick = () => {
    setExpanded(!expanded);
    setIsEditMode(false);
    // If it was in edit mode, reset to initial data on close
    if (isEditMode) {
      setExtractedPropertyData(initialPropertyData);
      setEditedValues({});
      setCurrentDisplayData(initialPropertyData);
    }
  };

  const handleEditClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmEdit = (extractedPropertData) => {
    setOpenDialog(false);
    setExpanded(true);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setOpenDialog(false);
  };

  const handleCloseClick = () => {
    setExpanded(false); // Optionally, collapse the accordion here
    setIsEditMode(false);
    // Reset edited values to initial data on cancel
    // Reset edited values to initial data on cancel
    setExtractedPropertyData(initialPropertyData);
    setChangedValues({});
    setSelectedPropertyDetail(initialPropertyData?.propertyDetails);
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

    const updatedPropertyDetails = {
      ...extractedPropertData,
      ...changedValues,
    };

    setShowModal(true);
    setModalData({
      updatedData: updatedPropertyDetails,
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

  // Function to render member fields
  const renderPropertyFields = (key, value, options = {}) => {
    // Use the value from changedValues if it exists, otherwise use the value
    const currentValue =
      changedValues[key] !== undefined ? changedValues[key] : value;

    if (isEditMode) {
      switch (key) {
        case "propertyDetails":
          return (
            <FormControl fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select
                value={selectedPropertyDetail}
                label={key}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedPropertyDetail(newName);
                  const newId =
                    options.propertyDetails.find(
                      (option) => option.propertyTypeName === newName
                    )?.propertyTypeId || null;
                  setChangedValues((prevValues) => ({
                    ...prevValues,
                    [key]: { propertyTypeId: newId, propertyTypeName: newName },
                  }));
                }}
              >
                {options.propertyDetails.map((option) => (
                  <MenuItem
                    key={option.propertyTypeId}
                    value={option.propertyTypeName}
                  >
                    {option.propertyTypeName}
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
                      {selectedFamily?.propertyDetail?.propertyDetails}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {selectedFamily?.propertyDetail?.electricityConsumerNo}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {selectedFamily?.propertyDetail?.waterConnectionNumber}
                    </Typography>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      {selectedFamily?.propertyDetail?.propertyId}
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
                      handleEditClick(extractedPropertData);
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
                  {/* <Button
                    // onClick={handleCloseClick}
                    style={{ color: "#A04040" }}
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button> */}
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
                //if (key === "himMemberId") return null; // Skip rendering for "himMemberId"

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
                        ? renderPropertyFields(key, value?.toString(), {
                            propertyDetails: propertDetailsList,
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

      <ConfirmDialogPropertyEdit
        open={openDialog}
        handleConfirm={() => handleConfirmEdit(extractedPropertData)}
        handleCancel={handleCancelEdit}
        extractedPropertData={extractedPropertData}
        sx={{ width: "50%", maxWidth: "600px", mx: "auto" }}
      />

      {/* Modla */}
      <GenericModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalData={modalData}
        onProceed={handleProceedModal}
        onCancel={handleCancelModal}
        parentClass="Property"
      />
    </>
  );
}
