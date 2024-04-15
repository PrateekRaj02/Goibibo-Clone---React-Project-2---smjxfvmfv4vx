import React, { useEffect, useState } from "react";
import { baseUrl, projectId } from "../../utils/constant";
import { Paper, Typography,Container } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./OfferForYou.css";



const OfferForYou = () => {
  const [offer, setOffer] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
  };
  
  useEffect(() => {
    fetchOfferForYou();
  }, []);

  const fetchOfferForYou = async () => {
    const apiUrl = baseUrl + `offers?limit=50`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        projectId: projectId,
      },
    });
    const jsonData = await response.json();
    setOffer(jsonData.data.offers);
  };

  return (
    <div className=" mt-14 mb-10 bg-white rounded-lg shadow-md ">
      <h1 className="my-4 text-center p-2 font-bold text-3xl">Offers For You</h1>
    <Container className="p-2">
    <Slider {...settings} className="your-carousel-wrapper-class">
      {offer.map((item) => (
        <Paper key={item.id} className="paper">
          <img src={item.heroUrl} alt="banner" className="h-48 rounded-lg" />
          <Typography variant="h5">{item.type}</Typography>
          <Typography variant="body2">{item.pTl}</Typography>
        </Paper>
      ))}
    </Slider>
    </Container>
    </div>
  );
};

export default OfferForYou;
