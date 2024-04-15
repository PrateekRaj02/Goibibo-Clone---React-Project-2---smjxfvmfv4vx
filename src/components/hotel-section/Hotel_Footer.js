import React from "react";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import download from "../../assets/download.png";
import paymentImage from "../../assets/payment.png";

const Hotel_Footer = () => {
  return (
    <div className="bg-white">
      <div className="w-10/12 m-auto mb-12">
        <div className="text-sm pt-8">
          <span className="font-bold text-gray-400">
            Most Searched Hotels In India
          </span>
          <span className="text-gray-400 ml-2">
            Hotels in Coimbatore | Hotels in Mandarmani | Hotels in Kodaikanal |
            Hotels in Kochi | Hotels in Visakhapatnam | Hotels in Trivandrum |
            Hotels in Noida | Hotels in Nasik | Hotels in Nagpur | Hotels in
            Tiruchendur | Hotels in Guwahati | Hotels in Daman | Hotels in
            Bhopal | Hotels in Udupi | Hotels in Kolhapur | Hotels in Gangtok |
            Hotels in Kanyakumari | Hotels in Mathura | Hotels in Tarapith |
            Hotels in Diu | Hotels in Ajmer | Hotels in Vadodara | Hotels in
            Dharamshala
          </span>
        </div>

        <div className="text-sm mt-1">
          <span className="font-bold text-gray-400">Best Hotels in India</span>
          <span className="text-gray-400 ml-2">
            Six Senses Fort Barwara | Leela Palace Chennai | Taj Rishikesh | Le
            Meridien Goa | Itc Grand Chola Chennai | Itc Maratha Mumbai | Jw
            Marriott Mumbai Sahar | Jw Marriott Mumbai Juhu | Taj Mahal Tower
            Mumbai | Conrad Bengaluru | Jw Marriott Hotel Pune | Park Hyatt
            Chennai | The Leela Palace Jaipur | Evolve Back Kabini | Alila Fort
            Bishangarh | The Ritz-Carlton Bengaluru | The Tree House Resort
            Jaipur | Marriott Suites Pune | Taj Coromandel Chennai | Taj Resort
            & Convention Centre Goa
          </span>
        </div>

        <div className="text-sm mt-1">
          <span className="font-bold text-gray-400">
            Popular Hotels in India
          </span>
          <span className="text-gray-400 ml-2">
            The Imperial New Delhi | The Leela Palace New Delhi | Vythiri Resort
            Wayanad | Taj Falaknuma Palace Hyderabad | The Westin Mumbai Garden
            City | Caravela Beach Resort Goa | Radisson Kufri | Amanvana Spa
            Resort- Coorg | Mayfair Heritage Puri | Mayfair Waves Puri | Silver
            Sand Beach Resort Havelock | The Lalit Grand Palace Srinagar | The
            Machan Lonavala | The Serai Chikmagalur | The Serai Kabini | The
            Westin Pune Koregaon Park | Larisa Resort Manali | Royal Orchid Fort
            Resort | Sea Shell Havelock | Spice Tree Munnar | Mayfair Spa Resort
            & Casino Gangtok | Hyatt Regency Dharamshala Resort | Jw Marriott
            Bengaluru | The Lodhi Delhi | Itc Grand Bharat Manesar | Taj Holiday
            Village Resort & Spa Goa | Welcomhotel By Itc Hotels Tavleen Chail |
            Taj Nadesar Palace Varanasi | Aamby Valley City Lonavala | Baghvan
            Pench | Welcomhotel By Itc Hotels Shimla | Sawai Madhopur Lodge Ihcl
            Seleqtions | Taj Green Cove Resort And Spa Kovalam | The Lalit
            Resort And Spa Bekal | Shangri-La'S - Eros Hotel | Jw Marriott
            Mussoorie Walnut Grove | Coral Reef Resort Havelock | Itc Gardenia
            Bengaluru | Solang Valley Resort Manali | Amoha Retreat Dharamshala
            | Aahana - The Corbett Wilderness | Le Meridien Mahabaleshwar Resort
            And Spa
          </span>
        </div>

        <div className="text-sm mt-1">
          <span className="font-bold text-gray-400">
            Trending Hotels in India
          </span>
          <span className="text-gray-400 ml-2">
            The Leela Ambience Gurgaon | Trivik Hotels & Resorts Chikmagalur |
            Brijrama Palace Varanasi | Taj Mahal New Delhi | Java Rain Resort
            Chikmagalur | Oakwood Premier Prestige Bangalore | Polo Orchid
            Resort Cherrapunjee | Shiv Vilas Resorts Jaipur | The Elgin
            Darjeeling | The Residency Towers Puducherry | Trident Nariman Point
            Mumbai | Fort Rajwada Jaisalmer | Oberoi Rajvilas Jaipur | Taj
            Aravali Resort & Spa | Pepper Trail Wayanad | Radisson Blu Resort
            Dharamshala | Red Earth Tadoba | The Oberoi Amarvilas Agra | The
            Roseate Ganges Rishikesh | Samode Haveli Jaipur | Namah Corbett |
            Raas Devigarh Udaipur | The Roseate Delhi | Marriott Jaipur |
            Novotel Omr Chennai | Novotel Airport Hyderabad | Chennai Radisson
            Blu | Radisson Blu Delhi | Radisson Hyderabad | Amritsar Ramada |
            Hotel Sea Hawk Digha | Hotel Avasa | Evershine Resort Mahabaleshwar
            | Hotel Taj Ahmedabad | Leonia Resort Hyderabad
          </span>
        </div>
      </div>
      <div>

      </div>
      <div className="w-10/12 m-auto">

      <Divider sx={{ marginY: "8px" }} />
        <div className="flex justify-between">
          <span className="flex flex-col">
            <header className="font-bold ">Follow Us</header>
            <div className="flex gap-2 text-gray-400">
              <FacebookIcon sx={{ fontSize: "35px" }} />
              <TwitterIcon sx={{ fontSize: "35px" }} />
              <YouTubeIcon sx={{ fontSize: "35px" }} />
            </div>
          </span>
          <span className="flex flex-col items-center">
            <header className="font-bold ">
              Book Tickets fatser.Download Our Mobile App
            </header>
            <img src={download} alt="" className="w-6/12" />
          </span>
          <span>
            <img src={paymentImage} alt="payment-logo"/>
          </span>
        </div>
        <Divider sx={{ marginY: "8px" }} />
      </div>
    </div>
  );
};

export default Hotel_Footer;
