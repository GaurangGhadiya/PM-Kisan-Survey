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
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import withAuth from "../utils/withAuth";

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorIcon from '@mui/icons-material/Error';

import Swal from "sweetalert2";

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

import Grid from '@mui/material/Grid';

import EditIcon from '@mui/icons-material/Edit';

import StepForm from "../components/stepper/StepForm";

import {
    onFormData
} from "../network/actions/formData";

// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';

import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';

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
import axios from "axios";
import { onRolesList } from "../network/actions/rolesList";
const drawWidth = 220;
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { onRolesDetails } from "../network/actions/rolesDetails";
import Select from 'react-select';

import CloseIcon from '@mui/icons-material/Close';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Pagination from '@mui/material/Pagination';

import { onRolesUpdate } from "../network/actions/updateRoles";

import TableRow from '@mui/material/TableRow';
import { getUserName } from "../utils/cookie";
import { onRolesCreate } from "../network/actions/createRole";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    height: "70%",
    bgcolor: 'background.paper',
    borderRadius: 1,
    // border: '2px solid #000',
    boxShadow: 24, overflow: 'auto'
};


const selectStyles = {
    // Example to change the font size of options
    option: (provided, state) => ({
        ...provided,
        fontSize: '12px', // Change the font size as needed
    }),
    // Example to change the font size of the input field
    input: (provided) => ({
        ...provided,
        fontSize: '12px', // Change the font size as needed
    }),
    // Example to change the font size of the whole component
    control: (provided) => ({
        ...provided,
        height: '20px',
        fontSize: '12px', // Change the font size as needed
    }),
};

// const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };



const innerStyle = {
    overflow: 'auto',
    width: 400,
    height: 400,
};
const columns = [
    { id: 'id', label: 'Sr. No', minWidth: 170 },
    { id: 'name', label: 'Role Type', minWidth: 100 },
    { id: 'active', label: 'Status', minWidth: 100 },

    { id: 'view', label: 'View', minWidth: 100 },



];


