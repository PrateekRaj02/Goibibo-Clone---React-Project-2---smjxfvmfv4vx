import React, { useEffect, useState } from "react";
import airindialogo from "../../assets/airindialogo.png";
import vistaralogo from "../../assets/vistaralogo.png";
import indigologo from "../../assets/indigologo.png";
import spicejetlogo from "../../assets/spicejetlogo.png";
import { useSelector } from "react-redux";
import { baseUrl, projectId } from "../../utils/constant";
import Flight_Card from "./Flight_Card";

const Flight_Search_Page = () => {
  const source = useSelector((store) => store.flight.sourceSelectedAirport);
  const destination = useSelector(
    (store) => store.flight.destinationSelectedAirport
  );
  const day = useSelector((store) => store.flight.day);
  const [flights, setFlights] = useState([]);
  // console.log(source);
  // console.log(destination);
  // console.log(day);

  const getAllFlight = async () => {
    const apiUrl =
      baseUrl +
      `flight?search={"source":"${source}","destination":"${destination}"}&day=${day}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        projectId: projectId,
      },
    });
    const jsonData = await response.json();
    setFlights(jsonData.data.flights);
    // console.log(jsonData);
  };
  useEffect(() => {
    getAllFlight();
  }, []);
  return (
    <div>
      <div className="bg-blue-700">
        <div className="w-10/12 mx-auto">
          <div className="p-2 flex gap-2 font-medium text-white ">
            <div className="flex gap-2 p-2">
              <input type="radio" name="radio" id="one" checked />
              <label htmlFor="one">One way</label>
            </div>
            <div className="flex gap-1 p-2 cursor-not-allowed">
              <input
                type="radio"
                name="radio"
                id="round"
                disabled
                className="cursor-not-allowed"
              />
              <label htmlFor="round" className="cursor-not-allowed">
                Round Trip
              </label>
            </div>
            <div className="flex gap-1 p-2 cursor-not-allowed">
              <input
                type="radio"
                name="radio"
                id="multi"
                disabled
                className="cursor-not-allowed"
              />
              <label htmlFor="multi" className="cursor-not-allowed">
                Multi City
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="w-10/12 mx-auto flex gap-4  my-4">
        <div className="w-3/12 h-fit rounded-lg shadow-xl bg-white">
          <div className="flex justify-between">
          <h3 className="font-bold text-lg p-4">Filters</h3>
          <button className="mr-2 text-gray-400">Clear</button>

          </div>
          <hr />
          <div className="mb-2">
            <h3 className="font-medium p-4">Departure</h3>
            <ul className="flex flex-col gap-2 ml-4">
              <li className="flex gap-2">
                <input type="checkbox" name="" id="6am" />
                <label htmlFor="6am">Before 6 AM</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="6am-12pm" />
                <label htmlFor="6am-12pm">6 AM - 12 PM</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="12pm-6pm" />
                <label htmlFor="12pm-6pm">12PM-6 PM</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="6pm" />
                <label htmlFor="6pm">After 6 PM</label>
              </li>
            </ul>
          </div>
          <hr />

          <div className="mb-2">
            <h3 className="font-medium  p-4">Stops</h3>
            <ul className="flex flex-col gap-2 ml-4">
              <li className="flex gap-2">
                <input type="checkbox" name="" id="direct" />
                <label htmlFor="direct">Direct</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="1stop" />
                <label htmlFor="1stop">1 stop</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="2+stop" />
                <label htmlFor="2+stop">2+ stops</label>
              </li>
            </ul>
          </div>
          <hr />

          <div className="mb-2">
            <h3 className="font-medium  p-4">Sort By Price</h3>
            <ul className="flex flex-col gap-2 ml-4">
              <li className="flex gap-2">
                <input type="checkbox" name="" id="lowtohigh" />
                <label htmlFor="lowtohigh">Low to High</label>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" name="" id="hightolow" />
                <label htmlFor="hightolow">High to Low</label>
              </li>
            </ul>
          </div>
          <hr />

          <div className="mb-4">
            <h3 className="font-medium  p-4">Preferred Airlines</h3>
            <ul className="flex flex-col gap-2 ml-4">
              <li className="flex gap-2 items-center">
                <input type="checkbox" name="" id="" />
                <img src={airindialogo} className="h-4" />
                <p>Air India</p>
              </li>
              <li className="flex gap-2 items-center">
                <input type="checkbox" name="" id="" />
                <img src={indigologo} className="h-4" />
                <p>IndiGo</p>
              </li>
              <li className="flex gap-2 items-center">
                <input type="checkbox" name="" id="" />
                <img src={spicejetlogo} className="h-4" />
                <p>Spice Jet</p>
              </li>
              <li className="flex gap-2 items-center">
                <input type="checkbox" name="" id="" />
                <img src={vistaralogo} className="h-4" />
                <p>Vistara</p>
              </li>
            </ul>
          </div>
          <div className="flex justify-center my-4">
            <button className="rounded-xl p-4 bg-amber-400">Apply Filter</button>
          </div>
        </div>

        <div className="w-9/12 flex flex-col gap-4">
          {flights.map((flight) => {
            return (
              <Flight_Card
                key={flight._id}
                flight={flight}
                source={source}
                destination={destination}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Flight_Search_Page;
