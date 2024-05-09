import {
    Box,
    Button,
    Container,
    Divider,
    Modal,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { FaRegClock } from "react-icons/fa6";
  import { UpiActive, Upi } from "./Upi";
  import { CardActive, Card } from "./Card";
  
  import inputCard from "../../assets/payment/jp_default_card.png";
//   import { usePaymentContext } from "../../../Contexts/PaymentContextProvider";
  import BookingModal from "./BookingModal";
  import { Link, useNavigate, useParams } from "react-router-dom";
  import {useDispatch, useSelector} from "react-redux"
  import UpiTab from "./UpiTab";
import { setShowLoginSignupForm } from "../../utils/redux/authSlice";
import { baseUrl, projectId } from "../../utils/constant";
import {useMediaQuery} from '@mui/material';
  
  export default function Payment() {
    // const { bookingFunction, paymentIsPending, setPaymentisPending, amount } =
    //   usePaymentContext();
    const isLoggedIn=useSelector((store)=>store.auth.isLoggedIn);
    const amount=useSelector((store)=>store.payment.amount);
    const navigate = useNavigate();
    const { body } = useParams();
    const details = JSON.parse(decodeURIComponent(body));
    // console.log(details);
    const token=JSON.parse(window.localStorage.getItem("token"))
    // console.log(token);
    const [time, setTime] = useState(300);
    const [tabIndex, setTabIndex] = useState(0);
    const [bookingWait, setBookingWait] = useState({
      startWaiting: false,
      recieved: false,
      message: "",
    });
    const [generatingQR, setGeneratingQR] = useState(false);
    const [qrCodeGenerated, setQRCodeGenerated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [cardHasError, setCardHasError] = useState(false);
    const [expiryMonth, setExpiryMonth] = useState("");
    const [expiryYear, setExpiryYear] = useState("");
    const [monthHasError, setMonthHasError] = useState(false);
    const [yearHasError, setYearHasError] = useState(false);
    const [cvv, setCvv] = useState("");
    const [cvvHasError, setCvvHasError] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const dispatch=useDispatch();
    const smallScreen=useMediaQuery('(max-width:650px)');
    if (time === 0) {
      if (!showErrorModal) {
        setShowErrorModal(true);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    }
    async function handlePay() {
      setBookingWait((prev) => {
        return { ...prev, startWaiting: true };
      });
    //   const message = await bookingFunction.bookingFunction();
      setBookingWait((prev) => {
        return { ...prev, message: "Booking successful", recieved: true };
      });
      const apiUrl=baseUrl+`booking`;
      const response=await fetch(apiUrl,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
 projectID: `${projectId}`
        },
        body:JSON.stringify(details),
      });
      const jsonData=await response.json();
      // console.log(jsonData);
    }
    const CURRENCY_FORMATTER = (value) =>
	new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0,
	}).format(value);

    useEffect(() => {
      let id;
      if (bookingWait.recieved) {
        id = setTimeout(() => navigate("/"), 5000);
      }
      return () => {
        clearTimeout(id);
      };
    }, [bookingWait]);
    function handleTabChange(e, v) {
      setTabIndex(v);
    }
    function unLoad() {
    //   setPaymentisPending(false);
    }
    function isValidCardNumber(num) {
      return num.match(/^\d{4} \d{4} \d{4} \d{4}$/);
    }
    function handleCardChange(e) {
      setCardHasError(false);
      const input = e.target.value.replace(/\D/g, "");
      let updatedInput = "";
      for (let i = 0; i < input.length; i++) {
        if (i > 0 && i % 4 == 0) updatedInput += " ";
        updatedInput += input.at(i);
      }
      setCardNumber(updatedInput);
      if (!isValidCardNumber(e.target.value)) {
        setCardHasError(true);
      }
    }
    function isValidExpiryMonth(month) {
      return month >= 1 && month <= 12;
    }
    function isValidExpiryYear(year) {
      const curYear = new Date().getFullYear();
      return year >= curYear && year <= curYear + 10;
    }
    function handleExpiryMonthChange(e) {
      // if (e.target.value > 12) e.target.value = 12;
      setMonthHasError(false);
      if (e.target.value <= 0) e.target.value = "";
      if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2);
      setExpiryMonth(e.target.value);
      if (!isValidExpiryMonth(e.target.value)) {
        setMonthHasError(true);
      }
    }
    function handleExpiryYearChange(e) {
      setYearHasError(false);
      if (e.target.value <= 0) e.target.value = "";
      if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
      setExpiryYear(e.target.value);
      if (!isValidExpiryYear(e.target.value)) {
        setYearHasError(true);
      }
    }
    function isValidCVV(num) {
      return num.match(/^[0-9]{3}$/);
    }
    function handleCvvChange(e) {
      setCvvHasError(false);
      if (e.target.value.length > 3) e.target.value = e.target.value.slice(0, 3);
      setCvv(e.target.value);
      if (!isValidCVV(e.target.value)) {
        setCvvHasError(true);
      }
    }
    function handleGenerateQRCode() {
      if (!generatingQR) {
        setGeneratingQR(true);
        setTimeout(() => {
          setQRCodeGenerated(true);
        }, 2000);
      }
    }
    useEffect(() => {
    //   if (!paymentIsPending) {
    //     navigate("/");
    //   }
    //   setPaymentisPending(false);
      const id = setInterval(() => {
        setTime((prev) => (prev === 0 ? 0 : prev - 1));
      }, 1000);
      // document
      return () => {
        clearInterval(id);
        unLoad();
      };
    }, []);
    useEffect(()=>{
      if(!isLoggedIn){
        navigate("/");
        dispatch(setShowLoginSignupForm(true))
      }
    },[isLoggedIn])
    const mins = ("" + Math.floor(time / 60)).padStart(2, "0");
    const secs = ("" + (time % 60)).padStart(2, "0");
    return (
      <Container sx={{ mt: 4, pb: 6 }}>
        <Stack gap={3.5}  sx={{ width: "100%" }}>
          <Stack
            direction={`${smallScreen && "column"}`}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              width: "100%",
              bgcolor: "#FFF",
              boxShadow: 5,
              p: 2,
              borderRadius: 2,
            }}
          >
            <Stack
              direction={"row"}
              gap={2}
              alignItems={"center"}
              sx={{
                bgcolor: "#fbded3",
                borderRadius: "99999px",
                px: 4,
                py: 1,
              }}
            >
              <FaRegClock size={14} color="#ec5b24" />
              <Typography fontWeight={600} fontSize={16}>
                {mins} : {secs}
              </Typography>
              <Typography fontSize={12}>left to complete the booking</Typography>
            </Stack>

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ width: `${smallScreen?"100%":"30%"}`,mt:`${smallScreen && "10px"}` }}
            >
              <Typography fontSize={14} color={"rgba(0,0,0,0.4)"}>
                AMOUNT TO PAY
              </Typography>
              <Typography fontSize={20} fontWeight={600}>
                {CURRENCY_FORMATTER("" + amount)}
              </Typography>
            </Stack>

          </Stack>

          <Stack
            direction={`${smallScreen?"column":"row"}`}
            sx={{
              width: "100%",
              bgcolor: "#FFF",
              boxShadow: 5,
            }}
          >
            <Tabs
              orientation={`${smallScreen?"horizontal":"vertical"}`}
              value={tabIndex}
              onChange={handleTabChange}
              TabIndicatorProps={{ sx: { left: 0, width: 6 } }}
              sx={{
                width: `${smallScreen?"100%":"250px"}`,
                display: "flex",
                flexDirection:`${smallScreen?"row":"column"}`,
                justifyContent: "space-between",
                bgcolor: "#ec5b2405",
                overflow: "unset",
              }}
            >
              <Tab
                label="UPI"
                icon={tabIndex === 0 ? <UpiActive /> : <Upi />}
                iconPosition="start"
                sx={{
                  width: "250px",
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-start",
                  bgcolor: tabIndex === 0 ? "#ec5b2410" : "",
                  fontSize: 20,
                  fontWeight: 600,
                  textTransform: "none",
                }}
              />
              <Tab
                label="Credit/Debit Card"
                icon={tabIndex === 1 ? <CardActive /> : <Card />}
                iconPosition="start"
                sx={{
                  width: "250px",
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-start",
                  bgcolor: tabIndex === 1 ? "#ec5b2410" : "",
                  fontSize: 20,
                  fontWeight: 600,
                  textTransform: "none",
                }}
              />
            </Tabs>
            <UpiTab
              {...{
                tabIndex,
                qrCodeGenerated,
                showModal,
                handleGenerateQRCode,
                generatingQR,
                setShowModal,
                handlePay,
                time,
                mins,
                secs,
                setQRCodeGenerated,
                setGeneratingQR,
              }}
            />
            <Box role="tabpanel" hidden={tabIndex !== 1} sx={{ width: "100%" }}>
              {tabIndex === 1 && (
                <Stack
                  gap={3}
                  alignItems={"flex-start"}
                  sx={{ my: 3, width: "100%" }}
                >
                  <Typography sx={{ px: 3 }}>
                    Enter Credit / Debit Card Details
                  </Typography>
                  <Divider flexItem />
                  <TextField
                    error={cardHasError}
                    label="Card Number"
                    placeholder="Enter Card Number"
                    variant="standard"
                    helperText={
                      cardHasError
                        ? "Card number is either not of 16 digits or it is non-numeric"
                        : ""
                    }
                    sx={{ ml: 3, width: `${smallScreen?"90%":"400"}` }}
                    InputLabelProps={{ shrink: true }}
                    value={cardNumber}
                    onChange={handleCardChange}
                    InputProps={{
                      endAdornment: (
                        <img
                          src={inputCard}
                          style={{
                            width: "30px",
                            objectFit: "contain",
                          }}
                        />
                      ),
                    }}
                    inputProps={{ maxLength: 19 }}
                  />
                  <Stack sx={{ px: 3 }}>
                    <Typography>Expiry Date</Typography>
                    <Stack direction={"row"} gap={2}>
                      <TextField
                        error={monthHasError}
                        helperText={monthHasError ? "Invalid Month" : ""}
                        label="Month"
                        placeholder="MM"
                        variant="standard"
                        value={expiryMonth}
                        onChange={handleExpiryMonthChange}
                        type="number"
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        error={yearHasError}
                        helperText={yearHasError ? "Invalid Year" : ""}
                        type="number"
                        label="Year"
                        placeholder="YYYY"
                        variant="standard"
                        value={expiryYear}
                        onChange={handleExpiryYearChange}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Stack>
                  </Stack>
                  <TextField
                    sx={{ ml: 3 }}
                    error={cvvHasError}
                    helperText={cvvHasError ? "Invalid CVV" : ""}
                    type="password"
                    label="CVV"
                    placeholder="XXX"
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    value={cvv}
                    onChange={handleCvvChange}
                  />
                  <Button
                    disabled={
                      !(
                        isValidCardNumber(cardNumber) &&
                        isValidExpiryMonth(expiryMonth) &&
                        isValidExpiryYear(expiryYear) &&
                        isValidCVV(cvv)
                      )
                    }
                    disableRipple
                    variant="contained"
                    onClick={handlePay}
                    size="large"
                    sx={{ ml: 3, px: 3 }}
                  >
                    Pay
                  </Button>
                </Stack>
              )}
            </Box>
          </Stack>
        </Stack>
        <BookingModal {...{ bookingWait }} />
        <Modal open={showErrorModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "fit-content",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 5,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            <Typography fontSize={20} color={"#ec5b24"} sx={{ mb: 2 }}>
              OOPS! Session Timed Out.
            </Typography>
            <Typography fontWeight={500} sx={{ mb: 2 }}>
              Please try again later
            </Typography>
            <Typography color={"rgba(0,0,0,0.5)"} fontSize={12}>
              If you are not redirected to home page,{" "}
              <Link to="/" style={{ color: "rgba(0, 0, 0, 0.8)" }}>
                click here
              </Link>
            </Typography>
          </Box>
        </Modal>
      </Container>
    );
  }
  