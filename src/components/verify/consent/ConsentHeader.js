import React, { useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  IconButton,
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
import ConfirmDialogEdit from "../ConfirmDialogEdit";
import { Avatar } from "antd";
import Image from "next/image";

export default function ConsentHeader({ selectedFamily }) {

  const extractedConsent = {
    fileData: selectedFamily?.farmerConsentUrl,
    consentDocName: selectedFamily?.farmerConsentUrl?.split("consent/")?.[1],
  };

  const [expanded, setExpanded] = useState(false);

  const handleViewOrCloseClick = () => {
    setExpanded(!expanded);
  };

  const handleConfirmEdit = () => {
    setExpanded(true);
  };

  const handleCancelEdit = () => {
    setOpenDialog(false);
  };

  const handleCloseClick = () => {
    setExpanded(false); // Optionally, collapse the accordion here
  };

  const getImageSrc = () => {
    if (!extractedConsent.fileData) {
      return "";
    }
    // Assuming the image is a PNG. Change 'png' to the correct format if necessary.
    return `data:image/png;base64,${extractedConsent.fileData}`;
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
                  gridTemplateColumns="repeat(1, 1fr)"
                  width="100%"
                  gap={1}
                >
                  <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">
                      Consent Details (Declaration Signed by the Farmer)
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
              {!expanded && (
                <>
                  <Button
                    // color="error"
                    style={{ color: "#344147" }}
                    startIcon={<More />}
                    onClick={handleViewOrCloseClick}
                  >
                    More
                  </Button>
                </>
              )}
              {expanded && (
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
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
              <Box
                sx={{ gridRow: "1", gridColumn: "1 / span 1", padding: "10px" }}
              >
                <Typography variant="h6">File Name:</Typography>
                <Typography>{extractedConsent.consentDocName}</Typography>
              </Box>

              <Box
                sx={{
                  gridRow: "1 / span 2", // Spans across two rows
                  gridColumn: "2 / span 1", // Takes up the second column
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px",
                }}
              >
                {extractedConsent.fileData && (
                  <Box>
                    <Typography variant="h6">File Uploaded:</Typography>
                    <img src={extractedConsent.fileData} height={200} width={150}
                    style={{
                      width: "80%", // Takes full width of the parent container
                      height: "80%",
                      border: "2px solid #000",
                    }}

                    />
                    {/* <img
                      src={getImageSrc()}
                      alt="Consent Document"
                      sx={{
                        width: "80%", // Takes full width of the parent container
                        height: "80%",
                        border: "2px solid #000",
                      }}
                    /> */}
                  </Box>
                )}
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* <ConfirmDialogEdit
        open={openDialog}
        handleConfirm={handleConfirmEdit}
        handleCancel={handleCancelEdit}
        memberObject={memberObject}
        sx={{ width: "50%", maxWidth: "600px", mx: "auto" }}
      /> */}
    </>
  );
}
