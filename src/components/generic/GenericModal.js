import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

const GenericModal = ({
  showModal,
  setShowModal,
  modalData,
  onProceed,
  onCancel,
  parentClass,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    bgcolor: "#f2f2f2",
    border: "2px solid #83a2b2",
    boxShadow: 30,
    height: "90vh",
    overflow: "hidden",
    overflowY: "auto",
    p: 4,
    borderRadius: 2,
    padding: 3,
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleProceedClick = () => {
    onProceed(parentClass);
  };

  const renderSwitchPage = () => {
    switch (parentClass) {
      case "Family":
        return (
          <>
            {modalData &&
              modalData.updatedData &&
              modalData.existingData && (
                <>
                  {/* Initial Values */}
                  <div style={{ flex: 1, marginRight: "16px" }}>
                    <Typography
                      variant="h6"
                      color="#074465"
                      style={{
                        fontWeight: "bold",
                        marginBottom: "16px", // Add margin bottom
                        textAlign: "center", // Center-align the text
                        position: "relative",
                      }}
                    >
                      Initial Values:
                      <Divider
                        variant="middle"
                        sx={{
                          position: "absolute",
                          width: "90%",
                          bottom: "-8px", // Adjust the space between text and dashed line
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          borderColor: "#4d4d4d",
                        }}
                      />
                    </Typography>
                    {Object.entries(modalData?.existingData).map(
                      ([key, value]) => (
                        <div key={key} style={{ marginBottom: "8px" }}>
                          <Box display="flex" justifyContent="center" gap={10}>
                            <Typography
                              style={{ flex: 0.4, textAlign: "right" }}
                              variant="body1"
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
                            </Typography>
                            <Typography
                              style={{
                                flex: 0.6,
                                color: "#074465",
                                textAlign: "left",
                              }}
                              variant="body1"
                            >
                              {value}
                            </Typography>
                          </Box>
                        </div>
                      )
                    )}
                  </div>
                  {/* Dashed Separator */}
                  <Divider
                    orientation="vertical"
                    flexItem
                    style={{ margin: "0 16px", borderWidth: "2px" }}
                  />
                  {/* Updated Values */}
                  <div style={{ flex: 1, marginLeft: "16px" }}>
                    <Typography
                      variant="h6"
                      color="#074465"
                      style={{
                        fontWeight: "bold",
                        marginBottom: "16px", // Add margin bottom
                        textAlign: "center", // Center-align the text
                        position: "relative",
                      }}
                    >
                      Updated Values:
                      <Divider
                        variant="middle"
                        sx={{
                          position: "absolute",
                          width: "90%",
                          bottom: "-8px", // Adjust the space between text and dashed line
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          borderColor: "#4d4d4d",
                        }}
                      />
                    </Typography>

                    {Object.entries(modalData?.updatedData).map(
                      ([key, value]) => (
                        <div key={key} style={{ marginBottom: "8px" }}>
                          <Box display="flex" justifyContent="center" gap={10}>
                            <Typography
                              style={{ flex: 0.4, textAlign: "right" }}
                              variant="body1"
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
                            </Typography>
                            <Typography
                              style={{
                                flex: 0.6,
                                color: "green",
                                textAlign: "left",
                              }}
                              variant="body1"
                            >
                              {typeof value === "object"
                                ? JSON.stringify(value, null, 2)
                                : value}
                            </Typography>
                          </Box>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
          </>
        );
      //Member
      case "Member":
        return (
          <>
            {modalData &&
              modalData.updatedData &&
              modalData.existingData && (
                <>
                  {/* Initial Values */}
                  <div style={{ flex: 1, marginRight: "16px" }}>
                    <Typography
                      variant="h6"
                      color="#074465"
                      style={{
                        fontWeight: "bold",
                        marginBottom: "16px", // Add margin bottom
                        textAlign: "center", // Center-align the text
                        position: "relative",
                      }}
                    >
                      Initial Values:
                      <Divider
                        variant="middle"
                        sx={{
                          position: "absolute",
                          width: "90%",
                          bottom: "-8px", // Adjust the space between text and dashed line
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          borderColor: "#4d4d4d",
                        }}
                      />
                    </Typography>
                    {Object.entries(modalData?.existingData).map(
                      ([key, value]) => (
                        <div key={key} style={{ marginBottom: "8px" }}>
                          <Box display="flex" justifyContent="center" gap={10}>
                            <Typography
                              style={{ flex: 0.4, textAlign: "right" }}
                              variant="body1"
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
                            </Typography>
                            <Typography
                              style={{
                                flex: 0.6,
                                color: "#074465",
                                textAlign: "left",
                              }}
                              variant="body1"
                            >
                              {value}
                            </Typography>
                          </Box>
                        </div>
                      )
                    )}
                  </div>
                  {/* Dashed Separator */}
                  <Divider
                    orientation="vertical"
                    flexItem
                    style={{ margin: "0 16px", borderWidth: "2px" }}
                  />
                  {/* Updated Values */}
                  <div style={{ flex: 1, marginLeft: "16px" }}>
                    <Typography
                      variant="h6"
                      color="#074465"
                      style={{
                        fontWeight: "bold",
                        marginBottom: "16px", // Add margin bottom
                        textAlign: "center", // Center-align the text
                        position: "relative",
                      }}
                    >
                      Updated Values:
                      <Divider
                        variant="middle"
                        sx={{
                          position: "absolute",
                          width: "90%",
                          bottom: "-8px", // Adjust the space between text and dashed line
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          borderColor: "#4d4d4d",
                        }}
                      />
                    </Typography>

                    {Object.entries(modalData?.updatedData).map(
                      ([key, value]) => (
                        <div key={key} style={{ marginBottom: "8px" }}>
                          <Box display="flex" justifyContent="center" gap={10}>
                            <Typography
                              style={{ flex: 0.4, textAlign: "right" }}
                              variant="body1"
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
                            </Typography>
                            <Typography
                              style={{
                                flex: 0.6,
                                color: "green",
                                textAlign: "left",
                              }}
                              variant="body1"
                            >
                              {typeof value === "object"
                                ? JSON.stringify(value)
                                : value}
                            </Typography>
                          </Box>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
          </>
        );
      // Add more cases as needed
       //Property
       case "Property":
        return (
          <>
            {modalData &&
              modalData.updatedData &&
              modalData.existingData && (
                <>
                  {/* Initial Values */}
                  <div style={{ flex: 1, marginRight: "16px" }}>
                    <Typography
                      variant="h6"
                      color="#074465"
                      style={{
                        fontWeight: "bold",
                        marginBottom: "16px", // Add margin bottom
                        textAlign: "center", // Center-align the text
                        position: "relative",
                      }}
                    >
                      Initial Values:
                      <Divider
                        variant="middle"
                        sx={{
                          position: "absolute",
                          width: "90%",
                          bottom: "-8px", // Adjust the space between text and dashed line
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          borderColor: "#4d4d4d",
                        }}
                      />
                    </Typography>
                    {Object.entries(modalData?.existingData).map(
                      ([key, value]) => (
                        <div key={key} style={{ marginBottom: "8px" }}>
                          <Box display="flex" justifyContent="center" gap={10}>
                            <Typography
                              style={{ flex: 0.4, textAlign: "right" }}
                              variant="body1"
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
                            </Typography>
                            <Typography
                              style={{
                                flex: 0.6,
                                color: "#074465",
                                textAlign: "left",
                              }}
                              variant="body1"
                            >
                              {value}
                            </Typography>
                          </Box>
                        </div>
                      )
                    )}
                  </div>
                  {/* Dashed Separator */}
                  <Divider
                    orientation="vertical"
                    flexItem
                    style={{ margin: "0 16px", borderWidth: "2px" }}
                  />
                  {/* Updated Values */}
                  <div style={{ flex: 1, marginLeft: "16px" }}>
                    <Typography
                      variant="h6"
                      color="#074465"
                      style={{
                        fontWeight: "bold",
                        marginBottom: "16px", // Add margin bottom
                        textAlign: "center", // Center-align the text
                        position: "relative",
                      }}
                    >
                      Updated Values:
                      <Divider
                        variant="middle"
                        sx={{
                          position: "absolute",
                          width: "90%",
                          bottom: "-8px", // Adjust the space between text and dashed line
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          borderColor: "#4d4d4d",
                        }}
                      />
                    </Typography>

                    {Object.entries(modalData?.updatedData).map(
                      ([key, value]) => (
                        <div key={key} style={{ marginBottom: "8px" }}>
                          <Box display="flex" justifyContent="center" gap={10}>
                            <Typography
                              style={{ flex: 0.4, textAlign: "right" }}
                              variant="body1"
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
                            </Typography>
                            <Typography
                              style={{
                                flex: 0.6,
                                color: "green",
                                textAlign: "left",
                              }}
                              variant="body1"
                            >
                              {typeof value === "object"
                                ? JSON.stringify(value, null, 2)
                                : value}
                            </Typography>
                          </Box>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
          </>
        );
      default:
        return (
          <>
            {/* Default UI */}
            <Typography
              variant="h6"
              color="#074465"
              style={{
                fontWeight: "bold",
                marginBottom: "16px",
                textAlign: "center",
                position: "relative",
              }}
            >
              Default Title:
              <Divider
                variant="middle"
                sx={{
                  position: "absolute",
                  width: "90%",
                  bottom: "-8px",
                  borderStyle: "dashed",
                  borderWidth: "1px",
                  borderColor: "#4d4d4d",
                }}
              />
            </Typography>
            {/* Add default content here */}
          </>
        );
    }
  };

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid container justifyContent="flex-end" alignItems="center">
            <Grid item xs={11.5} textAlign="center">
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  color: "#074465",
                }}
              >
                Please verify the changes before making the updates:
              </div>
            </Grid>
            <Grid item xs={0.5}>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={handleClose}
              >
                {/* Add your close icon here */}
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={0.5}>
            <IconButton aria-label="delete" size="small" onClick={handleClose}>
              {/* Add your close icon here */}
            </IconButton>
          </Grid>
        </Grid>

        <Paper
          elevation={3}
          variant="elevation"
          style={{
            height: "80%",
            overflowY: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          {renderSwitchPage()}
        </Paper>

        <Divider mt={2} mb={2} />

        <Grid container justifyContent="center">
          <Grid item xs={6} textAlign="center">
            <Button
              variant="contained"
              color="error"
              onClick={onCancel}
              fullWidth
              square
              sx={{ marginRight: 1 }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6} textAlign="center">
            <Button
              variant="contained"
              color="success"
              onClick={handleProceedClick}
              fullWidth
              square
              sx={{ marginLeft: 1 }}
            >
              Proceed
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default GenericModal;
