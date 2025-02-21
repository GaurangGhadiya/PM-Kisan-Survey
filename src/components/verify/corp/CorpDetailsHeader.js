import { Box, Paper, Typography } from "@mui/material";
import { Divider } from "antd";

export default function CorpDetailsHeader() {
  return (
    <>
      <Typography
        fontWeight="300"
        style={{ fontSize: 16 }}
        color="#FFF"
        backgroundColor="#074465"
        borderRadius={0.5}
        textAlign="left"
        paddingLeft={2}
        fontStyle={"bold"}
      >
        Corp Details
      </Typography>

      <Paper
        elevation={6}
        variant="elevation"
        style={{
          marginBottom: 8,
          display: "flex",
        }}
      >
        <Box
          display="flex"
          width="100%"
          padding={1}
          backgroundColor="#396984"
          color="#FFF"
          justifyContent="space-between"
          mb={1}
        >
          <Box flexBasis="20%" style={{ textAlign: "center" }}>
            <Typography variant="subtitle2">Name</Typography>
          </Box>
          <Box flexBasis="20%" style={{ textAlign: "center" }}>
            <Typography variant="subtitle2">Season Name</Typography>
          </Box>
          <Box flexBasis="20%" style={{ textAlign: "center" }}>
            <Typography variant="subtitle2">Type Name</Typography>
          </Box>
          <Box flexBasis="20%" style={{ textAlign: "center" }}>
            <Typography variant="subtitle2">Crop Area</Typography>
          </Box>
          <Box flexBasis="20%"></Box>
        </Box>
      </Paper>
    </>
  );
}
