import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const TopBanner = () => {
  const handleDownload = () => {
    // Construct the URL to the file in the public folder
    const fileUrl = "/apk/SurveyV1.5.apk";

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = fileUrl;

    // Set the download attribute and the file name
    anchor.download = "SurveyV1.5.apk";

    // Trigger a click event on the anchor to initiate the download
    anchor.click();

    // Clean up the anchor element
    anchor.remove();
  };

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        minHeight: "500px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={3}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={5} ml={6}>
          <Typography className="heading-primary">
            Household Survey Parivar Register (Urban)
          </Typography>
          <Typography
            style={{
              fontSize: "1.3rem",
              lineHeight: 1.6,
              marginBottom: "4.8rem",
            }}
          >
            Efficiently collect and manage urban household data to maintain an
            updated Parivar Register, ensuring accurate and essential
            demographic information for government and civic planning in your
            city.
          </Typography>

          <Link href="/apk/SurveyV1.10_P.apk" download>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: 5 }}
            >
              Download the Application
            </Button>
          </Link>

          <Button
            variant="string"
            style={{ marginLeft: 5, backgroundColor: "white", color: "#000" }}
            endIcon={<ArrowDownwardIcon />}
          >
            Learn More
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img
            src={"/images/slide2.jpg"}
            alt="My Team"
            style={{
              width: "100%",
              height: 400,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopBanner;
