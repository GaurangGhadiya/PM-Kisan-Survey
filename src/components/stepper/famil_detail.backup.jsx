import React, { useCallback, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "./Context";
import Autocomplete from '@mui/material/Autocomplete';
import { Typography } from "@mui/material";


const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
];


export default function FamilyDetails(props) {
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
                    <Typography mt={2}>
                        Select Head of Family
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        // sx={{ height: 150 }}
                        renderInput={(params) => <TextField {...params} label="" size="small" />}
                    />
                </Grid>

            </Grid>

            <Grid container spacing={2} mt={1}>

                <Grid item xs={12} sm={4}>
                    <Typography mt={2}>
                        Is Head of Family Bonafide Himachali?
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        // sx={{ height: 150 }}
                        renderInput={(params) => <TextField {...params} label="" size="small" />}
                    />
                </Grid>
            </Grid>


            <Grid container spacing={2} mt={1}>

                <Grid item xs={12} sm={4}>
                    <Typography mt={2}>
                        Economic Level
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        // sx={{ height: 150 }}
                        renderInput={(params) => <TextField {...params} label="" size="small" />}
                    />
                </Grid>
            </Grid>


            <Grid container spacing={2} mt={1}>

                <Grid item xs={12} sm={4}>
                    <Typography mt={2}>
                        Religion
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        // sx={{ height: 150 }}
                        renderInput={(params) => <TextField {...params} label="" size="small" />}
                    />
                </Grid>
            </Grid>


            <Grid container spacing={2} mt={1}>

                <Grid item xs={12} sm={4}>
                    <Typography mt={2}>
                        Social Category
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        // sx={{ height: 150 }}
                        renderInput={(params) => <TextField {...params} label="" size="small" />}
                    />
                </Grid>
            </Grid>


            <Grid container spacing={2} mt={1}>

                <Grid item xs={12} sm={4}>
                    <Typography mt={2}>
                        Resident Status
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        // sx={{ height: 150 }}
                        renderInput={(params) => <TextField {...params} label="" size="small" />}
                    />
                </Grid>
            </Grid>



            <Grid container spacing={2} mt={1}>

                <Grid item xs={12} sm={4}>
                    <Typography mt={2}>
                        District
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        // sx={{ height: 150 }}
                        renderInput={(params) => <TextField {...params} label="" size="small" />}
                    />
                </Grid>
            </Grid>



            <Grid container spacing={2} mt={1}>

                <Grid item xs={12} sm={4}>
                    <Typography mt={2}>
                        Municipality
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        // sx={{ height: 150 }}
                        renderInput={(params) => <TextField {...params} label="" size="small" />}
                    />
                </Grid>
            </Grid>


            <Grid container spacing={2} mt={1}>

                <Grid item xs={12} sm={4}>
                    <Typography mt={2}>
                        Ward
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        // sx={{ height: 150 }}
                        renderInput={(params) => <TextField {...params} label="" size="small" />}
                    />
                </Grid>
            </Grid>


            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    // disabled={isError()}
                    color="success"
                    onClick={() => handleNext()}
                // onClick={!isError() ? handleNext : () => null}
                >
                    Save and Proceed
                </Button>
            </Box>
        </>
    );
}
