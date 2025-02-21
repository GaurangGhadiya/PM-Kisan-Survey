import { ClosedCaption } from "@mui/icons-material";
import { Button, Fade, IconButton, Snackbar } from "@mui/material";
import { red } from "@mui/material/colors";
import { Fragment, useState } from "react";

export default function ErrorSnack(props) {
  const handleClose = (event, reason) => {
    // if (reason === "clickaway") {
    //   return;
    // }
    props.setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Fade}
        message={props.message}
        autoHideDuration={1200}
      />
    </>
  );
}
