import React, { useCallback, useContext, useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "./Context";
import Autocomplete from '@mui/material/Autocomplete';
import { MenuItem, Select, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { DateField } from "@mui/x-date-pickers";
import { DatePicker } from "antd";
const moment = require("moment");

export default function DateOfBirth(props) {

    const [birthUserList, setbirthUserList] = useState([]);

    const forms = useSelector((state) => state.formData);

    const familyDetails = useSelector((state) => state.familyDetail)

    const [dobList, setdobList] = useState([]);


    const initialGenders = ['', ''];
    const [selectedDobs, setselectedDobs] = useState(initialGenders);


    const { formValues, handleChange, handleNext, variant, margin, handleBack } = useContext(
        AppContext
    );


    const dispatch = useDispatch();

    useEffect(() => {
        let members = [];

        if (forms) {
            const { value } = forms || {};

            if (value.length > 0) {

                for (let a = 0; a < value.length; a++) {

                    if (value[a].memberName) {

                        const formattedDate = moment(value[a].dateOfBirth, "YYYY-MM-DD").format("YYYY-MM-DD");


                        let object = { name: value[a].memberName, dob: formattedDate };
                        members.push(object)
                    }
                }

                setselectedDobs(members)

            }

        }

    }, [])






    const setGender = (props, value, name) => {
        let gender_list = [];
        let data = genderUserList;



        for (var i = 0; i < data.length; i++) {
            if (data[i].name === name) {
                // Update the value key for this entry
                data[i].value = value;
                // data[i].gender = newGender;

            }

        }

        setselectedDobs(data);
    }

    function setGenderDefault(item, index) {
        let genderId = "-";

        for (let i = 0; i < genderList.length; i++) {

            if (item.gender === "F") {

                if (genderList[i].label == "Female") {
                    return genderList[i].value;
                }
            }
            else if (item.gender === "M") {
                if (genderList[i].label == "Male") {
                    return genderList[i].value;
                }
            }
            else if (item.gender === "O") {
                if (genderList[i].label == "Others") {
                    return genderList[i].value;
                }
            }
            else {
                return 0;
            }

        }



        // return genderId;

    }


    const handleGenderChange = (event, index) => {
        const newSelectedGenders = [...selectedDobs];


        for (let i = 0; i < genderList.length; i++) {

            if (genderList[i].value === event.target.value) {
                newSelectedGenders[index].gender = genderList[i].label;
            }

        }

        newSelectedGenders[index].value = event.target.value;
        setselectedDobs(newSelectedGenders);


    };


    return (
        <>
            {selectedDobs && selectedDobs.map((item, index) => {
                return (
                    <Grid container spacing={2} key={index}>

                        <Grid item xs={12} sm={4} mt={5}>
                            <Typography mt={2}>
                                {item.name}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={3} mt={5}>

                            <TextField

                                fullWidth
                                InputLabelProps={{
                                    shrink: true
                                }}
                                label="Date of birth"
                                name="date"
                                type="date"
                                value={item.dob}
                                // onChange={handleChange}
                                required={true}
                            />


                            {/* <DatePicker
                                defaultValue={dayjs(item.dob)}
                                views={['year', 'month', 'day']}
                            /> */}
                            {/* <DateField fullWidth defaultValue={"11-1-2013"} /> */}


                            {/* <Select
                                id={index}
                                // ref={selectRef}
                                value={item.value}
                                // value={setGenderDefault(item)}
                                // label="Family Head"
                                fullWidth
                                onChange={(event) => handleGenderChange(event, index)}

                           
                                


                            >
                                {genderList && genderList.map((gender_item, gender_index) => {
                                    return (
                                        <MenuItem value={gender_item.value}>{gender_item.label}</MenuItem>
                                    )
                                })}

                            </Select> */}
                        </Grid>






                    </Grid>
                )


            })}



            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>

                <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    // disabled={isError()}
                    // color="success"
                    onClick={() => handleBack()}
                    style={{ backgroundColor: 'blue' }}
                // onClick={!isError() ? handleNext : () => null}
                >
                    Back
                </Button>



                <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    // disabled={isError()}
                    // color="success"
                    onClick={() => handleNext()}
                    style={{ backgroundColor: 'blue' }}
                // onClick={!isError() ? handleNext : () => null}
                >
                    Save and Proceed
                </Button>
            </Box>
        </>
    );
}
