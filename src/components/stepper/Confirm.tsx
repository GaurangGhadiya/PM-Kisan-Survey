import React, { useContext } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { AppContext } from "./Context";

export default function Confirm() {
    const { handleBack, handleNext } = useContext(AppContext);

    const handleSubmit = () => {
        // Remove unwanted properties from formValue object
        let form = {};
        // Do whatever with the values
        // Show last component or success message
        handleNext();
    };

    return (
        <>
            <List disablePadding>

            </List>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button sx={{ mr: 1 }} onClick={handleBack}>
                    Back
                </Button>
                <Button variant="contained" color="success" onClick={handleSubmit}>
                    Confirm & Continue
                </Button>
            </Box>
        </>
    );
}
