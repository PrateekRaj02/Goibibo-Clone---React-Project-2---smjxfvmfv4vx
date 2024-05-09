import { useParams, useNavigate } from "react-router-dom";
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
import { useDispatch,useSelector } from "react-redux";
import Flight_Details_Tab from "./Flight_Details_Tab";
import { setShowLoginSignupForm } from "../../utils/redux/authSlice";
import {useMediaQuery} from '@mui/material';

const Flight_Booking_Page = () => {
  const isLoggedIn=useSelector((store)=>store.auth.isLoggedIn);
  const { data } = useParams();
  const details = JSON.parse(decodeURIComponent(data));
    // console.log(details);
  const nameRef = useRef();
  const ageRef = useRef();
  const pincodeRef = useRef();
  const contactEmailRef = useRef();
  const addressRef = useRef();
  const fare = details.ticketPrice;
  const [gender, setGender] = useState("male");
  const [travellers, setTravellers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sourceCity = useSelector((store) => store.flight.sourceCity);
  const destinationCity = useSelector(
    (store) => store.flight.destinationCity
  );
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
    // setPaymentisPending(true);
    const flightData={
      "bookingType" : "flight",
      "bookingDetails" : {
            "flightId" : `${details._id}`,
            "startDate" : `${details.arrDate}`,
            "endDate" : `${details.depDate}`,
      }
    }
    const encodedFlightBody = encodeURIComponent(JSON.stringify(flightData));
    dispatch(setAmount(getTotalFare()));
    navigate(`/payment/${encodedFlightBody}`);
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
      <Box
				sx={{
					bgcolor: "#E1E1E1",
					boxShadow: "0 0 10px rgba(0,0,0,.3)",
          width:`${smallScreen && "100%"}`
				}}
			>
				<Typography
					sx={{ ml: 3, my: 2 }}
					color="rgba(0,0,0,.64)"
					fontWeight={600}
					fontSize={14}
				>
					{sourceCity} to{" "}
					{destinationCity}
				</Typography>
				<Flight_Details_Tab
					{...details}
				/>
				<Stack direction={"row"} gap={10} sx={{ p: 3 }}>
					<Stack>
						<Typography
							color="rgba(0,0,0,0.54)"
							fontWeight={700}
							fontSize={12}
						>
							BAGGAGE
						</Typography>
						<Typography
							color={"rgba(0,0,0,.87)"}
							fontSize={18}
							fontWeight={600}
						>
							{details.source}-{details.destination}
						</Typography>
					</Stack>
					<Stack>
						<Typography
							color="rgba(0,0,0,.54)"
							fontSize={14}
							fontWeight={600}
						>
							CHECK-IN
						</Typography>
						<Typography
							color={"rgba(0,0,0,.54)"}
							fontSize={14}
							fontWeight={600}
						>
							{details.ticketPrice <= 2250
								? "15 kilograms (1 piece per pax)"
								: "20 kilograms (1 piece per pax)"}
						</Typography>
					</Stack>
					<Stack>
						<Typography
							color="rgba(0,0,0,.54)"
							fontSize={14}
							fontWeight={600}
						>
							CABIN
						</Typography>
						<Typography
							color={"rgba(0,0,0,.54)"}
							fontSize={14}
							fontWeight={600}
						>
							{details.ticketPrice <= 2250
								? "7 kg (1 piece per pax)"
								: "10 kg (1 piece per pax)"}
						</Typography>
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
            marginBottom:"10px",
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

export default Flight_Booking_Page;
