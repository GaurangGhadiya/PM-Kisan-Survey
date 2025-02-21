import React, { useCallback, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "./Context";

export default function FirstStep() {
    const { formValues, handleChange, handleNext, variant, margin } = useContext(
        AppContext
    );
    const { firstName, lastName, email, gender, date } = formValues;

    // Check if all values are not empty and if there are some errors
    const isError = useCallback(
        () =>
            Object.keys({ firstName, lastName, email, gender, date }).some(
                (name) =>
                    (formValues[name].required && !formValues[name].value) ||
                    formValues[name].error
            ),
        [formValues, firstName, lastName, email, gender, date]
    );

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Enter Member Name"
                        name="firstName"
                        placeholder="Your first name"
                        value={firstName.value}
                        onChange={handleChange}
                        error={!!firstName.error}
                        helperText={firstName.error}
                        required={firstName.required}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        select
                        SelectProps={{
                            native: true
                        }}
                        label="Is Head of the Family Himachali Bonafide"
                        name="gender"
                        value={gender.value}
                        onChange={handleChange}
                        error={!!gender.error}
                        helperText={gender.error}
                        required={gender.required}
                    >
                        <option value=""> </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        select
                        SelectProps={{
                            native: true
                        }}
                        label="Gender"
                        name="gender"
                        value={gender.value}
                        onChange={handleChange}
                        error={!!gender.error}
                        helperText={gender.error}
                        required={gender.required}
                    >
                        <option value=""> </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </TextField>
                </Grid>


                <Grid item xs={12} sm={4}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        label="Date of birth"
                        name="date"
                        type="date"
                        defaultValue={date.value}
                        onChange={handleChange}
                        required={date.required}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Enter Relative Name"
                        name="firstName"
                        placeholder="Your first name"
                        value={firstName.value}
                        onChange={handleChange}
                        error={!!firstName.error}
                        helperText={firstName.error}
                        required={firstName.required}
                    />
                </Grid>





                <Grid item xs={12} sm={3}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        select
                        SelectProps={{
                            native: true
                        }}
                        label="Relation with Relative"
                        name="relation_with_relative"
                        value={gender.value}
                        onChange={handleChange}
                        error={!!gender.error}
                        helperText={gender.error}
                        required={gender.required}
                    >
                        <option value=""> </option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        select
                        SelectProps={{
                            native: true
                        }}
                        label="Educational Qualification"
                        name="educational_qualification"
                        value={gender.value}
                        onChange={handleChange}
                        error={!!gender.error}
                        helperText={gender.error}
                        required={gender.required}
                    >
                        <option value=""> </option>
                        <option value="10">10</option>
                        <option value="12">12</option>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Occupation"
                        name="occupation"
                        placeholder="Enter Your Occupation"
                        value={firstName.value}
                        onChange={handleChange}
                        error={!!firstName.error}
                        helperText={firstName.error}
                        required={firstName.required}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Enter 12 Digit Aadhaar"
                        name="firstName"
                        placeholder="Your first name"
                        value={firstName.value}
                        onChange={handleChange}
                        error={!!firstName.error}
                        helperText={firstName.error}
                        required={firstName.required}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Button fullWidth variant="contained" color="error" style={{ backgroundColor: 'red', height: 52, marginTop: 16 }}>Perform Aadhaar Authentication</Button>
                </Grid>


                <Grid item xs={12} sm={4}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Mobile Number"
                        name="mobileNumber"
                        placeholder="Enter Your Mobile Number"
                        value={firstName.value}
                        onChange={handleChange}
                        error={!!firstName.error}
                        helperText={firstName.error}
                        required={firstName.required}
                    />
                </Grid>


                <Grid item xs={12} sm={3}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label="Enter Email Address"
                        name="emailAddress"
                        placeholder="Enter Your Email Address"
                        value={firstName.value}
                        onChange={handleChange}
                        error={!!firstName.error}
                        helperText={firstName.error}
                        required={firstName.required}
                    />
                </Grid>




            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    disabled={isError()}
                    color="success"
                    onClick={!isError() ? handleNext : () => null}
                >
                    Save and Proceed
                </Button>
            </Box>
        </>
    );
}
