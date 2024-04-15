import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Train_Faq = () => {
  return (
    <div className="">
      <h1 className="text-4xl font-bold my-5">Train Ticket Booking FAQs</h1>
      <Accordion sx={{ padding: "30px 20px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div className="font-bold text-base">
            How can I book train ticket online?
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>
              You can easily do online train ticket booking through best train
              booking app Goibibo by following the below-mentioned steps:
            </p>
            <div className="mt-4">
              <p>
                1.Visit the Goibibo website/app and go to the IRCTC Trains page
              </p>
              <p>
                2.Enter the 'From' and 'To' destinations, select the travel date
                from the calendar icon and click on the Search button
              </p>
              <p>
                3.After finding a preferred train, click on check availability
                and then click on Book Now
              </p>
              <p>
                4.Now, enter your IRCTC Login Id. Then, fill the traveller
                details and click on continue
              </p>
              <p>5.Choose the payment method</p>
              <p>
                6.Enter the IRCTC Id's password for successful train ticket
                booking
              </p>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ padding: "30px 20px", marginTop: "20px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div className="font-bold text-base">
            What documents are required for online train ticket booking & can I
            make changes in my train booking?
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            During the online train ticket booking session, you don't require
            any documents. However, during the train journey, the traveller must
            carry a valid photo ID proof such as Aadhar Card, Voter ID Card,
            Driving Licence, Pan Card. IRCTC does not allow to make changes once
            the ticket is booked. In case any amendments or modifications are
            required on your booked train ticket, then you will need to cancel
            the ticket and rebook another train ticket.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ padding: "30px 20px", marginTop: "20px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div className="font-bold text-base">
            Why book train ticket online through Goibibo and what are the
            advantages of mobile train ticket booking?
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Along with an easy train ticket booking procedure, Goibibo offers
            exciting train ticket offersand Go cash advantages while booking
            train tickets. Goibibo also offers a plethora of payment options on
            online train booking. Credit Cards, Debit Cards, E-wallets, UPI,
            Netbanking, GooglePay and Credit Card EMIs are some of the online
            payment options accepted at Goibibo for train ticket booking.
            Goibibo app assures a seamless mobile train ticket booking
            experience. With easy access to your ticket and instant tracking of
            PNR status, you can find all the information related to your train
            ticket booking on your fingertips.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ padding: "30px 20px", marginTop: "20px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div className="font-bold text-base">
            What other Railways services Goibibo offers apart from online train
            booking?
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Goibibo in partnership with Indian Railways Reservation system,
            offers various other services apart from online train ticket booking
            such as you can check the current status of your train booking using
            PNR Status page, check the live running status of a train using Live
            Train Status page, change your IRCTC account password using IRCTC
            Forgot Password page, retrieve your IRCTC user id using IRCTC Forgot
            User ID page, create IRCTC user id or do IRCTC registration using
            IRCTC Create User ID page, cancel train ticket and many more train
            related facilities.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ padding: "30px 20px", marginTop: "20px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div className="font-bold text-base">
            Which documents are required to book my rail tickets?
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You do not require any documents to book your rail tickets, but it
            is suggested that you should carry a Government-approved photo ID
            while traveling.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ padding: "30px 20px", marginTop: "20px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div className="font-bold text-base">
            How many days in advance can I book the tatkal ticket?
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            It is not possible to book your tatkal train ticket in advance. The
            tatkal window is accessible for an hour, and these tickets are
            available for booking at a higher rate.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Train_Faq;
