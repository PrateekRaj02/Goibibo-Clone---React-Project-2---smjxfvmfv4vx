import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from '@mui/material';

function getDateString(dateObj) {
  return `${dateObj.format("ddd")}, ${dateObj.format("D")} ${dateObj.format(
    "MMM"
  )}`;
}
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default function Train_Card({
  train,
  departureDate,
  availablityBoxId,
  setAvailablityBoxId,
}) {
  const {
    _id,
    arrivalTime,
    coaches,
    daysOfOperation,
    departureTime,
    destination,
    fare,
    source,
    trainName,
    trainNumber,
    trainType,
    travelDuration,
  } = train;
  const navigate=useNavigate();

  function getColor(day) {
    if (daysOfOperation.includes(day)) return "rgba(0,0,0,.87)";
    else return "rgba(0,0,0,0.2)";
  }
  const depHour = +departureTime.slice(0, 2);
  const depMin = +departureTime.slice(3, 5);
  const durationHours = +travelDuration.split(" ")[0].slice(0, -1);
  const durationMin = +travelDuration.split(" ")[1].slice(0, -1);
  const depDate = new dayjs(departureDate).hour(depHour).minute(depMin);
  const arrDate = depDate.add(durationHours, "hour").add(durationMin, "minute");
  const smallScreen=useMediaQuery('(max-width:650px)');

  function handleShowAvailability(id) {
    if (id === availablityBoxId) setAvailablityBoxId(0);
    else setAvailablityBoxId(id);
  }

  function getFare(type, baseFare) {
    switch (type) {
      case "CC":
        return Math.round(baseFare * 2);
      case "2S":
        return Math.round(baseFare * 0.75);
      case "SL":
        return Math.round(baseFare);
      case "1A":
        return Math.round(baseFare * 6.25);
      case "2A":
        return Math.round(baseFare * 3.5);
      case "3A":
        return Math.round(baseFare * 2.75);
      case "3E":
        return Math.round(baseFare * 1.75);
      case "EA":
        return Math.round(baseFare * 5);
    }
    return baseFare;
  }

  const handleBook = (coachType, numberOfSeats) => {
    const data = {
      coachType,
      numberOfSeats,
      fare,
      source,
      trainName,
      trainNumber,
      departureTime,
      destination,
      arrivalTime,
      departureDate,depDate,arrDate,_id
    };
    const encodedTrainDetails = encodeURIComponent(JSON.stringify(data));
    navigate(`/booking/train/${encodedTrainDetails}`);
  };

  return (
    <Stack
      // key={_id}
      sx={{
        my: 2,
        mx: "auto",
        width: `${smallScreen ?"100%":"90%"}`,
        boxShadow: "0 0 10px rgba(0,0,0,.3)",
        bgcolor: "#fff",
      }}
      divider={<Divider orientation="horizontal" variant="fullwidth" />}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={2}
        sx={{ m: 2 }}
        divider={<Divider orientation="vertical" flexItem />}
        justifyContent={"center"}
      >
        <Box sx={{ width: 310 }}>
          <Typography
            sx={{ textTransform: "uppercase" }}
            fontSize={"16px"}
            color="rgb(236, 88, 36)"
            fontWeight={600}
          >
            {trainNumber} {trainName}
          </Typography>
          <Stack
            direction={"row"}
            gap={2}
            sx={{
              color: "rgba(0,0,0,.87)",
              "& p": { fontSize: "12px" },
              mt: 2,
            }}
          >
            <Typography>Runs on:</Typography>
            {weekDays.map((day) => (
              <Typography key={day} color={getColor(day)}>
                {day[0]}
              </Typography>
            ))}
            <Box
              sx={{
                width: 5,
                height: 5,
                bgcolor: "#000",
                borderRadius: "50%",
                alignSelf: "center",
              }}
            ></Box>
            <Typography>{trainType}</Typography>
          </Stack>
        </Box>

        {!smallScreen && <Stack direction={"row"} sx={{ p: 2 }} gap={3} alignItems={"center"}>
          <Stack>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontSize: "14px",
                color: "#ec5b24",
              }}
            >
              {source}
            </Typography>
            <Typography
              sx={{
                color: " rgba(0,0,0,.87)",
                fontWeight: 600,
                fontSize: "20px",
              }}
            >
              {departureTime}
            </Typography>
            <Typography
              sx={{
                color: "rgba(0,0,0,.54)",
                fontWeight: 400,
                fontSize: "12px",
              }}
            >
              {getDateString(depDate)}
            </Typography>
          </Stack>
          <Stack sx={{ width: "130px" }} alignItems={"center"}>
            <Typography>{travelDuration}</Typography>
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
              sx={{
                height: "2px",
                bgcolor: "rgb(187, 187, 187) ",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "6px",
                  backgroundColor: "rgb(117, 117, 117)",
                  mt: "-2px",
                }}
              ></div>
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "6px",
                  backgroundColor: "rgb(117, 117, 117)",
                  mt: "-2px",
                }}
              ></div>
            </Stack>
          </Stack>
          <Stack>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontSize: "14px",
                color: "#ec5b24",
              }}
            >
              {destination}
            </Typography>
            <Typography
              sx={{
                color: " rgba(0,0,0,.87)",
                fontWeight: 600,
                fontSize: "20px",
              }}
            >
              {arrivalTime}
            </Typography>
            <Typography
              sx={{
                color: "rgba(0,0,0,.54)",
                fontWeight: 400,
                fontSize: "12px",
              }}
            >
              {getDateString(arrDate)}
            </Typography>
          </Stack>

          <Button
            variant="contained"
            disableRipple
            sx={{
              py: 1,
              px: 2,
              fontWeight: 600,
              fontSize: "12px",
              borderRadius: 0,
            }}
            onClick={() => handleShowAvailability(_id)}
          >
            <>
              {availablityBoxId == _id
                ? "Hide Availability"
                : "Show Availability"}
              <IoIosArrowDown
                size={"20px"}
                fontWeight={"600"}
                style={{
                  marginLeft: "6px",
                  transform: `rotate(${
                    availablityBoxId == _id ? "180deg" : "0deg"
                  })`,
                  transition: "transform 200ms",
                }}
              />
            </>
          </Button>
        </Stack>}
        
      </Stack>

      {smallScreen && <Stack direction={"row"} sx={{ p: 2 }} gap={3} alignItems={"center"}>
          <Stack>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontSize: "14px",
                color: "#ec5b24",
              }}
            >
              {source}
            </Typography>
            <Typography
              sx={{
                color: " rgba(0,0,0,.87)",
                fontWeight: 600,
                fontSize: "20px",
              }}
            >
              {departureTime}
            </Typography>
            <Typography
              sx={{
                color: "rgba(0,0,0,.54)",
                fontWeight: 400,
                fontSize: "12px",
              }}
            >
              {getDateString(depDate)}
            </Typography>
          </Stack>
          <Stack sx={{ width: "130px" }} alignItems={"center"}>
            <Typography>{travelDuration}</Typography>
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
              sx={{
                height: "2px",
                bgcolor: "rgb(187, 187, 187) ",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "6px",
                  backgroundColor: "rgb(117, 117, 117)",
                  mt: "-2px",
                }}
              ></div>
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "6px",
                  backgroundColor: "rgb(117, 117, 117)",
                  mt: "-2px",
                }}
              ></div>
            </Stack>
          </Stack>
          <Stack>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontSize: "14px",
                color: "#ec5b24",
              }}
            >
              {destination}
            </Typography>
            <Typography
              sx={{
                color: " rgba(0,0,0,.87)",
                fontWeight: 600,
                fontSize: "20px",
              }}
            >
              {arrivalTime}
            </Typography>
            <Typography
              sx={{
                color: "rgba(0,0,0,.54)",
                fontWeight: 400,
                fontSize: "12px",
              }}
            >
              {getDateString(arrDate)}
            </Typography>
          </Stack>

          <Button
            variant="contained"
            disableRipple
            sx={{
              py: 1,
              px: 2,
              fontWeight: 600,
              fontSize: "12px",
              borderRadius: 0,
            }}
            onClick={() => handleShowAvailability(_id)}
          >
            <>
              {availablityBoxId == _id
                ? "Hide Availability"
                : "Show Availability"}
              <IoIosArrowDown
                size={"20px"}
                fontWeight={"600"}
                style={{
                  marginLeft: "6px",
                  transform: `rotate(${
                    availablityBoxId == _id ? "180deg" : "0deg"
                  })`,
                  transition: "transform 200ms",
                }}
              />
            </>
          </Button>
        </Stack>}

      {!smallScreen && <Stack direction={"row"} gap={2} sx={{ m: 2 }}>
        {coaches.map(({ coachType, numberOfSeats }, index) => {
          return (
            <Stack key={index} alignItems={"center"} gap={1}>
              <Box
                sx={{
                  color: "#559b09",
                  bgcolor: "rgba(85,155,9,.08)",
                  py: 1,
                  px: "auto",
                  border: "1px solid rgba(85,155,9,.4)",
                  borderRadius: "4px",
                  width: 125,
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={1}
                >
                  <Typography color={"rgba(0,0,0,.87)"} fontSize={"14px"}>
                    {coachType}
                  </Typography>
                  <span
                    style={{
                      width: "3px",
                      height: "3px",
                      borderRadius: "5px",
                      background: "rgba(0,0,0,.87)",
                    }}
                  ></span>
                  <Typography color={"rgba(0,0,0,.87)"} fontSize={"14px"}>
                    ₹{getFare(coachType, fare)}
                  </Typography>
                </Stack>

                <Typography
                  fontSize={"16px"}
                  color={"green"}
                  sx={{
                    width: "fit-content",
                    mx: "auto",
                    mt: "5px",
                  }}
                >
                  AVL {numberOfSeats}
                </Typography>
              </Box>
              <Typography color={"#757575"} fontSize={"11px"}>
                10 min ago
              </Typography>
            </Stack>
          );
        })}
      </Stack>}

      {availablityBoxId == _id && (
        <DropDownCard
          coaches={coaches}
          date={depDate}
          id={_id}
          handleBook={handleBook}
        />
      )}
    </Stack>
  );
}


