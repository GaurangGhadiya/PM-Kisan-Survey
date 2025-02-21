import React from 'react';
import { Grid, Typography, Button, Box, createTheme, ThemeProvider } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { getImagePath } from '../../../utils/CustomImagePath';

const timeline = {
    backgroundColor: "#75A47F",
    color: "white",
    fontSize: "40px",
    height: "100px",
    width: "100px",
    display: "grid",
    placeItems: "center",
}

const theme = createTheme({
    components: {
      MuiTimelineConnector: {
        styleOverrides: {
          root: {
            backgroundColor: '#074465', // Change the background color to red
          },
        },
      },
    },
  });

const SubSection = () => {

    return (

        <Box style={{
            backgroundColor: '#e7f1f6',
            paddingLeft: "2.5rem",
            paddingTop: 100
        }}>

            <Typography variant="h2" fontWeight={600} style={{
                fontSize: '1rem',
                color: "#074465",

            }}>
                HOW IT WORKS
            </Typography>

            <Typography variant="h2" fontWeight={600} style={{
                fontSize: '2rem',
                color: "#074465",

            }}>
                Conducting a survey with ease in three simple steps.
            </Typography>
            <ThemeProvider theme={theme}>
            <Timeline
            style={{marginTop : "70px"}}
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot style={timeline}>01</TimelineDot>   
          <TimelineConnector style={{backgroundColor: "#75A47F"}}/>
        </TimelineSeparator>
        <TimelineContent>
        <Grid container spacing={5} style={{
                    display: 'flex',
                    // alignItems: 'center',
                }}>

                    <Grid item xs={12} md={6} >
                       

                        <Typography variant="h4" fontWeight={700} style={{
                            paddingBottom: '15px',
                            marginTop : 20
                        }}>
                            Login into the Application
                        </Typography>

                        <Typography
                            fontWeight={500}
                            style={{
                                fontSize: '1.2rem',
                                lineHeight: 1.8,
                                paddingBottom: '30px',
                            }}>
                            Easily log into the application using the credentials provided by the department, ensuring secure access to your authorized account. The Application user-friendly interface simplifies the login process for your convenience. Once logged in, you can explore the applications features and resources, making it a seamless experience.
                        </Typography>

                    </Grid>

                    <Grid item xs={12} md={6} container justifyContent="center" style={{

                    }}>
                        <img src={getImagePath('/images/login1.png')} alt="My Team" style={{
                            height: 350,
                            marginBottom : 50
                        }} />
                        <img src={getImagePath('/images/login2.jpg')} alt="My Team" style={{
                            height: 350,
                            marginBottom : 50,
                            marginLeft : 20
                        }} />
                    </Grid>


                </Grid>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
        <TimelineDot  style={timeline}>02</TimelineDot>   
        <TimelineConnector style={{backgroundColor: "#75A47F"}}/>
        </TimelineSeparator>
        <TimelineContent>  <Grid container spacing={5} style={{
                    display: 'flex',
                    // alignItems: 'center',
                }}>

                    <Grid item xs={12} md={6}>
                       

                        <Typography variant="h4" fontWeight={700} style={{
                            paddingBottom: '15px',
                            marginTop : 20
                        }}>
Conducting Survey
                        </Typography>

                        <Typography
                            fontWeight={500}
                            style={{
                                fontSize: '1.2rem',
                                lineHeight: 1.8,
                                paddingBottom: '30px',
                            }}>
The farmer database, utilizing data from the PM Kisan Database shared by the NIC Department, offers multiple convenient options for data collection. Surveyors can choose to proceed via the PM Kisan Database, streamlining the process if the farmer is registered in the database, or opt for a hassle-free survey without it. Additionally, the application allows you to easily add new farmers to the existing database, ensuring that the agricultural data is always up-to-date and accurate. With these flexible survey options, the application aims to provide a seamless and efficient experience while ensuring that the information contributes to the maintenance of essential agricultural records.   </Typography>

                    </Grid>

                    <Grid item xs={12} md={6} container justifyContent="center" style={{

                    }}>
                        <img src={getImagePath('/images/step2.jpg')} alt="My Team" style={{
                            height: 350,
                            marginBottom : 50

                        }} />
                    </Grid>


                </Grid></TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
        <TimelineDot  style={timeline}>03</TimelineDot>  
        {/* <TimelineConnector />  */}
        </TimelineSeparator>
        <TimelineContent>  <Grid container spacing={5} style={{
                    display: 'flex',
                    // alignItems: 'center',
                }}>

                    <Grid item xs={12} md={6}>
                       

                        <Typography variant="h4" fontWeight={700} style={{
                            paddingBottom: '15px',
                            marginTop : 20
                        }}>
Data to be Captured
                        </Typography>

                        <Typography
                            fontWeight={500}
                            style={{
                                fontSize: '1.2rem',
                                lineHeight: 1.8,
                                paddingBottom: '30px',
                            }}>
Within the Farmer Database survey, it is imperative to capture a spectrum of key data elements ensuring comprehensive and accurate information. This encompasses gathering Aadhaar authentication, farmer details, land particulars, crop information, and capturing consent. The Aadhaar authentication provides a robust verification layer, while farmer details include essential demographics. Land details offer insights into agricultural holdings, while crop specifics shed light on farming activities. Consent collection ensures compliance and transparency throughout the process. Additionally, incorporating farmer photos adds a visual identification element, enhancing database integrity. These modules collectively contribute to a thorough and reliable farmer database, facilitating informed decision-making in agricultural management.                </Typography>

                    </Grid>

                    <Grid item xs={12} md={6} container justifyContent="center" style={{

                    }}>
                        <img src={getImagePath('/images/step3.jpg')} alt="My Team" style={{
                            height: 350,
                            marginBottom : 50

                        }} />
                    </Grid>


                </Grid></TimelineContent>
      </TimelineItem>
    </Timeline>

    </ThemeProvider>



            {/* <Box style={{
                width: '100%',
                display: 'flex',
                minHeight: '500px',
                marginTop: 50
            }}>

                <Grid container spacing={5} style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h2" fontWeight={600} style={{
                            paddingBottom: '15px',
                            fontSize: '8rem',
                            color: "#074465"
                        }}>
                            01
                        </Typography>

                        <Typography variant="h4" fontWeight={700} style={{
                            paddingBottom: '15px',
                        }}>
                            Login into the Application
                        </Typography>

                        <Typography
                            fontWeight={500}
                            style={{
                                fontSize: '1.2rem',
                                lineHeight: 1.8,
                                paddingBottom: '30px',
                            }}>
                            Easily log into the application using the credentials provided by the department, ensuring secure access to your authorized account. The Application user-friendly interface simplifies the login process for your convenience. Once logged in, you can explore the applications features and resources, making it a seamless experience.
                        </Typography>

                    </Grid>

                    <Grid item xs={12} md={6} container justifyContent="center" style={{

                    }}>
                        <img src={'/urban/images/steps/step1.jpg'} alt="My Team" style={{
                            height: 500,
                        }} />
                    </Grid>


                </Grid>
            </Box>



            <Box style={{
                width: '100%',
                display: 'flex',
                minHeight: '500px',
                marginTop: 50
            }}>

                <Grid container spacing={5} style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Grid item xs={12} md={6} container justifyContent="center" style={{

                    }}>
                        <img src={'/urban/images/steps/step2.jpg'} alt="My Team" style={{
                            height: 500,
                        }} />
                    </Grid>


                    <Grid item xs={12} md={6}>
                        <Typography variant="h2" fontWeight={600} style={{
                            paddingBottom: '15px',
                            fontSize: '8rem',
                            color: "#074465"
                        }}>
                            02
                        </Typography>

                        <Typography variant="h4" fontWeight={700} style={{
                            paddingBottom: '15px',
                        }}>
                            Conducting Survey
                        </Typography>

                        <Typography
                            fontWeight={500}
                            style={{
                                fontSize: '1.2rem',
                                lineHeight: 1.8,
                                paddingBottom: '30px',
                                paddingRight: 60,

                            }}>
                            The survey application offers multiple convenient options for conducting data collection. The surveyor can choose to proceed via Ration Card Number, streamlining the process if the citizen has one, or opt for a hassle-free survey without it. Additionally,the applciation allows you to easily add new members to the existing families/family, ensuring that the household data is always up-to-date and accurate. With these flexible survey options, the application aims to provide a seamless and efficient experience while ensuring that the information contributes to the maintenance of essential records.
                        </Typography>

                    </Grid>




                </Grid>
            </Box>




            <Box style={{
                width: '100%',
                display: 'flex',
                minHeight: '500px',
                marginTop: 50
            }}>

                <Grid container spacing={5} style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h2" fontWeight={600} style={{
                            paddingBottom: '15px',
                            fontSize: '8rem',
                            color: "#074465"
                        }}>
                            03
                        </Typography>

                        <Typography variant="h4" fontWeight={700} style={{
                            paddingBottom: '15px',
                        }}>
                            Data to be Captured
                        </Typography>

                        <Typography
                            fontWeight={500}
                            style={{
                                fontSize: '1.2rem',
                                lineHeight: 1.8,
                                paddingBottom: '30px',
                            }}>
                            During the survey, it is essential to capture a range of key data elements to ensure comprehensive and accurate information.
                            These include gathering family details, gender, date of birth, and entering family relations to establish connections within households.
                            Additionally, educational qualifications and occupation data are collected to understand the demographic and socioeconomic landscape.
                            Verification of Aadhaar, property details, mobile numbers, and email addresses adds an extra layer of precision to the data.
                            Lastly, capturing consent is an integral part of the survey process to ensure compliance and transparency.
                            These mandatory parameters collectively contribute to a thorough and reliable survey outcome.
                        </Typography>

                    </Grid>

                    <Grid item xs={12} md={6} container justifyContent="center" style={{

                    }}>
                        <img src={'/urban/images/steps/step3.jpg'} alt="My Team" style={{
                            height: 500,
                        }} />
                    </Grid>


                </Grid>
            </Box> */}






        </Box>
    );
};

export default SubSection;