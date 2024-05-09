import Navbar from "./navbar/Navbar";
import Layout from "./layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Flight_Page from "./flight-section/Flight_Page";
// import Hotel_Page from "./hotel-section/Hotel_Page";
import Train_Page from "./train-section/Train_Page";
import Bus_Page from "./bus-section/Bus_Page";
import Flight_Search_Page from "./flight-section/Flight_Search_Page";
// import Hotel_Search_Page from "./hotel-section/Hotel_Search_Page";
import Hotel_Detail from "./hotel-section/Hotel_Detail";
import Train_Search_Page from "./train-section/Train_Search_Page";
import Bus_Search_Page from "./bus-section/Bus_Search_Page";
import Payment from "./payment/Payment";
import Bus_Booking_Page from "./checkout/Bus_Booking_Page";
import Train_Booking_Page from "./checkout/Train_Booking_Page";
import Flight_Booking_Page from "./checkout/Flight_Booking_Page";
import Hotel_Booking_Page from "./checkout/Hotel_Booking_Page";
import My_Trips from "./my-trips/My_Trips";
import { lazy } from "react";
import { Suspense } from "react";
import GlobalLoader from "./loder/GlobalLoader";

const Hotel_Page= lazy(()=>import("./hotel-section/Hotel_Page"))
const Hotel_Search_Page= lazy(()=>import("./hotel-section/Hotel_Search_Page"))

function App() {
  return (
    <div className="bg-gray-200 z-0 m-0 p-0">
      <RouterProvider router={appRouter}>
        <Layout/>
      </RouterProvider>
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path:"/",
        element:<Flight_Page/>
      },
      {
        path:"/flightsearch",
        element:<Flight_Search_Page/>
      },
      {
        path:"/mytrips",
        element:<My_Trips/>
      },
      {
        path:"/hotelsearch",
        element:<Suspense fallback={<GlobalLoader />}><Hotel_Search_Page/></Suspense>
      },
      {
        path:"/hotel",
        element:<Suspense fallback={<GlobalLoader />}><Hotel_Page/></Suspense>
      },
      {
        path:"/hotel/:id",
        element:<Hotel_Detail/>
      },
      {
        path:"/trains",
        element:<Train_Page/>
      },
      {
        path:"/trainsearch",
        element:<Train_Search_Page/>
      },
      {
        path:"/bus",
        element:<Bus_Page/>
      },
      {
        path:"/bussearch",
        element:<Bus_Search_Page/>
      },
      {
        path:"/booking/bus/:data",
        element:<Bus_Booking_Page/>
      },
      {
        path:"/booking/train/:data",
        element:<Train_Booking_Page/>
      },
      {
        path:"/booking/flight/:data",
        element:<Flight_Booking_Page/>
      },
      {
        path:"/booking/hotel/:data",
        element:<Hotel_Booking_Page/>
      },
      {
        path:"/payment/:body",
        element:<Payment/>
      }
    ]
  },
]);

export default App;
