import React, { useContext } from "react";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import Box from "@mui/material/Box";

const Settings = () => {
  return (
    <>
      <TopNav />
      <Box height={30}></Box>
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Settings</h1>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