function Dashboard(props) {
    const [mobileViewOpen, setMobileViewOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const [edit, setEdit] = React.useState(false);

    const [addOpen, setAddOpen] = React.useState(false);

    const [showAlert, setShowAlert] = React.useState(false);
    const [message, setMessage] = React.useState({ message: "", type: "" });


    const [updateCalled, setupdateCalled] = React.useState(false);
    const [addCalled, setaddCalled] = React.useState(false);

    const [listCalled, setlistCalled] = React.useState(false);

    const [detailsCalled, setdetailsCalled] = React.useState(false);



    const [details, setDetails] = React.useState({});

    const rolesData = useSelector((state) => state.rolesList)

    const rolesDetails = useSelector((state) => state.rolesDetails)
    const rolesUpdateData = useSelector((state) => state.updateRoles)
    const createRolesData = useSelector((state) => state.createRoles)



    const handleOpen = () => setOpen(true);
    const handleClose = () => setShowAlert(false);


    const [rolesList, setrolesList] = React.useState([]);

    const [rolesDropDown, setrolesDropDown] = React.useState([]);

    const [statusDropDown, setstatusDropDown] = React.useState([
        { label: "Active", value: 1 },
        { label: "Deactive", value: 2 }
    ]);



    const [role, setRole] = React.useState("");

    const [status, setStatus] = React.useState("");


    const [newrole, setnewrole] = React.useState("");

    const [newstatus, setnewstatus] = React.useState("");






    const [openInfo, setopenInfo] = React.useState(false);




    // const [open, setOpen] = React.useState(false);







    const dispatch = useDispatch();


    const handleClick = () => {
        setShowAlert(true);
    };

    useEffect(() => {


        if (createRolesData && addCalled) {



            const { data, message, status } = createRolesData.data || {};


            setaddCalled(false)

            if (message === "SUCCESS" || status === "OK") {

                handleClick();
                setMessage({ message: "Role Added", type: "success" })

                setAddOpen(false)

            }
            else {
                handleClick();
                setMessage({ message: "Role Add Error", type: "error" })
            }

        }

    }, [createRolesData])




    useEffect(() => {

        if (rolesUpdateData && updateCalled) {



            const { data, message, status } = rolesUpdateData.data || {};


            setupdateCalled(false);

            if (message === "SUCCESS" || status === "OK") {

                handleClick();
                setMessage({ message: "Role Updated", type: "success" })


                setOpen(false)

            }
            else {
                handleClick();
                setMessage({ message: "Error Updating Role", type: "error" })

            }

        }

    }, [rolesUpdateData])


    useEffect(() => {

        if (rolesData && listCalled) {
            const { data } = rolesData || {};
            setlistCalled(true)
            if (data) {
                if
                    (data.data) {
                    setrolesList(data.data)

                    let object = {};
                    let array = [];
                    for (let a = 0; a < data.data.length; a++) {
                        object = { label: data.data[a].name, value: data.data[a].id };
                        array.push(object);
                    }

                    setrolesDropDown(array);

                }

            }

        }

    }, [rolesData])





    async function fetchData() {

        dispatch(onRolesList());
        // const headers = {
        //     'Content-Type': 'application/json', // Example header
        //     'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Example authorization header
        //     // Add other headers as needed
        // };

        // try {
        //     const response = await axios.get('https://himparivarservices.hp.gov.in/urban-dept/role/list', {
        //         headers: headers
        //     });

        //     if (response.data) {
        //         setrolesList(response.data.data)
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    }





    useEffect(() => {


        if (rolesDetails && detailsCalled) {
            setdetailsCalled(false)
            if (rolesDetails.data) {
                if (rolesDetails.data.data) {
                    setDetails(rolesDetails.data.data);
                    setOpen(true)


                    let object = {};
                    let array = [];
                    for (let a = 0; a < rolesList.length; a++) {
                        object = { label: rolesList[a].name, value: rolesList[a].id };
                        if (details.name === rolesList[a].name) {
                            setRole(object)
                            if (details.active) {
                                setStatus({ label: "Active", value: 1 })
                            }
                            if (!details.active) {
                                setStatus({ label: "Deactive", value: 2 })
                            }

                        }
                    }



                }
            }
        }

    }, [rolesDetails])

    const onRowsSelectionHandler = (ids) => {

        setEdit(false)

        // let rows = rolesList;
        // const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));

        // fetchDetails(ids[0])

        setdetailsCalled(true)
        dispatch(onRolesDetails(ids))
        // setSelectedItems(selectedRowsData);
    };

    const addNewRole = () => {
        let userName = getUserName();

        if (userName) {
            userName = JSON.parse(userName)
        }
        let params = {

            "name": newrole.label,

            "active": newstatus.label === "active" ? true : false,

            "loggedInUserName": userName

        }

        setaddCalled(true)

        dispatch(onRolesCreate(params))

    }





    const updateRole = () => {


        let userName = getUserName();

        if (userName) {
            userName = JSON.parse(userName)
        }
        let params = {
            id: details.id,
            name: role.label,
            "active": status.label === "active" ? true : false,

            loggedInUserName: userName
        }

        setupdateCalled(true)

        dispatch(onRolesUpdate(params))




    }



    useEffect(() => {

        setlistCalled(true)
        fetchData();




    }, [])







    return (
        <div>
            <div>
                <Layout>

                    <div className="p-4 flex-grow">


                        <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity={message.type} sx={{ width: '100%' }}>
                                {message.message}
                            </Alert>
                        </Snackbar>

                        {/* Add Role */}

                        <Modal
                            open={addOpen}
                            onClose={() => { setAddOpen(false) }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>

                                <div
                                    style={{
                                    }}
                                >

                                    <Grid container  >
                                        <Grid item={true} xs={11.2}  >
                                            <Typography fontWeight='600' style={{ fontSize: 20, textAlign: 'center', padding: 10 }} color="black">
                                                Add Role
                                            </Typography>


                                        </Grid>

                                        <Grid item={true} xs={0.5} style={{ justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end' }} >
                                            <IconButton aria-label="delete" size="small" onClick={() => setAddOpen(false)}>
                                                <HighlightOffIcon fontSize="medium" />
                                            </IconButton>
                                        </Grid>


                                    </Grid>

                                    {/* <Divider variant="fullWidth" horizontal style={{ marginTop: 10, marginBottom: 10 }} /> */}
                                    <>
                                        <Box style={{ padding: 10 }}>



                                            <Grid container >



                                                <Grid item={true} xs={12} sm={2} sx={{ justifyContent: 'center', alignSelf: 'center' }}>
                                                    <Typography style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: 0.5 }} >
                                                        Name:
                                                    </Typography>


                                                </Grid>

                                                <Grid item={true} xs={12} sm={4} >

                                                    <Select
                                                        styles={selectStyles}
                                                        closeMenuOnSelect={true}
                                                        value={newrole}
                                                        options={rolesDropDown}
                                                        onChange={(event) => {
                                                            setnewrole(event)
                                                        }}
                                                    />

                                                </Grid>





                                            </Grid>



                                            <Grid container mt={3}>

                                                <Grid item={true} xs={12} sm={2} sx={{ justifyContent: 'center', alignSelf: 'center' }}>
                                                    <Typography style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: 0.5 }} >
                                                        Status
                                                    </Typography>


                                                </Grid>

                                                <Grid item={true} xs={12} sm={4}>

                                                    <Select
                                                        styles={selectStyles}
                                                        closeMenuOnSelect={true}
                                                        value={newstatus}
                                                        options={statusDropDown}
                                                        onChange={(event) => {
                                                            setnewstatus(event)
                                                        }}
                                                    />



                                                </Grid>

                                            </Grid>




                                        </Box>





                                        {/* <Button onClick={() => { setEdit(false) }} variant="text">Submit</Button> */}
                                    </>

                                </div>

                                <Grid container >
                                    <Grid item={true} mt={4} xs={12} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                                        <Button
                                            onClick={() => { addNewRole() }}
                                            variant="contained" disableElevation sx={{ width: 300, alignItems: 'center', justifyContent: 'center' }} >
                                            Add New Role
                                        </Button>

                                    </Grid>

                                </Grid>



                            </Box>

                        </Modal>





                        <Modal
                            open={open}
                            onClose={() => { setOpen(false) }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>

                                <div
                                    style={{
                                    }}
                                >

                                    <Grid container  >
                                        <Grid item={true} xs={11.2}  >
                                            <Typography fontWeight='600' style={{ fontSize: 20, textAlign: 'center', padding: 10 }} color="black">
                                                Role
                                            </Typography>


                                        </Grid>

                                        <Grid item={true} xs={0.5} style={{ justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end' }} >
                                            <IconButton aria-label="delete" size="small" onClick={() => setOpen(false)}>
                                                <HighlightOffIcon fontSize="medium" />
                                            </IconButton>
                                        </Grid>


                                    </Grid>

                                    {/* <Divider variant="fullWidth" horizontal style={{ marginTop: 10, marginBottom: 10 }} /> */}
                                    <>
                                        <Box style={{ padding: 10 }}>
                                            <Grid container >

                                                <Grid item={true} xs={12} sm={2}>

                                                </Grid>

                                                <Grid item={true} xs={12} sm={4} >


                                                </Grid>



                                                <Grid item={true} xs={12} sm={2}>




                                                </Grid>

                                                <Grid container justifyContent="flex-end">
                                                    {edit &&
                                                        <Button onClick={() => { setEdit(false) }} variant="outlined" startIcon={<CloseIcon />}>
                                                            Cancel
                                                        </Button>

                                                        // <Button onClick={() => { setEdit(false) }} variant="text">Cancel</Button>

                                                    }

                                                    {!edit &&

                                                        <Button onClick={() => { setEdit(true) }} variant="outlined" startIcon={<EditIcon />}>
                                                            Edit
                                                        </Button>

                                                        // <Button onClick={() => { setEdit(true) }} variant="text">Edit </Button>

                                                    }



                                                </Grid>


                                            </Grid>





                                            <Grid container >



                                                <Grid item={true} xs={12} sm={2} sx={{ justifyContent: 'center', alignSelf: 'center' }}>
                                                    <Typography style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: 0.5 }} >
                                                        Name:
                                                    </Typography>


                                                </Grid>

                                                <Grid item={true} xs={12} sm={4} >

                                                    {!edit &&
                                                        <Typography style={{ fontSize: 14, letterSpacing: 0.5 }} >
                                                            {details.name}
                                                        </Typography>
                                                    }

                                                    {edit &&

                                                        <Select
                                                            styles={selectStyles}
                                                            closeMenuOnSelect={true}
                                                            value={role}
                                                            options={rolesDropDown}
                                                            onChange={(event) => {
                                                                setRole(event)
                                                            }}
                                                        />

                                                    }


                                                </Grid>





                                            </Grid>



                                            <Grid container mt={3}>

                                                <Grid item={true} xs={12} sm={2} sx={{ justifyContent: 'center', alignSelf: 'center' }}>
                                                    <Typography style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: 0.5 }} >
                                                        Status
                                                    </Typography>


                                                </Grid>

                                                <Grid item={true} xs={12} sm={4}>

                                                    {!edit &&
                                                        <Typography style={{ fontSize: 14, letterSpacing: 0.5 }} >
                                                            {details.status ?

                                                                <Chip icon={<DoneAllIcon fontSize='small' color='success' />} label="Active" style={{ height: 20 }} />
                                                                : <Chip icon={<ErrorIcon color='error' fontSize='small' />} label="Not Active" style={{ height: 20 }} />}

                                                        </Typography>

                                                    }

                                                    {edit &&

                                                        <Select
                                                            styles={selectStyles}
                                                            closeMenuOnSelect={true}
                                                            value={status}
                                                            options={statusDropDown}
                                                            onChange={(event) => {
                                                                setStatus(event)
                                                            }}
                                                        />

                                                    }



                                                </Grid>

                                            </Grid>




                                        </Box>





                                        {/* <Button onClick={() => { setEdit(false) }} variant="text">Submit</Button> */}
                                    </>

                                </div>

                                <Grid container >
                                    <Grid item={true} mt={4} xs={12} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                                        {edit &&

                                            <Button
                                                onClick={() => { updateRole() }}
                                                variant="contained" disableElevation sx={{ width: 300, alignItems: 'center', justifyContent: 'center' }} >
                                                Update Role
                                            </Button>}

                                    </Grid>

                                </Grid>



                            </Box>

                        </Modal>




                        <Button onClick={() => setAddOpen(true)} style={{ justifyContent: 'flex-end', alignContent: 'flex-end' }} variant="contained">Add Role</Button>


                    </div>



                    <Grid
                        container

                        sx={{ borderRadius: 6, padding: 2 }}
                    >
                        <Grid item={true} xs={12} md={12} lg={12} sx={{ background: "#FFF", borderRadius: 6 }}>

                            <div style={{ display: 'table', tableLayout: 'fixed', width: '100%', maxHeight: "500px" }}>

                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <TableContainer sx={{ maxHeight: 400, height: 400 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column, index) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ minWidth: column.minWidth, background: "#074465", color: "#FFF" }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rolesList && rolesList
                                                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row, index2) => {
                                                        return (
                                                            <TableRow hover role="checkbox" tabIndex={-1} key={index2} >
                                                                {columns.map((column) => {
                                                                    const value = row[column.id];
                                                                    return (
                                                                        <TableCell
                                                                            className="hoverable-cell"

                                                                            key={column.id} align={column.align}
                                                                            onClick={(handleEvent) => {


                                                                            }}>
                                                                            {column.id === "active" &&
                                                                                <>
                                                                                    {row.active ?
                                                                                        <p>Active</p>
                                                                                        :
                                                                                        <p>Not Active</p>}
                                                                                </>
                                                                            }

                                                                            {column.id === "view" &&
                                                                                <>
                                                                                    <Button onClick={() => {


                                                                                        onRowsSelectionHandler(row.id)

                                                                                        // setSelectedItems(row)
                                                                                        // setdetailCalled(true);
                                                                                        // dispatch(onFamiliesDetailApi(row.himParivarId, row.rationCardNo))



                                                                                    }} >View</Button>

                                                                                </>
                                                                            }


                                                                            {column.format && typeof value === 'number'
                                                                                ? column.format(value)
                                                                                : value}
                                                                        </TableCell>
                                                                    );
                                                                })}
                                                            </TableRow>
                                                        );
                                                    })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {/* <Pagination style={{ padding: 10, display: 'flex', justifyContent: 'flex-end' }} count={10} color="primary" /> */}

                                    {/* <TablePagination
                                    rowsPerPageOptions={[5, 10, 20]}
                                    component="div"
                                    count={familyList?.content ? familyList?.content.length : 0}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                /> */}
                                </Paper>


                            </div>


                        </Grid>

                    </Grid>




                    {/* <DataGrid
                        rows={rolesList}
                        columns={columns}

                        // initialState={{
                        //     pagination: {
                        //         paginationModel: { page: 0, pageSize: 5 },
                        //     },
                        // }}
                        // pageSizeOptions={[5, 10]}
                        hideFooter
                        getRowId={(row) => row.id}
                        onRowSelectionModelChange={
                            (ids) => onRowsSelectionHandler(ids)
                        }
                    /> */}

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