function DropDownCard({ date, coaches, id, handleBook }) {
  const smallScreen=useMediaQuery('(max-width:650px)');
  return (
    <Stack
      sx={{
        p: 2,
        background: "#FCF5F2",
        boxShadow: "inset 0 2px 20px rgba(0,0,0,.1)",
        flexDirection: `${!smallScreen && "row"}`,
        display:`${smallScreen ?"grid":"flex"}`,
        gridTemplateColumns:`${smallScreen && "repeat(3, 1fr)"}`,
        gap: `${smallScreen?"4px":"8px"}`,
      }}
    >
      {coaches.map(({ coachType, numberOfSeats }) => (
        <Box width={"fit-content"} key={coachType + numberOfSeats}>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            sx={{
              width: "125px",
              height: "90px",
              background: "#FFF",
              border: "1px solid rgba(236,91,36,.2)",
              bordeRadius: "2px 2px 0 0",
            }}
          >
            <Typography fontSize={"12px"}>{coachType}</Typography>
            {/* {getDateString(date)} */}
            <Typography fontSize={"12px"} color={"green"} fontWeight={600}>
              AVL {numberOfSeats}
            </Typography>
          </Stack>
          <Button
            disableRipple
            variant="contained"
            sx={{
              width: "100%",
              fontSize: "12px",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            onClick={() => handleBook(coachType, numberOfSeats)}
          >
            BOOK
          </Button>
        </Box>
      ))}
    </Stack>
  );
}
