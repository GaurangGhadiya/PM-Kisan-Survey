import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

const SectionComponent = () => {

    const sectionItems = [
        {
            id: 1,
            icon: <EngineeringOutlinedIcon sx={{ fontSize: 100 }} color="primary" />,
            sentence:
                'Solving world problems through various web applications using efficient programs and tools',
        },
        {
            id: 2,
            icon: <AllInclusiveIcon sx={{ fontSize: 100 }} color="primary" />,
            sentence:
                'Through team work, we collaborate and deliver quality projects of high standards',
        },
        {
            id: 3,
            icon: <PaidOutlinedIcon sx={{ fontSize: 100 }} color="primary" />,
            sentence: 'Flexible payment plan is applicable to all our services',
        },
    ];
    return (
        <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
            <Grid container style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minHeight: '500px',
            }}>
                {sectionItems.map((item) => (
                    <Grid
                        item
                        xs={12}
                        md={3.5}
                        minHeight={300}
                        key={item.id}
                        style={{
                            backgroundColor: '#f2f0f1',
                            textAlign: 'center',
                            padding: '30px',
                            width: '200px',
                            borderRadius: '10px',
                            margin: '30px',
                        }}
                    >
                        {item.icon}
                        <Typography>{item.sentence}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SectionComponent;