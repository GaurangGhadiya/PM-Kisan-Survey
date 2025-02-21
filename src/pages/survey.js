"use client"
import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// import Head from "next/head";
import CloseIcon from '@mui/icons-material/Close';

import withAuth from "../utils/withAuth";

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';


import Swal from "sweetalert2";

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

import Grid from '@mui/material/Grid';



import StepForm from "../components/stepper/StepForm";

import {
    onFormData
} from "../network/actions/formData";

// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';



// import { GetServerSideProps } from 'next';

import { onDashboard } from "../network/actions/dashboard";
import { useDispatch, useSelector } from 'react-redux';

import Layout from "../components/dashboard/layout";
// import { Steps } from 'antd';


import {
    CollectionsBookmark,
    Edit,
    Feedback,
    Help,
    PermMedia,
    UploadFile,
    Work,
} from "@mui/icons-material";
import { Alert, Button, Card } from "@mui/material";
import LinearStepper from '../components/stepper/LinearStepper'
import SearchBar from "../components/SearchBar";
import { onRationDetails } from "../network/actions/rationSearch";
import { DataGrid } from "@mui/x-data-grid";
import { AppContext } from "../components/stepper/Context";
import StepperControl from "../components/stepper/StepperControl";
import { onGenderList } from "../network/actions/genders";
import Snackbar from '@mui/material/Snackbar';
import InfoIcon from '@mui/icons-material/Info';


const drawWidth = 220;


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    borderRadius: 2,
    // border: '2px solid #000',
    boxShadow: 24, overflow: 'auto'
};


const innerStyle = {
    overflow: 'auto',
    width: 400,
    height: 400,
};



