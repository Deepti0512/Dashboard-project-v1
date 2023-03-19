import React from 'react'
import SideNav from '../components/SideNav'
import TopNav from '../components/TopNav'
import Box from "@mui/material/Box";
import ProjectList from './projects/ProjectList';

const Projects = () => {
  return (
    <>
    <div className="bgcolor">
      <TopNav />
      <Box height={70}></Box>
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ProjectList />
        </Box>
      </Box>
    </div>
    </>
  )
}

export default Projects