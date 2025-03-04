import { Box, Button, Grid, TextField, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  useAddAdmins,
  useDeleteAdmins,
  useFetchAdmin,
  useUpdateUser,
} from "./useAdmin";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";



const Home = () => {

  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // for showing notification //
  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  let form = useForm();
  let { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { mutate } = useAddAdmins();

  
  // for add user //
  const submitHandler = (data) => {
    // alert("form submitted")
    console.log(data);
    mutate(data, {
      onSuccess: () => {
        showSnackbar("User added successfully!", "success");
        refetch();  // Refetch data 
      },
      onError: () => showSnackbar("Failed to add user!", "error"),
    });
  };


  // for display user //
  const { data: users, isLoading, isError, refetch } = useFetchAdmin();
  const { mutate: deleteBtn } = useDeleteAdmins();
  const { mutate: upDateBtn } = useUpdateUser();

  // console.log(users);
  let mydatas = users?.data;

  if (isLoading) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <h2>Error occurred</h2>
      </>
    );
  }


  // for edit user //

  const EditBtn = (user) => {
    setEditUserId(user.id);
    setEditFormData({
      name: user.name,
      email: user.email,
    });
  };

  // edit values
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save edit data
  const saveBtn = () => {
    if (editFormData.name.trim() && editFormData.email.trim()) {
      upDateBtn(
        { id: editUserId, data: editFormData },
        {
          onSuccess: () => {
            showSnackbar("User updated successfully!", "success");
            refetch(); 
          },
          onError: () => showSnackbar("Failed to update user!", "error"),
        }
      );
      setEditUserId(null);
      setEditFormData({ name: "", email: "" });
    }
  };

  // For cancel edit
  const cancelBtn = () => {
    setEditUserId(null);
    setEditFormData({ name: "", email: "" });
  };

  return (
    <>
      <Box className="user-box"
        sx={{
          height: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Grid className="user-body">
          <Grid className="heading" sx={{ textAlign: "center" }}>
            NextTick
          </Grid>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid
              sx={{
                backgroundColor: "white",
                mt: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="form"
            >
              <TextField
                placeholder="Enter name"
                variant="standard"
                {...register("name", {
                  required: {
                    value: true,
                    message: "name is required",
                  },
                  minLength:{
                    value:3,
                    message:"Atleast 3 character"
                  }
                })}
                helperText={errors.name?.message}
                sx={{
                  "& .MuiInputBase-root:before, & .MuiInputBase-root:after": {
                    display: "none",
                  },
                  "& .MuiInputBase-root": {
                    border: "none",
                  },
                }}
              />
              <TextField
                placeholder="email"
                variant="standard"
                {...register("email", {
                  required: {
                    value: true,
                    message: "email is required",
                  },
                  pattern: {
                    value: /^([a-z0-9]+)@([a-z]{5,12}).([a-z.]{2,20})$/,
                    message: "wrong pattern",
                  },
                })}
                helperText={errors.email?.message}
                sx={{
                  "& .MuiInputBase-root:before, & .MuiInputBase-root:after": {
                    display: "none",
                  },
                  "& .MuiInputBase-root": {
                    border: "none",
                  },
                }}
              />
              <Button type="submit">Add</Button>
            </Grid>
          </form>

          {/* for edit in jsx part  */}
          <Grid className="tasks"
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {mydatas.map((usr) => (
              <Grid
                key={usr.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#f9f9f9",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                {editUserId === usr.id ? (
                  <>
                    <TextField
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                      variant="standard"
                      sx={{
                        "& .MuiInputBase-root:before, & .MuiInputBase-root:after":
                          {
                            display: "none",
                          },
                        "& .MuiInputBase-root": {
                          border: "none",
                        },
                      }}
                    />
                    <TextField
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                      variant="standard"
                      sx={{
                        "& .MuiInputBase-root:before, & .MuiInputBase-root:after":
                          {
                            display: "none",
                          },
                        "& .MuiInputBase-root": {
                          border: "none",
                        },
                      }}
                    />
                    <Box>
                      <IconButton onClick={saveBtn} color="success">
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={cancelBtn} color="error">
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  </>
                ) : (
                  <>
                    <span >
                      {usr.name}  {usr.email}
                    </span>
                    <Box>
                      <IconButton onClick={() => EditBtn(usr)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          deleteBtn(usr.id, {
                            onSuccess: () => {
                              showSnackbar("User deleted successfully!", "success");
                              refetch(); 
                            },
                            onError: () =>
                              showSnackbar("Failed to delete user!", "error"),
                          })
                        }
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>

      {/* for showing notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
