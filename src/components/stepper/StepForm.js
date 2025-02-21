import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import Confirm from "./Confirm";
import Success from "./Success";
import { AppContext } from "./Context";
import '../../styles/SelectPlan/SelectPlan.module.css'
import { Button, StepContent } from "@mui/material";

import FamilyDetails from "./FamilyDetails"
import { StepperContext } from "@mui/material";
import Gender from "./Gender";
import DateOfBirth from "./DateOfBirth";
import { useSelector } from "react-redux";
import Relations from "./Relations";
import Qualifications from "./Qualifications";
import Occupation from "./Occupation";
import VerifyAadhar from "./VerifyAadhar";
import PropertyDetails from "./PropertyDetails";
import MobileUpdate from "./MobileUpdate";
import EmailUpdate from "./EmailUpdate";



// Step titles
const labels = ["Family Details", "Gender", "Date Of Birth", "Family Relations", "Educational Qualifications", "Occupation", "Verify Aadhar", "Property Details", "Mobile Update", "Email Update"];
const handleSteps = (step, props) => {
    switch (step) {
        case 0:
            return <FamilyDetails familyDetails={props.selectedFamily} />;
        case 1:
            return <Gender familyDetails={props.selectedFamily} />;
        case 2:
            return <DateOfBirth familyDetails={props.selectedFamily} />;

        case 3:
            return <Relations familyDetails={props.selectedFamily} />;

        case 4:
            return <Qualifications familyDetails={props.selectedFamily} />;

        case 5:
            return <Occupation familyDetails={props.selectedFamily} />;

        case 6:
            return <VerifyAadhar familyDetails={props.selectedFamily} />;

        case 7:
            return <PropertyDetails familyDetails={props.selectedFamily} />;

        case 8:
            return <MobileUpdate familyDetails={props.selectedFamily} />;


        case 9:
            return <EmailUpdate familyDetails={props.selectedFamily} />;






        // case 3:
        //     return <Confirm />;
        default:
            throw new Error("Unknown step");
    }
};

export default function StepForm(props) {
    const { activeStep } = useContext(AppContext);

    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 767px)').matches);

    const [formData, setFormData] = useState();


    const forms = useSelector((state) => state.formData);




    let families = props.selectedFamily;



    const formVisibility = () => {
        // Call the parent function when a button is clicked
        props.formVisible(false);
    };

    const handleScreenSizeChange = (event) => {
        setIsMobile(event.matches);
    };

    useEffect(() => {
        // Add a listener for screen size changes
        const mediaQueryList = window.matchMedia('(max-width: 767px)');
        mediaQueryList.addListener(handleScreenSizeChange);

        // Initial check of screen size
        setIsMobile(mediaQueryList.matches);

        // Clean up the listener when the component unmounts
        return () => {
            mediaQueryList.removeListener(handleScreenSizeChange);
        };
    }, []);


    const updateFormData = (stepData) => {

        // this.setState((prevState) => ({
        //     formData: {
        //         ...prevState.formData,
        //         ...stepData,
        //     },
        // }));
    };


    return (
        <>
            {activeStep === labels.length ? (
                <Success />
            ) : (
                <>
                    {/* <Box>
                        <Typography variant="h5" align="center">
                            Member Details
                        </Typography>

                    </Box> */}


                    <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel={isMobile ? false : true} orientation={isMobile ? "vertical" : 'horizontal'} >
                        {labels.map((label) => (
                            <Step key={label}>
                                <StepLabel style={{
                                    // Add your custom styling here
                                    color: 'green',
                                    fontWeight: 'bold',
                                }}
                                >{label}</StepLabel>


                                {isMobile &&
                                    <StepContent>
                                        {handleSteps(activeStep, props)}
                                    </StepContent>
                                }

                            </Step>
                        ))}
                    </Stepper>


                    <Button onClick={() => formVisibility()}>
                        go back
                    </Button>

                    {!isMobile &&
                        <>
                            {handleSteps(activeStep, props)}

                        </>
                    }

                </>
            )}
        </>
    );
}
