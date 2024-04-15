import React, { useState } from "react";
import { Modal, Typography, Box, TextField } from "@mui/material";
import { setIsLoginPopup } from "../../utils/redux/authSlice";
import { useDispatch } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";

const Login = () => {
  const style = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: "5%",
    borderRadius: "10px",

    "@media (max-width: 768px)": {
      width: "90%",
    },
  };
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(setIsLoginPopup(false));
  };
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ position: "absolute", top: "30%" }}
      >
        <Box sx={style}>
          <form action="" className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">LOGIN</h1>
            <TextField label="Email" fullWidth />
            <TextField label="Password" fullWidth />
            <button className="w-full bg-orange-600 rounded-lg p-2 text-white font-bold">
              Login
            </button>
            <p className="text-sm ">
              By proceeding, you agree to GoIbibo’s Privacy Policy, User
              Agreement and Terms of Service
            </p>
          </form>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default Login;
