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
import { PiDoorOpenDuotone } from "react-icons/pi";
import { MdOutlinePeopleAlt } from "react-icons/md";


const Hotel_Booking_Page = () => {
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
  const rooms=1;
  const guests=2;
  

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
    dispatch(setAmount(getTotalFare()));
    navigate("/payment");
    // setBookingFunction({
    //   bookingFunction: bookBus.bind(null, bus_id, depDate, arrDate),
    // });
  }
  return (
    <Box sx={{ width: "100%", mb: 3 }}>
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
          <div
              style={{
                width: 5,
                height: 5,
                backgroundColor: "#fff",
                borderRadius: "50%",
              }}
            ></div>
            {`${details.name} ${details.location}`}
            
            {/* {getDateToString(depDate)} */}
          </Stack>
        </Stack>
      </Box>
      <Stack alignItems={"center"} gap={2}>
      <Box sx={{ bgcolor: "#fff", p: 3, borderRadius: "10px",width:'800px' }}>
						<Stack direction={"row"} sx={{ gap: 3 }}>
							<img
								src={details.image}
								style={{
									width: "200px",
									height: "200px",
									objectFit: "cover",
									borderRadius: "10px",
								}}
							/>
							<Stack gap={3}>
								<Typography fontSize={22} fontWeight={600}>
									{details.name}
								</Typography>
								<Typography fontSize={16} color="#5e616e">
									{details.location}
								</Typography>
								<Stack
									direction={"row"}
									gap={3}
									alignItems={"center"}
								>
									<Stack
										direction={"row"}
										gap={1}
										alignItems={"center"}
									>
										<PiDoorOpenDuotone size={20} />
										<Typography>
											{rooms} x {details.roomtype}{" "}
											{rooms === 1 ? "room" : "rooms"}
										</Typography>
									</Stack>
									<Stack
										direction={"row"}
										gap={1}
										alignItems={"center"}
									>
										<MdOutlinePeopleAlt size={20} />
										<Typography>
											{guests}{" "}
											{guests === 1 ? "guest" : "guests"}
										</Typography>
									</Stack>
								</Stack>
                                <Typography>
									        <span className="font-bold text-xl">₹{details.fare}</span> per night,per room		
										</Typography>
							</Stack>
						</Stack>
					</Box>
        <Box>
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
          <Stack sx={{ width: "800px" }}>
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
        <Box>
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
          <Stack sx={{ width: "800px" }}>
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
        <Box>
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
          <Stack sx={{ width: "800px" }}>
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

export default Hotel_Booking_Page;
