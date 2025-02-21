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
    Typography,
  } from "@mui/material";
  import { Box, Chip } from "@mui/material";
  import { TextField } from "formik-material-ui";
  import ConfirmDialogEdit from "../ConfirmDialogEdit";
  import { useState } from "react";
  
  export default function Corp({ selectedFamily }) {
  
    const extractedFamilyData = {
      name: selectedFamily.firstName+" "+selectedFamily?.lastName,
      qualificationName: selectedFamily.qualificationName,
      genderName: selectedFamily.genderName,
      email: selectedFamily.email,
      dateOfBirth: selectedFamily.dateOfBirth,
      contactNumber: selectedFamily.contactNumber,
      casteName: selectedFamily.casteName,
      districtName: selectedFamily.districtName,
      blockName: selectedFamily.blockName,
      panchayatName: selectedFamily.panchayatName,
      villageName: selectedFamily.villageName,
    };
  
    const [expanded, setExpanded] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editableFamilyObject, setEditableFamilyObject] = useState({
      extractedFamilyData,
    });
  
    const [openDialog, setOpenDialog] = useState(false);
    const [memberToEdit, setMemberToEdit] = useState(null);
  
    const handleViewOrCloseClick = () => {
      setExpanded(!expanded);
      setIsEditMode(false);
    };
  
    //   const handleEditClick = () => {
    //     setMemberToEdit(memberObject);
    //     setOpenDialog(true);
    //   };
  
    const handleConfirmEdit = () => {
      setOpenDialog(false);
      setExpanded(true);
      setIsEditMode(true);
    };
  
    const handleCancelEdit = () => {
      setOpenDialog(false);
      setEditableMemberObject(extractedFamilyData);
    };
  
    const handleCloseClick = () => {
      setIsEditMode(false);
      setExpanded(false); // Optionally, collapse the accordion here
    };
  
    // Function to render member fields
    //   const renderMemberFields = () => {
    //     return Object.entries(editableMemberObject).map(([key, value]) => {
    //       if (isEditMode) {
    //         return (
    //           <TextField
    //             key={key}
    //             label={key}
    //             value={value || ""}
    //             onChange={(e) =>
    //               setEditableMemberObject({
    //                 ...editableMemberObject,
    //                 [key]: e.target.value,
    //               })
    //             }
    //           />
    //         );
    //       } else {
    //         return <Typography key={key}>{`${key}: ${value}`}</Typography>;
    //       }
    //     });
    //   };
  
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
                        {selectedFamily?.cropName}
                      </Typography>
                    </Box>
                    <Box style={{ textAlign: "center" }}>
                      <Typography variant="subtitle1">
                        {selectedFamily?.cropSeasonName}
                      </Typography>
                    </Box>
                    <Box style={{ textAlign: "center" }}>
                      <Typography variant="subtitle1">
                        {selectedFamily?.cropTypeName}
                      </Typography>
                    </Box>
                    <Box style={{ textAlign: "center" }}>
                      <Typography variant="subtitle1">
                        {selectedFamily?.cropArea}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
              </Box>
              {/* <Box
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
                  </>
                )}
              </Box> */}
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
                {Object.entries(extractedFamilyData).map(([key, value]) => {
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
                          <TextField
                            fullWidth
                            size="small"
                            value={value || ""}
                            //   onChange={(e) =>
                            //     setEditableMemberObject({
                            //       ...editableMemberObject,
                            //       [key]: e.target.value,
                            //     })
                            // }
                          />
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
  
        {/* <ConfirmDialogEdit
            open={openDialog}
            handleConfirm={handleConfirmEdit}
            handleCancel={handleCancelEdit}
            // memberObject={memberObject}
            sx={{ width: "50%", maxWidth: "600px", mx: "auto" }}
          /> */}
      </>
    );
  }
  