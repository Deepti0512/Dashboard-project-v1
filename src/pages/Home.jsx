import React, { useContext } from "react";
import SideNav from "../components/SideNav";
import Box from "@mui/material/Box";
import TopNav from "../components/TopNav";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "../Dash.css";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AccordionDash from "../components/AccordionDash";
import BarChart from '../charts/BarChart';

const Home = () => {
  return (
    <div className="bgcolor">
      <TopNav />
      <Box height={70}></Box>
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack spacing={2} direction="row">
                <Card
                  sx={{ minWidth: 49 + "%", height: 150 }}
                  className="gradient"
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "white" }}
                    >
                      $500.00
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: "white" }}
                    >
                      React is a JavaScript-based UI development library. It is
                      used to build single-page applications.
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{ minWidth: 49 + "%", height: 150 }}
                  className="gradientlight"
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      $900.50
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: "white" }}
                    >
                      Although React is a library rather than a language, it is
                      widely used in web development.
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={2}>
                <Card sx={{ maxWidth: 345 }} className="gradientlight">
                  <CardContent>
                    <Stack spacing={2} direction="row">
                      <div className="iconStyle">
                        <AcUnitIcon />
                      </div>
                      <div className="paddingall">
                        <span className="countTitle">250</span>
                        <br />
                        <span className="countSubtitle">Total Projects</span>
                      </div>
                    </Stack>
                  </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }} className="gradient">
                  <CardContent>
                    <Stack spacing={2} direction="row">
                      <div className="iconStyle">
                        <AcUnitIcon />
                      </div>
                      <div className="paddingall">
                        <span className="countTitle">250</span>
                        <br />
                        <span className="countSubtitle">Total Projects</span>
                      </div>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
          <Box height={20} />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                  <BarChart/>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                  <div className="paddingall">
                    <span className="countTitle"> Popular Projects</span>
                  </div>
                  <AccordionDash />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
