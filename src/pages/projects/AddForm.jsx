import React from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Swal from "sweetalert2";
import { useAppStore } from "../../appStore";

const AddForm = ({ closeEvent }) => {
  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    console.log(data);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const [projectData, setProjectData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "",
    description: "",
    pid: "",
  });
  const empCollectionRef = collection(db, "projects");
  const setRows = useAppStore((state) => state.setRows);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProjectData((prevProjectData) => {
      return {
        ...prevProjectData,
        [name]: value,
      };
    });
  };
  const createUser = async() => {
        console.log(projectData);
        await addDoc(empCollectionRef, projectData);
        getUsers();
        closeEvent();
        Swal.fire("Added!", "Your Project has been added.", "success")
  }
  const statusOptions = [
    {
      value: "completed",
      label: "completed",
    },
    {
      value: "in progress",
      label: "in progress",
    },
    {
      value: "overdue",
      label: "overdue",
    },
  ];
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Add Project
      </Typography>
      <IconButton
        style={{ position: "absolute", right: 0, top: 0 }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20}></Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            size="small"
            value={projectData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Project id"
            type="number"
            variant="outlined"
            size="small"
            name="pid"
            value={projectData.pid}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="startDate"
            variant="outlined"
            size="small"
            name="startDate"
            value={projectData.startDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="endDate"
            variant="outlined"
            size="small"
            name="endDate"
            value={projectData.endDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-select-currency"
            select
            label="Project Status"
            defaultValue="completed"
            size="small"
            name="status"
            onChange={handleChange}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="description"
            variant="outlined"
            size="small"
            name="description"
            value={projectData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={createUser}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 5 }}></Box>
    </>
  );
};

export default AddForm;
