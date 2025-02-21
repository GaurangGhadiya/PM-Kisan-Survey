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


export default function Relations(props) {

    const [birthUserList, setbirthUserList] = useState([]);

    const forms = useSelector((state) => state.formData);

    const familyDetails = useSelector((state) => state.familyDetail)

    const [dobList, setdobList] = useState([]);

    const [memberList, setMemberList] = useState([]);

    const [familyHead, setFamilyHead] = useState("");

    const [relations, setrelationsList] = useState([]);



    const initialGenders = ['', ''];
    const [selectedDobs, setselectedDobs] = useState(initialGenders);


    const { handleChange, handleNext, variant, margin, handleBack } = useContext(
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
                        

                        members.push({ label: value[i].memberName, value: value[i].memberName, relation: {}, relative_name: {} })

                    }
                }


                setMemberList(members);

            }

        }

        const getAllMaster = async () => {

            const callAPi = await fetch('/urban/api/relation-api');

            const res = await callAPi.json();


            const { relations } = res || {};

            let economic_list = [];


            

            let rel_array = [];
            if (relations) {

                for (let i = 0; i < relations.length; i++) {

                    let object = { label: relations[i].relationNameEnglish, value: relations[i].id }
                    rel_array.push(object);

                }


                setrelationsList(rel_array)

            }
        }

        getAllMaster();


    }, [])

    const handleGenderChange = (event, index, name, event_type) => {
        const newSelectedGenders = [...memberList];


        for (let i = 0; i < memberList.length; i++) {

            if (memberList[i].label === name && event_type === "relation") {
                newSelectedGenders[index].relation.value = event.value;
                newSelectedGenders[index].relation.label = event.label;

            }
            else if (memberList[i].label === name && event_type === "name") {
                newSelectedGenders[index].relative_name.value = event.value;
                newSelectedGenders[index].relative_name.label = event.label;

            }

        }

        setMemberList(newSelectedGenders);

    };


    return (
        <>
            {memberList && memberList.map((item, index) => {
                return (

                    <Paper elevation={3} style={{ width: '100%', padding: 10, marginBottom: 20 }} key={index}>

                        <Typography mt={2} style={{ textAlign: 'center', fontSize: 18, marginBottom: 16 }}>
                            {item.label}
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <InputLabel style={{ marginBottom: 5 }} id="demo-simple-select-helper-label">Name of the Relative</InputLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <Select
                                    closeMenuOnSelect={true}
                                    value={item.relation_name}
                                    options={memberList}
                                    onChange={(event) => {
                                        // setFamilyHead(event)
                                        handleGenderChange(event, index, item.label, "name")
                                    }}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <InputLabel style={{ marginBottom: 5 }} id="demo-simple-select-helper-label">Relation with Relative</InputLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <Select
                                    closeMenuOnSelect={true}
                                    value={item.relation}
                                    options={relations}
                                    onChange={(event) => {
                                        // setFamilyHead(event)
                                        handleGenderChange(event, index, item.label, "relation")

                                    }}
                                />
                            </Grid>
                        </Grid>

                    </Paper>

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
