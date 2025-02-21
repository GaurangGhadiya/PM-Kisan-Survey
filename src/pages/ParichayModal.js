import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const ParichayModal = ({ open, handleClose }) => {
    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth={"md"}
        // fullWidth={ true}
        >
            <DialogContent dividers>

                {/* eKalyan */}
                <iframe
                    src={`${process.env.NEXT_PUBLIC_PARICHAY_IFRAME}/GovLogin?service_id=${process.env.NEXT_PUBLIC_PARICHAY_IFRAME_SERVICEID}&app_unique=${process.env.NEXT_PUBLIC_ONBOARDING_APP}`}
                    height={552}
                    width={410}
                    style={{ border: "none", marginTop: "-10px", marginBottom: "-10px", height: "552px" }}
                />
            </DialogContent>

        </BootstrapDialog>
    )
}

export default ParichayModal