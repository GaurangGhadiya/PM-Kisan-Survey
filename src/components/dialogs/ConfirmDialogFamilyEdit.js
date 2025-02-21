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

export default function ConfirmDialogFamilyEdit({
  open,
  handleConfirm,
  handleCancel,
  editableFamilyObject,
}) {
  const borderColor = "#074465";
  const typographyColor = borderColor;
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
          Edit Family
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="body1"
              style={{ fontSize: "1.2em", color: typographyColor }}
            >
              Are you sure you want to edit the Family residing in:
            </Typography>
            <Typography
              variant="body2"
              style={{ fontSize: "1.2em", color: typographyColor }}
            >
              <strong>District:</strong> {editableFamilyObject?.districtName}{" "}
              <br />
              <strong>MC/NP:</strong> {editableFamilyObject?.municipalName}{" "}
              <br />
              <strong>Ward Name:</strong> {editableFamilyObject?.wardName}{" "}
              <br />
            </Typography>
            <Typography
              variant="body1"
              style={{ fontSize: "1.2em", color: typographyColor }}
            >
              with the Head of Family as:{" "}
              <strong>{editableFamilyObject?.headOfFamily}</strong>
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
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="success"
            variant="contained"
            autoFocus
            style={{ fontSize: "1.2em", backgroundColor: confirmButtonColor }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
