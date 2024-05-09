import { useParams, useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Popper from "@mui/material/Popper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { BiSolidError } from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Travellers from "./Travellers";
import { setAmount } from "../../utils/redux/paymentSlice";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginSignupForm } from "../../utils/redux/authSlice";
import {useMediaQuery} from '@mui/material';

const Train_Booking_Page = () => {
  const isLoggedIn=useSelector((store)=>store.auth.isLoggedIn);
  const { data } = useParams();
  const details = JSON.parse(decodeURIComponent(data));
    console.log(details);
  const nameRef = useRef();
  const ageRef = useRef();
  const pincodeRef = useRef();
  const contactEmailRef = useRef();
  const addressRef = useRef();
  const fare = details.fare;
  const [gender, setGender] = useState("male");
  const [travellers, setTravellers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const smallScreen=useMediaQuery('(max-width:650px)');

  const [anchorEl, setAnchorEl] = useState(null);
  const [errorMesaage, setErrorMessage] = useState("");
  // console.log(details);
  function handleAddTraveller() {
    if (nameRef.current.value === "") {
      setAnchorEl(nameRef.current);
      nameRef.current.focus();
      setErrorMessage("Please Enter a valid name!");
      return;
    }
    if (nameRef.current.value.match(/\d/) !== null) {
      setAnchorEl(nameRef.current);
      nameRef.current.focus();
      setErrorMessage("Name cannot have digits!");
      return;
    }
    if (ageRef.current.value === "") {
      setAnchorEl(ageRef.current);
      ageRef.current.focus();
      setErrorMessage("Please Enter Traveller's age!");
      return;
    }
    if (ageRef.current.value < 0 || ageRef.current.value > 150) {
      setAnchorEl(ageRef.current);
      ageRef.current.focus();
      setErrorMessage("Age must be between 0 to 150");
      return;
    }
    const data = {
      name: nameRef.current.value,
      age: ageRef.current.value,
      gender: gender,
    };
    setTravellers((prev) => {
      const newDetails = [...prev];
      newDetails.push(data);
      return newDetails;
    });
    nameRef.current.value = "";
    ageRef.current.value = "";
    setGender("male");
  }

  function isValidPincode(code) {
    return code.length == 6 && code[0] != "0";
  }
  function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
  function isValidAddress(address) {
    return address.length > 0;
  }

  function getTotalFare() {
    let total = travellers.reduce(
      (cur, passenger) => (passenger.age > 4 ? cur + fare : cur),
      0
    );
    return total;
  }
  async function handlePay() {
    if (!isValidPincode(pincodeRef.current.value)) {
      setAnchorEl(pincodeRef.current);
      pincodeRef.current.focus();
      setErrorMessage("Please Enter Valid Pincode!");
      return;
    }
    if (!isValidEmail(contactEmailRef.current.value)) {
      setAnchorEl(contactEmailRef.current);
      contactEmailRef.current.focus();
      setErrorMessage("Please Enter Email!");
      return;
    }
    if (!isValidAddress(addressRef.current.value)) {
      setAnchorEl(addressRef.current);
      addressRef.current.focus();
      setErrorMessage("Please Enter Address!");
      return;
    }
    const trainData={
      "bookingType" : "train",
      "bookingDetails" : {
            "trainId" : `${details._id}`,
            "startDate" : `${details.arrDate}`,
            "endDate" : `${details.depDate}`,
      }
    }
    const encodedTrainBody = encodeURIComponent(JSON.stringify(trainData));
    dispatch(setAmount(getTotalFare()));
    navigate(`/payment/${encodedTrainBody}`);
    // setBookingFunction({
    //   bookingFunction: bookBus.bind(null, bus_id, depDate, arrDate),
    // });
  }

  useEffect(()=>{
    if(!isLoggedIn){
      navigate("/");
      dispatch(setShowLoginSignupForm(true))
    }
  },[isLoggedIn])
  
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          background: "linear-gradient(45deg,#721053,#AD2E41)",
          width: "100%",
          p: 2,
        }}
      >
        <Stack sx={{ mx: "auto", width: "fit-content", color: "#fff" }}>
          <Typography>Booking Details:</Typography>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            {details.source.split(",")[0]} <FaArrowRightLong />{" "}
            {details.destination.split(",")[0]}{" "}
            <div
              style={{
                width: 5,
                height: 5,
                backgroundColor: "#fff",
                borderRadius: "50%",
              }}
            ></div>
            {/* {getDateToString(depDate)} */}
          </Stack>
        </Stack>
      </Box>
      <Stack alignItems={"center"} gap={2}>
        <Box sx={{width:`${smallScreen && "100%"}`}}>
          <Typography
            sx={{
              py: 2,
              pl: 1,
              bgcolor: "#e6a6e8",
              color: "rgba(0,0,0,.54)",
              fontSize: 15,
              fontWeight: 400,
            }}
          >
            BOOKING DETAILS
          </Typography>
          <Stack sx={{ width: `${smallScreen?"100%":"800px"}`, bgcolor: "#fff" }}>
            <Stack
              direction={"row"}
              sx={{ width: "100%", p: 2 }}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={600}>{details.coachType}</Typography>
              <Typography
                sx={{
                  color: "#559b09",
                  bgcolor: "rgba(85,155,9,.08)",
                  p: 0.75,
                  fontSize: 12,
                  fontWeight: 600,
                  border: "1px solid rgba(85,155,9,.4)",
                  borderRadius: "4px",
                }}
              >
                AVL {details.numberOfSeats}
              </Typography>
            </Stack>
            <Divider orientation="horizontal" />
            <Stack
              direction={"row"}
              sx={{ width: "100%", p: 2 }}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={600}>₹{details.fare} per seat</Typography>
            </Stack>
            <Divider orientation="horizontal" />
            <Stack sx={{ p: 2 }} gap={1}>
              {/* <Typography fontSize={13} fontWeight={300}>
                {getDateToString(details.departureDate)}
              </Typography> */}
              <Typography fontSize={17} fontWeight={600}>
                {details.trainNumber} {details.trainName}
              </Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography fontSize={14}>{details.departureTime}</Typography>
                  <Typography fontSize={11} fontWeight={600}>
                    {details.source.split(",")[0]}
                  </Typography>
                </Box>
                <Divider
                  orientation="horizontal"
                  sx={{ flex: 1, minWidth: "100px" }}
                >
                  {/* <Typography fontSize={11}>{durationString}</Typography> */}
                </Divider>
                <Box sx={{ textAlign: "center" }}>
                  <Typography fontSize={14}>{details.arrivalTime}</Typography>
                  <Typography fontSize={11} fontWeight={600}>
                    {details.destination.split(",")[0]}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{width:`${smallScreen && "100%"}`}}>
          <Typography
            sx={{
              py: 2,
              pl: 1,
              bgcolor: "#e6e7e8",
              color: "rgba(0,0,0,.54)",
              fontSize: 15,
              fontWeight: 400,
            }}
          >
            TRAVELLERS{" "}
            <span style={{ fontSize: 10, color: "rgba(0,0,0,0.66)" }}>
              (Seats are not allotted or mentioned in the ticket for infant
              passengers (0-4 years), as no booking amount is charged.)
            </span>
          </Typography>
          <Stack sx={{ width: `${smallScreen?"100%":"800px"}` }}>
            <Stack sx={{ m: 2 }} direction={"row"} flexWrap={"wrap"} gap={3}>
              <TextField
                variant="standard"
                label="Name"
                inputRef={nameRef}
                placeholder="Enter Traveller's Name"
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: "rgba(0,0,0,.38)",
                  },
                }}
                sx={{
                  width: 240,
                  "& input": {
                    fontSize: 14,
                  },
                }}
                onChange={(e) => {
                  setAnchorEl(null);
                }}
              />
              <TextField
                variant="standard"
                label="Age"
                placeholder="Enter Age"
                inputRef={ageRef}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: "rgba(0,0,0,.38)",
                  },
                }}
                InputProps={{
                  type: "number",
                  inputProps: { min: 0 },
                }}
                sx={{
                  width: 150,
                  "& input": {
                    fontSize: 14,
                  },
                }}
                onChange={(e) => {
                  setAnchorEl(null);
                }}
              />
              <FormControl>
                <FormLabel
                  sx={{
                    fontSize: 11,
                    color: "rgba(0,0,0,.38)",
                  }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  defaultValue="male"
                  row
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio disableRipple size="small" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio disableRipple size="small" />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
              
              <Button
                disableRipple
                variant="contained"
                sx={{ m: "auto" }}
                onClick={handleAddTraveller}
              >
                Add Traveller
              </Button>
            </Stack>
            <Travellers travellers={travellers} setTravellers={setTravellers} />
          </Stack>
        </Box>
        <Box sx={{width:`${smallScreen && "100%"}`}}>
          <Typography
            sx={{
              py: 2,
              pl: 1,
              bgcolor: "#F2F2F2",
              color: "rgba(0,0,0,.54)",
              fontSize: 15,
              fontWeight: 400,
            }}
          >
            BILLING ADDRESS
          </Typography>
          <Stack sx={{ width: `${smallScreen?"100%":"800px"}` }}>
            <Stack sx={{ m: 2 }} direction={"row"} flexWrap={"wrap"} gap={3}>
              <TextField
                label="Pincode"
                required
                variant="standard"
                defaultValue={400000}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: "rgba(0,0,0,.38)",
                  },
                }}
                InputProps={{
                  type: "number",
                }}
                sx={{
                  width: 150,
                  "& input": {
                    fontSize: 14,
                  },
                }}
                inputRef={pincodeRef}
                onChange={() => setAnchorEl(null)}
              />
              <TextField
                sx={{
                  width: 500,
                  "& input": {
                    fontSize: 14,
                  },
                }}
                label="Address"
                variant="standard"
                placeholder="Enter Billing Address"
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: "rgba(0,0,0,.38)",
                  },
                }}
                inputRef={addressRef}
                onChange={() => setAnchorEl(null)}
              />
            </Stack>
          </Stack>
        </Box>
        <Box sx={{width:`${smallScreen && "100%"}`}}>
          <Typography
            sx={{
              py: 2,
              pl: 1,
              bgcolor: "#e6e7e8",
              color: "rgba(0,0,0,.54)",
              fontSize: 15,
              fontWeight: 400,
            }}
          >
            CONTACT DETAILS{" "}
            <span style={{ fontSize: 10, color: "rgba(0,0,0,0.66)" }}>
              (We will share the booking details via E-mail. )
            </span>
          </Typography>
          <Stack sx={{ width: `${smallScreen?"100%":"800px"}` }}>
            <Stack sx={{ m: 2 }} direction={"row"} flexWrap={"wrap"} gap={3}>
              <TextField
                sx={{
                  width: 500,
                  "& input": {
                    fontSize: 14,
                  },
                }}
                // defaultValue={user.email}
                required
                label="Email"
                variant="standard"
                placeholder="Enter Email Address"
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: "rgba(0,0,0,.38)",
                  },
                }}
                inputRef={contactEmailRef}
                onChange={() => setAnchorEl(null)}
              />
            </Stack>
          </Stack>
        </Box>
        <Button
          disableRipple
          disabled={travellers.length < 1}
          variant="contained"
          sx={{
            px: 3,
            marginBottom:"10px"
          }}
          onClick={handlePay}
        >
          Pay: ₹{getTotalFare()}
        </Button>
      </Stack>
      <Popper
        placement="bottom-start"
        open={anchorEl != null}
        anchorEl={anchorEl}
        sx={{ zIndex: 100 }}
      >
        <Box
          sx={{
            border: 0,
            py: 0.5,
            px: 1,
            fontSize: "14px",
            bgcolor: "rgba(255,0,0,0.1)",
            color: "#D50000",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            mt: "0px",
            borderRadius: "5px",
          }}
        >
          <BiSolidError size="17px" style={{ marginRight: "5px" }} />{" "}
          <Typography fontSize={14}>{errorMesaage}</Typography>
        </Box>
      </Popper>
    </Box>
  );
};

export default Train_Booking_Page;