function Dashboard(props) {
    const [mobileViewOpen, setMobileViewOpen] = React.useState(false);
    const steps = ['Add Member', 'Family Details', 'Enter Property Details', 'Preview Details'];

    const [search, setSearch] = useState("");
    const [checked, setChecked] = React.useState([0]);
    const [selectedItems, setSelectedItems] = useState([]);

    const [rationList, setrationList] = useState([]);

    const [step, setStep] = useState(1);

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const [showForm, setShowForm] = useState(false);

    const [snackDetails, setSnackDetails] = useState({ color: "#000", message: "" });



    const [openInfo, setopenInfo] = React.useState(false);
    const handleInfoOpen = () => setopenInfo(true);
    const handleInfoClose = () => setopenInfo(false);


    const { formValues } = useContext(
        AppContext
    );

    // const [open, setOpen] = React.useState(false);


    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;




    const dispatch = useDispatch();
    const data = useSelector((state) => state.dashboard);

    const rationData = useSelector((state) => state.rationDetails);

    const gender = useSelector((state) => state.gender);


    let religionData = useSelector((state) => state.religion);




    const columns = [
        { field: 'aadhaarNumber', headerName: 'Aadhar No.', width: 130 },
        { field: 'rationCardNumber', headerName: 'Ration No.', width: 170 },
        { field: 'memberName', headerName: 'Member Name', width: 130 },
        { field: 'dateOfBirth', headerName: 'Date of Birth', width: 130 },
        { field: 'gender', headerName: 'Gender', width: 80 },
        { field: 'mobileNumber', headerName: 'Mobile', width: 130 },
        { field: 'panchayatName', headerName: 'Panchayat', width: 130 },
        { field: 'villageName', headerName: 'Village', width: 130 },
        { field: 'cardType', headerName: 'Card Type', width: 130 },


    ];
    const onSearchChange = (searchQuery) => {
        setSearch(searchQuery);

    };



    async function searchRationCard() {
        // Swal.fire({
        //     className: "swal-title",
        //     title: `Loading Ration Details for :${search} `,
        //     html: 'Please wait...',
        //     allowEscapeKey: true,
        //     allowOutsideClick: true,
        //     didOpen: () => {
        //         Swal.showLoading()
        //     }
        // });
        dispatch(onRationDetails(search));
    }





    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };


    const handleClick = (newState) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };



    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };




    useEffect(() => {



        if (rationData?.data) {
            const { data, status, message, rationCardAlreadyExists } = rationData.data || {};


            if (status === "OK" && message === "SUCCESS") {




                setrationList(data);
                setopenInfo(true)




                for (let i = 0; i < data.length; i++) {
                    let { headofFamily, bonafide, economicLevel, religion, category, resident, district, municipality, ward, date } = formValues;
                    // const { memberName } = props.familyDetails[a];

                    if (data[i].relationName === "Self") {
                        formValues.headOfFamily.value = data[i].memberName;

                    }

                    formValues.economicLevel.value = data[i].cardType;
                    formValues.religion.value = data[i].casteCategory;
                    formValues.religion.value = data[i].address;
                    formValues.district.value = data[i].district;



                    // let object = { label: memberName, year: "" }

                    // members.push(object)



                }



            }
            const has404 = rationData?.error?.message.indexOf("404") !== -1;


            if (rationData?.error) {
                // Swal.hideLoading()

                if (has404) {
                    if (rationData.data.length == 0) {
                        setSnackDetails({ color: "error", message: "No Member Found" })
                        setState({ ...{ vertical: 'top', horizontal: 'right' }, open: true });


                        setrationList(data);
                    }


                    else {


                        // handleClick({ vertical: 'top', horizontal: 'right' })
                        // setOpen(true)
                    }
                }
            }





        }

    }, [rationData])



    const onRowsSelectionHandler = (ids) => {


        let rows = rationList;
        const selectedRowsData = ids.map((id) => rows.find((row) => row.aadhaarNumber === id));

        setSelectedItems(selectedRowsData);
    };


    const formVisibility = (formVisible) => {
        setShowForm(formVisible);


    };


    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );



    return (
        <div>
            <div>
                <Layout>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openInfo}
                        onClose={handleInfoClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                        style={{ minHeight: 400, overflow: 'auto' }}
                    >
                        <Fade in={openInfo}>

                            <Box sx={style}>

                                <Typography variant="h4" style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    background: "#0b72a9",
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                    padding: 10
                                }}>
                                    <InfoIcon color="info" />
                                </Typography>

                                <Box sx={innerStyle}>
                                    {/* <Typography id="transition-modal-title" variant="h6" component="h2">
                                    Text in a modal
                                </Typography> */}
                                    <Typography id="transition-modal-description" sx={{ mt: 3, ml: 3, mr: 3, mb: 3 }} style={{ color: '#0b72a9' }} fontWeight={500} >
                                        Family” means a joint family of all persons descended from a common ancestor including by adoption,
                                        who live, worship and mess together permanently.
                                        Ward-wise Parivar Register is being created for every Municipal Council/ Nagar Panchayat OR Municipal Corporation
                                        in accordance with Section 51-A of the Himachal Pradesh Municipal (Amendment) Act, 2022 OR Section 44-A of the
                                        Himachal Pradesh Municipal Corporation (Second Amendment) Act, 2022 as the case may be. Parivar Register shall contain
                                        the names and particulars of all persons, family-wise, who are Citizen of India and the “Bonafide Residents” which forms
                                        part of the Ward Sabha area. \n \n  “Bonafide resident” means a person who has a permanent home in Himachal Pradesh and
                                        includes a person who has been residing in Himachal Pradesh for a period of not less than 20 years or a person who has
                                        permanent home in Himachal Pradesh but on account of his occupation he is living outside Himachal Pradesh.
                                    </Typography>

                                </Box>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    style={{ backgroundColor: '#074465', height: 54, borderRadius: 0 }}
                                    onClick={() => {
                                        setopenInfo(false);
                                    }}
                                >
                                    OK
                                </Button>

                            </Box>
                        </Fade>
                    </Modal>


                    <Paper
                        variant="outlined"
                        sx={{ my: { xs: 3 }, mx: { xs: 3 }, p: { xs: 2, } }}
                    >
                        {/* <div className="px-6 py-5 font-semibold border-b border-gray-100">Ration Search</div> */}

                        <Typography style={{ fontSize: 16, marginBottom: 24 }} >
                            Ration Search
                        </Typography>

                        <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={handleClose}
                            // message={snackDetails.message}
                            // color={snackDetails.color}
                            // style={{ backgroundColor: snackDetails.color }}
                            key={vertical + horizontal}
                        >
                            {/* <Alert onClose={handleClose} severity={snackDetails.message} sx={{ width: '100%' }}>
                                This is a success message!
                            </Alert> */}

                        </Snackbar>

                        {!showForm &&
                            <div>
                                <Grid
                                    container
                                    spacing={3}
                                    direction="row"

                                >
                                    <Grid item xs={9}><SearchBar onSearch={onSearchChange} value={search} /></Grid>
                                    <Grid item xs={3}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            style={{ backgroundColor: '#074465', height: 54 }}
                                            onClick={() => {
                                                searchRationCard()
                                            }}
                                        >
                                            Search
                                        </Button></Grid>
                                </Grid>



                                {rationList && rationList.length > 0 &&

                                    <div style={{ display: 'table', tableLayout: 'fixed', width: '100%', marginTop: 20 }}>
                                        <DataGrid
                                            rows={rationList}
                                            columns={columns}

                                            // initialState={{
                                            //     pagination: {
                                            //         paginationModel: { page: 0, pageSize: 5 },
                                            //     },
                                            // }}
                                            // pageSizeOptions={[5, 10]}
                                            checkboxSelection
                                            hideFooter
                                            getRowId={(row) => row.aadhaarNumber}
                                            onRowSelectionModelChange={
                                                (ids) => onRowsSelectionHandler(ids)
                                            }
                                        />

                                    </div>
                                }




                                {selectedItems.length > 0 &&

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        // style={{ backgroundColor: 'blue' }}

                                        onClick={() => {
                                            dispatch(onFormData(selectedItems))

                                            setShowForm(true)
                                            // handlePost()
                                        }}

                                    >
                                        Proceed for Verification
                                    </Button>
                                }
                            </div>
                        }




                        {showForm &&
                            <StepForm formVisible={formVisibility} selectedFamily={selectedItems} />

                            // <StepperControl selectedFamily={selectedItems} />
                        }

                    </Paper>
                </Layout>
            </div>
        </div >
    );
}

export default withAuth(Dashboard);



// export const getServerSideProps = async (context) => {
//     // Fetch data from an API or a database

//     // Return the data as props
//     return {
//         props: {
//             data,
//         },
//     };
// };
