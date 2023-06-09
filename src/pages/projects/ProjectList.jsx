import React from "react";
import { useState, useEffect } from "react";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from "@mui/material/Modal";
import { useAppStore } from "../../appStore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function statusStyle(status) {
  let resultStyle;
  if (status === "in progress") {
    resultStyle = {
      backgroundColor: "yellow",
      color: "black",
      textTransform:"capitalize",
    };
  } else if (status === "completed") {
    resultStyle = {
      backgroundColor: "green",
      color: "black",
      textTransform:"capitalize",
    };
  } else {
    resultStyle = {
      backgroundColor: "red",
      color: "white",
      textTransform:"capitalize",
    };
  }
  return resultStyle;
}

export default function ProjectList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const empCollectionRef = collection(db, "projects");
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [formid, setFormid] = useState("");
  const handleEditOpen = () => setEditOpen(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  const setRows = useAppStore((state) => state.setRows);
  const rows = useAppStore((state) => state.rows);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    console.log(data);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setRows([]);
    getUsers();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    console.log(id);
    const userDoc = doc(db, "projects", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };

  //Todo: filter according to status value
  const filterData = (v) => {
    v && console.log(v.status);
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      getUsers();
    }
  };
  // const filterData = (v) => {
  //   v && console.log(v.status);
  //   if(v){
  //     const currStatus = v.status;
  //     setRows((prevRow)=>{
  //       prevRow.map((row)=>{
  //         if(row.status === currStatus){
  //           return row;
  //         }
  //       })
  //     })
  //   }
  // else{
  //   setRows([]);
  //   getUsers();
  // }
  // };

  const editData = (name, startDate, endDate, status, id, description,pid) => {
    const data = {
      id: id,
      name: name,
      startDate: startDate,
      endDate: endDate,
      status: status,
      description: description,
      pid:pid
    };
    console.log(data);
    setFormid(data);
    handleEditOpen();
  };
  return (
    <>
      <div>
        <Modal
          open={open}
          //onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddForm closeEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editopen}
          //onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditForm closeEvent={handleEditClose} fid={formid} />
          </Box>
        </Modal>
      </div>
      {rows.length > 0 && (
        <Paper sx={{ width: "100%", overflow: "hidden" ,padding:"5px"}}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Projects List
          </Typography>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.status || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Projects" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, margin:"2px" }}

            ></Typography>
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={handleOpen}             
            >
              Add
            </Button>
          </Stack>
          <Box height={10} />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Start date
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    End date
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Status
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell key={row.id} align="left">
                          {row.name}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.startDate}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                          {row.endDate}
                        </TableCell>
                        <TableCell
                          key={row.id}
                          align="left"
                          sx={statusStyle(row.status)}
                        >
                          {row.status}
                        </TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={() => {
                                editData(
                                  row.name,
                                  row.startDate,
                                  row.endDate,
                                  row.status,
                                  row.id,
                                  row.description,
                                  row.pid
                                );
                              }}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5,10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}
