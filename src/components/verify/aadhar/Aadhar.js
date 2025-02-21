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
import Image from "next/image";
  
  export default function Aadhar({ selectedFamily }) {
  
    const extractedFamilyData = {
      name: selectedFamily?.name,
      birthDate: selectedFamily?.dob,
      aadhaarNumber: `XXXX-XXXX-${selectedFamily?.aadhaarNumber
        .toString()
        .slice(-4)}` ,
      loc: selectedFamily?.loc,
      state: selectedFamily?.state,
     
    };
  
    const [expanded, setExpanded] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editableFamilyObject, setEditableFamilyObject] = useState({
      extractedFamilyData,
    });
  
    const [openDialog, setOpenDialog] = useState(false);
    const [memberToEdit, setMemberToEdit] = useState(null);
    const [enlarged, setEnlarged] = useState(false);
    const [currentValue, setCurrentValue] = useState(null)
  
    const handleToggleEnlarged = () => {
      window.scrollTo(0,0)
      setEnlarged(!enlarged);
      const modalContent = document.querySelector(".modalMain");
        if (modalContent) {
            modalContent.style.overflow = enlarged ? "auto" : "hidden !important"; // Add !important to override other styles
            modalContent.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
          }
    };
    // Inside your handleToggleEnlarged1 function
const handleToggleEnlarged1 = (value) => {
  window.scrollTo(0, 0);
  setEnlarged(!enlarged);
  setCurrentValue(value);
  const modalContent = document.querySelector(".modalMain");
  if (modalContent) {
    modalContent.scrollTop = 0; // Scroll the modal content to the top
    modalContent.style.overflow = enlarged ? "auto" : "hidden"; // Toggle overflow style
  }
};


  
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
                        {selectedFamily?.name}
                      </Typography>
                    </Box>
                    <Box style={{ textAlign: "center" }}>
                      <Typography variant="subtitle1">
                        {selectedFamily?.dob}
                      </Typography>
                    </Box>
                    <Box style={{ textAlign: "center" }}>
                      <Typography variant="subtitle1">
                     { `XXXX-XXXX-${selectedFamily?.aadhaarNumber
        .toString()
        .slice(-4)}`}
                      </Typography>
                    </Box>
                    <Box style={{ textAlign: "center" }}>
                      <Typography variant="subtitle1">
                        {selectedFamily?.state}
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
                 <Box
                    gridColumn="span 1"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      wordWrap: "break-word",
                      padding: "5px",
                    }}
                  > 
                  {selectedFamily?.aadhaarPhotoUrl &&  <><Box  style={{
                        flex: 1,
                        textAlign: "right",
                        paddingRight: "5px",
                        fontWeight: "bold",
                        color: "#396984",
                      }}>Aadhar Photo  </Box>:
                       <Box
                      style={{
                        flex: 1,
                        textAlign: "left",
                        fontWeight: "bold",
                        paddingLeft: "5px",
                        color: "#555",
                      }}
                    ><img src={selectedFamily?.aadhaarPhotoUrl} height={200} width={150}
                    onClick={() => handleToggleEnlarged1(selectedFamily?.aadhaarPhotoUrl)} 
                    
                    /></Box></>}
                    
                    </Box>
             <Box
                    gridColumn="span 1"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      wordWrap: "break-word",
                      padding: "5px",
                    }}
                  > 
                 {selectedFamily?.aadhaarDocUrl &&  <><Box  style={{
                        flex: 1,
                        textAlign: "right",
                        paddingRight: "5px",
                        fontWeight: "bold",
                        color: "#396984",
                      }}>Aadhar Document  </Box>:
                       <Box
                      style={{
                        flex: 1,
                        textAlign: "left",
                        fontWeight: "bold",
                        paddingLeft: "5px",
                        color: "#555",
                      }}
                    ><img src={selectedFamily?.aadhaarDocUrl} height={200} width={150}
                    onClick={() => handleToggleEnlarged1(selectedFamily?.aadhaarDocUrl)} 

                    /></Box></>}
                    
                    </Box>
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
        overflowY: "auto", // Ensure modal content is scrollable
        maxHeight: "80vh", // Adjust max height as needed
      }}
    >
      <span
        className="close"
        style={{
          position: "absolute",
          top: "0px",
          right: "10px",
          color: "red",
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
          maxWidth: "430px",
          maxHeight: "430px",
          objectFit : "cover"
        }}
      />
    </div>
  </div>
)}
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
  