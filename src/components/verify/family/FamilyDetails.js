import {
  Close,
  Delete,
  DoneAll,
  Error,
  RemoveRedEye,
  Save,
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

export default function FamilyDetails({ selectedFamily }) {

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
  };


  return (
    <>
      <Accordion expanded={true}>
        <AccordionDetails>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
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
                  }}
                >
                  <Box
                    style={{
                      flex: 2,
                      textAlign: "right",
                      paddingRight: "5px",
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
                      flex: 2,
                      textAlign: "left",
                      fontWeight: "bold",
                      paddingLeft: "5px",
                      color: "#555",
                    }}
                  >
                    {value?.toString()}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
