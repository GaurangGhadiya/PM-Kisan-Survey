import React, { useCallback, useContext, useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "./Context";
import Autocomplete from '@mui/material/Autocomplete';
import { InputAdornment, InputLabel, MenuItem, Typography } from "@mui/material";
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
import { TextFields } from "@mui/icons-material";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function VerifyAadhar(props) {

    const [birthUserList, setbirthUserList] = useState([]);

    const forms = useSelector((state) => state.formData);

    const familyDetails = useSelector((state) => state.familyDetail)

    const [dobList, setdobList] = useState([]);

    const [memberList, setMemberList] = useState([]);

    const [familyHead, setFamilyHead] = useState("");

    const [aadharNumberList, setaadharNumberList] = useState([]);
    const [showOTP, setShowOTP] = useState(false);

    const [selectAuthType, setSelectAuthType] = useState({});


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
                        
                        members.push({ label: value[i].memberName, value: value[i].aadhaarNumber, mobileNumber: value[i].mobileNumber, ekyc: value[i].ekycStatus, error: undefined, required: true, message: "Please Verify Aadhaar", show_auth: false, show_otp: false })

                    }
                }


                setMemberList(members);

            }

        }




    }, [])

    const handleGenderChange = (event, index, name, event_type) => {
        const newSelectedGenders = [...memberList];


        for (let i = 0; i < memberList.length; i++) {
            newSelectedGenders[index].occupation.value = event.value;
            newSelectedGenders[index].occupation.label = event.label;

            newSelectedGenders[index].error = false;


        }

        setMemberList(newSelectedGenders);

    };


    const showAuthChange = (item, index, show_auth) => {
        const newSelectedGenders = [...memberList];


        for (let i = 0; i < memberList.length; i++) {

            if (i === index) {
                newSelectedGenders[index].show_auth = show_auth;
            }
        }

        setMemberList(newSelectedGenders);

    };

    const showOTPChange = (item, index, show_otp) => {
        const newSelectedGenders = [...memberList];


        for (let i = 0; i < memberList.length; i++) {

            if (i === index) {
                newSelectedGenders[index].show_otp = show_otp;
            }
        }

        setMemberList(newSelectedGenders);

    };




    const checkValidations = () => {
        const newSelectedGenders = [...memberList];
        let errorShow = false;


        for (let i = 0; i < memberList.length; i++) {

            if (memberList[i].occupation) {
                if (memberList[i].occupation.value == undefined) {
                    newSelectedGenders[i].error = true;
                    errorShow = true
                }
            }

        }

        setMemberList(newSelectedGenders);

        return errorShow;

    };


    function validatePhoneNumber(input_str) {
        var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

        return re.test(input_str);
    }


    return (
        <>
            {memberList && memberList.map((item, index) => {
                return (
                    <div key={index} style={{ width: "100%" }}>

                        <Paper elevation={3} style={{ width: '100%', padding: 20, marginBottom: 20 }} key={index}>


                            <Grid container spacing={3}>

                                <Grid item xs={12} sm={3} >
                                    <InputLabel style={{ marginTop: 10, justifyContent: 'center', }} id="demo-simple-select-helper-label">   {item.label}</InputLabel>

                                </Grid>

                                <Grid item xs={12} sm={3} >

                                    <TextField
                                        fullWidth
                                        error={item.ekyc === "eKYC Compliant" ? false : true}
                                        size="small"
                                        id="outlined-error"
                                        label=""
                                        defaultValue={item.value}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {item.ekyc === "eKYC Compliant" ?
                                                        <VerifiedIcon color="success" />
                                                        : <VerifiedIcon color="error" />}


                                                </InputAdornment>
                                            )
                                        }}

                                    />
                                </Grid>
                                <Grid item xs={10} sm={4} >

                                    <Button
                                        variant="contained"
                                        // sx={{ ml: 1 }}
                                        // disabled={isError()}
                                        // color="success"
                                        // onClick={() => handleBack()}
                                        style={{ background: 'red' }}
                                        onClick={() => { showAuthChange(item, index, !item.show_auth) }}
                                    >
                                        Authenticate Aadhaar
                                    </Button>
                                </Grid>

                            </Grid>

                            {/* {item.show_auth && */}
                            {item.show_auth &&

                                <>
                                    <Grid container spacing={3} mt={1}>
                                        <Grid item xs={12} sm={12} >
                                            <InputLabel style={{ marginTop: 10, justifyContent: 'center', textAlign: 'center', fontSize: 16, fontWeight: '550', background: '#bbfbfc' }} id="demo-simple-select-helper-label">Perform Authentication/eKYC</InputLabel>
                                        </Grid>



                                    </Grid>

                                    <Grid container spacing={3} mt={1}>
                                        <Grid item xs={12} sm={3} >
                                            <InputLabel style={{ justifyContent: 'center', fontWeight: '500' }} id="demo-simple-select-helper-label">Name in Ration </InputLabel>
                                        </Grid>
                                        <Grid item xs={12} sm={4} >
                                            <InputLabel style={{ justifyContent: 'center', fontWeight: '500' }} id="demo-simple-select-helper-label">{item.label} </InputLabel>
                                        </Grid>
                                    </Grid>

                                    <Grid container mt={1}>
                                        <Grid item xs={12} sm={12} style={{ background: '#bbfbfc' }} >
                                            <InputLabel style={{ justifyContent: 'center', textAlign: 'center', fontWeight: '550' }} id="demo-simple-select-helper-label">{"Please select the Choice"}</InputLabel>
                                            <InputLabel style={{ justifyContent: 'center', textAlign: 'center', fontWeight: '550' }} id="demo-simple-select-helper-label">{"for  Performing the Authentication for eKYC"}</InputLabel>

                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3} mt={1}>
                                        <Grid item xs={12} sm={3} >
                                            <InputLabel style={{}} id="demo-simple-select-helper-label">Please Select</InputLabel>
                                            <InputLabel style={{}} id="demo-simple-select-helper-label">the Authentication Type</InputLabel>



                                        </Grid>
                                        <Grid item xs={12} sm={3} >

                                            <Select
                                                closeMenuOnSelect={true}
                                                value={selectAuthType}
                                                options={[{ label: "eKYC (Demographic)", value: "eKYC (Demographic)" }]}
                                                onChange={(event) => {

                                                    setSelectAuthType(event)
                                                    // setFamilyHead(event)
                                                    // handleGenderChange(event, index, item.label, "name")
                                                }}
                                            />

                                            {/* <InputLabel style={{ marginTop: 10, justifyContent: 'center', fontWeight: '500' }} id="demo-simple-select-helper-label">{item.label} </InputLabel> */}
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3} style={{ justifyContent: 'center' }}>
                                        <Grid item xs={12} sm={4} mt={1} >
                                            <Button
                                                variant="contained"
                                                // sx={{ ml: 1 }}
                                                // disabled={isError()}
                                                // color="success"
                                                // onClick={() => handleBack()}
                                                style={{ background: 'red' }}
                                                onClick={() => { showOTPChange(item, index, !item.show_otp) }}
                                            >
                                                Send OTP
                                            </Button>
                                        </Grid>

                                    </Grid>



                                    <Grid container spacing={3} mt={1}>
                                        <Grid item xs={12} sm={3} >
                                            <InputLabel style={{ marginTop: 10, justifyContent: 'center', }} id="demo-simple-select-helper-label">Enter OTP</InputLabel>

                                        </Grid>
                                        <Grid item xs={12} sm={3} >

                                            <TextField
                                                fullWidth
                                                error={item.error}
                                                size="small"
                                                id="outlined-error"
                                                label=""
                                                defaultValue={""}
                                            // InputProps={{
                                            //     startAdornment: (
                                            //         <InputAdornment position="start">
                                            //             <PhoneAndroidIcon />

                                            //         </InputAdornment>
                                            //     )
                                            // }}

                                            />

                                            {/* <InputLabel style={{ marginTop: 10, justifyContent: 'center', fontWeight: '500' }} id="demo-simple-select-helper-label">{item.label} </InputLabel> */}
                                        </Grid>
                                    </Grid>


                                    <Grid container spacing={3} style={{ justifyContent: 'center' }}>
                                        <Grid item xs={12} sm={4} mt={1}>
                                            <Button
                                                variant="contained"
                                                // sx={{ ml: 1 }}
                                                // disabled={isError()}
                                                // color="success"
                                                // onClick={() => handleBack()}
                                                style={{ background: 'red' }}
                                                onClick={() => { showOTPChange(item, index, !item.show_otp) }}
                                            >
                                                Perform E-KYC
                                            </Button>
                                        </Grid>

                                    </Grid>


                                </>
                            }




                            {/* } */}


                            {/* {item.show_auth &&

                                <Grid container spacing={3} mt={1}>

                                    <Grid item xs={12} sm={2} >
                                        <InputLabel style={{ marginTop: 10, justifyContent: 'center', }} id="demo-simple-select-helper-label">Mobile Number</InputLabel>

                                    </Grid>
                                    <Grid item xs={12} sm={3} >

                                        <TextField
                                            fullWidth
                                            error={item.error}
                                            size="small"
                                            id="outlined-error"
                                            label=""
                                            defaultValue={item.mobileNumber}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PhoneAndroidIcon />


                                                    </InputAdornment>
                                                )
                                            }}

                                        />
                                    </Grid>
                                    <Grid item xs={10} sm={1.6} >

                                        <Button
                                            variant="contained"
                                            // sx={{ ml: 1 }}
                                            // disabled={isError()}
                                            // color="success"
                                            // onClick={() => handleBack()}
                                            style={{ background: 'red' }}
                                            onClick={() => { showOTPChange(item, index, !item.show_otp) }}
                                        >
                                            Send OTP
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12} sm={1.3} >
                                        <InputLabel style={{ marginTop: 10, justifyContent: 'center', }} id="demo-simple-select-helper-label">Enter OTP</InputLabel>
                                    </Grid>

                                    <Grid item xs={12} sm={2} >

                                        <TextField
                                            fullWidth
                                            error={item.error}
                                            size="small"
                                            id="outlined-error"
                                            label=""
                                            defaultValue={""}
                                        // InputProps={{
                                        //     startAdornment: (
                                        //         <InputAdornment position="start">
                                        //             <PhoneAndroidIcon />

                                        //         </InputAdornment>
                                        //     )
                                        // }}

                                        />
                                    </Grid>

                                    <Grid item xs={10} sm={1.6} >

                                        <Button
                                            variant="contained"
                                            // sx={{ ml: 1 }}
                                            // disabled={isError()}
                                            // color="success"
                                            // onClick={() => handleBack()}
                                            style={{ background: 'red' }}
                                            onClick={() => { showOTPChange(item, index, !item.show_otp) }}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>



                                </Grid>
                            } */}





                        </Paper>
                    </div>

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
                    onClick={() => {

                        let errorShow = checkValidations();

                        if (!errorShow) {
                            handleNext()
                        }
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
