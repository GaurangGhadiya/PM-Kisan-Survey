import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Slide,
} from "@mui/material";
import { Fragment } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialogEdit({
  open,
  handleConfirm,
  handleCancel,
  memberObject,
}) {
  const borderColor = "#074465";
  const typographyColor = borderColor;
  const aadhaarNumberColor = "#074465";
  const confirmButtonColor = "green";
  const cancelButtonColor = "red";

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        maxWidth="md"
        fullWidth
        transitionDuration={500}
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            fontSize: "1.2em",
            borderBottom: `2px solid ${borderColor}`,
          }}
        >
          Edit Member
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to edit the details of{" "}
            <Typography
              variant="subtitle1"
              style={{ fontSize: "1.2em", color: typographyColor }}
            >
              <strong>{memberObject.memberName}</strong>
            </Typography>{" "}
            with Aadhaar Number{" "}
            <Typography
              variant="subtitle1"
              style={{ fontSize: "1.2em", color: aadhaarNumberColor }}
            >
              XXXX-XXXX-
              <strong>{memberObject?.aadhaarNumber?.toString()?.slice(-4)}</strong>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancel}
            color="error"
            variant="outlined"
            style={{ fontSize: "1.2em", borderColor: cancelButtonColor }}
          >
            No
          </Button>
          <Button
            onClick={() => handleConfirm()}
            color="success"
            variant="contained"
            autoFocus
            style={{ fontSize: "1.2em", backgroundColor: confirmButtonColor }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
