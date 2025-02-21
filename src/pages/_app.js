
import { Provider, useSelector } from 'react-redux';
import '../styles/globals.css'
// import "tailwindcss/tailwind.css";
import store from '../store';



import { StepsProvider } from "../components/stepper/Context";
import React, { useEffect } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NextNProgress from 'nextjs-progressbar';


import { createTheme } from '../theme';
import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';

import Loader from '../components/Loader';
// import { Rubik } from '@next/font/google'

// const inter = Rubik({ subsets: ['latin'] })


export default function App(props) {

  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();




  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>

          <StepsProvider>
            <main >
              <NextNProgress />
              <Component {...pageProps} />
            </main>
          </StepsProvider>

        </Provider>
      </ThemeProvider>
    </LocalizationProvider>


  )
}
