import { Box, Paper, Typography } from "@mui/material";
import { Divider } from "antd";

export default function VerificationHeader() {
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
        Verification Action(s)
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
          <Box flexBasis="80%" style={{ textAlign: "left" }}>
            <Typography variant="subtitle2">
              Verification Action(s)
            </Typography>
          </Box>

          <Box flexBasis="20%"></Box>
        </Box>
      </Paper>
    </>
  );
}
