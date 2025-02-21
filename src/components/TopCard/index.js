import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

export const TopCard = (props) => {
  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: "grid",
          gridTemplateColumns: {
            md: "repeat(3, 1fr)",
            sm: "repeat(2, 1fr)",
            xs: "repeat(1, 1fr)",
          },
        }}
      >
        {props.top_header_data &&
          props.top_header_data.map((item) => (
            <Card
              elevation={10}
              key={item.label}
              sx={{
                alignItems: "center",
                backgroundColor: "#FFF",
                borderRadius: 1,
                p: 2,
                "&:hover": {
                  transform: "scale(1.03)", // Scale the card on hover
                },
              }}
            >
              <Typography color="primary" variant="overline">
                {item.label}
              </Typography>
              <Typography variant="h5" color={item.color}>
                {item.value}
              </Typography>
            </Card>
          ))}
      </Box>
    </>
  );
};

TopCard.propTypes = {
  stats: PropTypes.array,
};
