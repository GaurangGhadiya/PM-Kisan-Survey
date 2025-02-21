import React, { useCallback, useContext, useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "./Context";
import Autocomplete from '@mui/material/Autocomplete';
import { InputLabel, MenuItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { DateField } from "@mui/x-date-pickers";
import { DatePicker } from "antd";
const moment = require("moment");
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Select from 'react-select'


export default function PropertyDetails(props) {

    const [birthUserList, setbirthUserList] = useState([]);

    const forms = useSelector((state) => state.formData);

    const familyDetails = useSelector((state) => state.familyDetail)

    const [dobList, setdobList] = useState([]);

    const [memberList, setMemberList] = useState([]);

    const [familyHead, setFamilyHead] = useState("");

    const [occupationsList, setOccupationsList] = useState([]);

    const [property, setProperty] = useState({});

    const [propertyId, setPropertyId] = useState("");

    const [landlord, setLandlord] = useState("");




    const [electricity, setElectricity] = useState("");

    const [water, setWater] = useState("");

    // const [isValid, setIsValid] = useState([]);





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

                for (let i = 0; i < value.length; i++) {

                    if (value[i].memberName) {
                        
                        members.push({ label: value[i].memberName, value: value[i].memberName, property: {}, error: undefined, required: true, message: "Please Enter Details" })

                    }
                }


                setMemberList(members);

            }

        }

        const getAllMaster = async () => {

            const callAPi = await fetch('/api/occupation-api');

            const res = await callAPi.json();


            const { occupations } = res || {};

            let edu_list = [];



            if (occupations) {

                for (let i = 0; i < occupations.length; i++) {

                    let object = { label: occupations[i].professionName, value: occupations[i].id }
                    edu_list.push(object);

                }


                setOccupationsList(edu_list)

            }
        }

        getAllMaster();


    }, [])

    const handleGenderChange = (event, index, name, event_type) => {
        const newSelectedGenders = [...memberList];


        for (let i = 0; i < memberList.length; i++) {
            newSelectedGenders[index].property.value = event.value;
            newSelectedGenders[index].property.label = event.label;

            newSelectedGenders[index].error = false;


        }

        setMemberList(newSelectedGenders);

    };



    const checkValidations = () => {
        const newSelectedGenders = [...memberList];
        let errorShow = false;


        for (let i = 0; i < memberList.length; i++) {

            if (memberList[i].property) {
                if (memberList[i].property.value == undefined) {
                    newSelectedGenders[i].error = true;
                    errorShow = true
                }
            }

        }

        setMemberList(newSelectedGenders);

        return errorShow;

    };



    return (
        <>


            <Grid container spacing={3}>
                <Grid item xs={12} sm={3} >
                    <InputLabel style={{ justifyContent: 'center', fontSize: 14 }} id="demo-simple-select-helper-label">Property Type</InputLabel>
                    <InputLabel style={{ justifyContent: 'center', fontSize: 14 }} id="demo-simple-select-helper-label">{"{Rented/Owner}"}</InputLabel>

                </Grid>

                <Grid item xs={12} sm={3} >

                    <Select
                        closeMenuOnSelect={true}
                        value={property}
                        options={[
                            { label: "Rented", value: "Rented" },
                            { label: "Owned", value: "Owned" },
                            { label: "Leased", value: "Leased" },


                        ]}
                        onChange={(event) => {
                            setProperty(event)
                            // setFamilyHead(event)
                            // handleGenderChange(event, index, item.label, "name")
                        }}
                        required={true}
                    />
                </Grid>
            </Grid>





            <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={3} >
                    <InputLabel style={{ justifyContent: 'center', fontSize: 14 }} id="demo-simple-select-helper-label">Electricity</InputLabel>
                    <InputLabel style={{ justifyContent: 'center', fontSize: 14 }} id="demo-simple-select-helper-label">{"{Consumer Number}"}</InputLabel>

                </Grid>

                <Grid item xs={12} sm={3} >

                    <TextField
                        fullWidth
                        error={false}
                        size="small"
                        id="outlined-error"
                        label=""
                        defaultValue={electricity}
                        onChange={(event) => {
                            setElectricity(event.target.value);
                        }}

                    />
                </Grid>
            </Grid>



            <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={3} >
                    <InputLabel style={{ justifyContent: 'center', fontSize: 14 }} id="demo-simple-select-helper-label">Water Connection</InputLabel>
                    <InputLabel style={{ justifyContent: 'center', fontSize: 14 }} id="demo-simple-select-helper-label">{"{Consumer Number}"}</InputLabel>

                </Grid>

                <Grid item xs={12} sm={3} >
                    <TextField
                        fullWidth
                        error={false}
                        size="small"
                        id="outlined-error"
                        label=""
                        defaultValue={water}
                        onChange={(event) => {
                            setWater(event.target.value);
                        }}

                    />
                </Grid>
            </Grid>




            <Grid container mt={1}>
                <Grid item xs={12} sm={12} style={{ background: '#1976d2' }} >
                    <InputLabel style={{ justifyContent: 'center', textAlign: 'center', fontWeight: '400', color: '#FFF' }} id="demo-simple-select-helper-label">{"Enter Details of Rented Property"}</InputLabel>

                </Grid>
            </Grid>



            <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={3} >
                    <InputLabel style={{ justifyContent: 'center', fontSize: 14 }} id="demo-simple-select-helper-label">Rent Given To</InputLabel>
                    <InputLabel style={{ justifyContent: 'center', fontSize: 14 }} id="demo-simple-select-helper-label">{"(Enter the Name of LandLord)"}</InputLabel>

                </Grid>

                <Grid item xs={12} sm={3} >
                    <TextField
                        fullWidth
                        error={false}
                        size="small"
                        id="outlined-error"
                        label=""
                        defaultValue={landlord}
                        onChange={(event) => {
                            setLandlord(event.target.value);
                        }}

                    />
                </Grid>
            </Grid>



            <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={3} >
                    <InputLabel style={{ justifyContent: 'center', fontSize: 14 }} id="demo-simple-select-helper-label">Enter Property Id</InputLabel>

                </Grid>

                <Grid item xs={12} sm={3} >
                    <TextField
                        fullWidth
                        error={false}
                        size="small"
                        id="outlined-error"
                        label=""
                        defaultValue={propertyId}
                        onChange={(event) => {
                            setPropertyId(event.target.value);
                        }}

                    />
                </Grid>
            </Grid>




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
                    onClick={() => {

                        let errorShow = checkValidations();

                        handleNext()
                        // handleNext()
                    }}
                    style={{ backgroundColor: 'blue' }}
                // onClick={!isError() ? handleNext : () => null}
                >
                    Save and Proceed
                </Button>
            </Box>
        </>
    );
}
