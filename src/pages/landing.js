"use client";
import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import NavBar from "../components/LandingPage/NavBar";
import { Box, Grid, Paper, Typography } from "@mui/material";

import TopBar from "../components/LandingPage/TopBar";
import SectionComponent from "../components/LandingPage/main/SectionComponent";
import SubSection from "../components/LandingPage/main/SubSection";
import Hero from "../components/LandingPage/main/Hero";
import { getToken } from "../utils/cookie";

const { Header, Content, Footer } = Layout;

const Landing = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const token = getToken();

  return (
    <Layout>
      <TopBar />

      <NavBar />
      <Content className="site-layout" style={{}}>
        <div
          style={{
            background: colorBgContainer,
          }}
        >
          <Hero />

          <SubSection />

          {/* <SectionComponent /> */}
          <Grid></Grid>
        </div>
      </Content>

      <Box
        sx={{ flexGrow: 1 }}
        style={{
          display: "flex",
          alignItems: "center",
          miHeight: "10vh",
          padding: "20px",
          justifyContent: "center",
          backgroundColor: "#f2f0f1",
          flexDirection: "column",
        }}
      >
        {/* <Typography style={{
                    paddingBottom: '10px',
                }}>
                    Provided by{' '}

                </Typography> */}
        <Typography
          style={{
            opacity: "0.4",
          }}
        >
          Designed & developed by DDT&G
        </Typography>
      </Box>

      {/* <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                DIT ©2023 All Rights Reserved
            </Footer> */}
    </Layout>
  );
};
export default Landing;
