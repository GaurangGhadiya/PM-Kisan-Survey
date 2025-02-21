import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  ButtonGroup,
} from "@mui/material";
import { BackHand, Error, RampRight, Verified } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { onRejectionList } from "../../../network/actions/rejectionReasons";
import { useRouter } from "next/router";

const VerificationButtons = ({ onVerify, onFamilyNotVerified }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const router = useRouter();

  const [rejectionList, setRejectionList] = useState([]);
  const rejections_reducer = useSelector((state) => state.rejections);
  const dispatch = useDispatch();

  /**
   * Back Button
   */
  const handleBackButtonClick = () => {
    router.back();
  };

  /**
   * Rejection List
   */
  useEffect(() => {
    let rejectionList = [];
    if (rejections_reducer?.data) {
      const { data, status, message } = rejections_reducer.data || {};
      // setdistrictCalled(false);

      if (status === "OK" && message === "SUCCESS") {
        for (let i = 0; i < data.length; i++) {
          let object = {
            id: data[i].id,
            name: data[i].name,
          };
          rejectionList.push(object);
        }
        setRejectionList(rejectionList);
        setSelectedReason(rejectionList[0]);
      }
    }
  }, [rejections_reducer]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFamilyNotVerified = () => {
    dispatch(onRejectionList());
    setDialogOpen(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleProceed = () => {
    if (selectedReason) {
      onFamilyNotVerified(selectedReason);
      handleDialogClose();
    } else {
      alert("Please select a reason before proceeding.");
    }
  };

  const handleVerifyConfirmation = () => {
    setConfirmationDialogOpen(true);
    handleClose();
  };

  const handleVerifyConfirmationClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleVerify = (verify) => {
    if (verify) {
      // Call the verification function
      onVerify();
    }
    handleVerifyConfirmationClose();
  };

  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            startIcon={<Verified />}
            style={{ backgroundColor: "green", color: "white" }}
            onClick={handleVerifyConfirmation}
          >
            Verify Family
          </Button>
        </Grid>
        <Grid item>
          <Button
            startIcon={<Error />}
            style={{ backgroundColor: "red", color: "white" }}
            onClick={handleFamilyNotVerified}
          >
            Family not Verified
          </Button>
        </Grid>
        <Grid item>
          <Button
            startIcon={<BackHand />}
            style={{ backgroundColor: "#396984", color: "white" }}
            onClick={handleBackButtonClick}
          >
            Cancel/Back
          </Button>
        </Grid>
      </Grid>

      {/* Dialog for Family not Verified */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" color="primary">
            Select Reasons for marking the Family as not verified
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <Select
              value={selectedReason ? selectedReason.name : ""}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setSelectedReason(
                  selectedValue
                    ? rejectionList.find((item) => item.name === selectedValue)
                    : null
                );
              }}
            >
              {rejectionList.map((reasonItem) => (
                <MenuItem key={reasonItem.id} value={reasonItem.name}>
                  {reasonItem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions style={{ textAlign: "center" }}>
          <ButtonGroup style={{ justifyContent: "center", padding: "16px" }}>
            <Button variant="contained" onClick={handleProceed} color="success">
              Proceed
            </Button>
            <Button
              variant="contained"
              onClick={handleDialogClose}
              color="error"
            >
              Cancel
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>

      {/* Dialog for Verify Family Confirmation */}
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleVerifyConfirmationClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" color="primary">
            Do you want to verify the family and all members?
          </Typography>
        </DialogTitle>
        <DialogActions style={{ textAlign: "center" }}>
          <ButtonGroup style={{ justifyContent: "center", padding: "16px" }}>
            <Button
              variant="contained"
              onClick={() => handleVerify(true)}
              color="success"
            >
              Yes
            </Button>
            <Button
              variant="contained"
              onClick={() => handleVerify(false)}
              color="error"
            >
              No
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VerificationButtons;
