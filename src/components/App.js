import Navbar from "./navbar/Navbar";
import Layout from "./layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Flight_Page from "./flight-section/Flight_Page";
import Hotel_Page from "./hotel-section/Hotel_Page";
import Train_Page from "./train-section/Train_Page";
import Bus_Page from "./bus-section/Bus_Page";
import Flight_Search_Page from "./flight-section/Flight_Search_Page";
import Hotel_Search_Page from "./hotel-section/Hotel_Search_Page";
import Hotel_Detail from "./hotel-section/Hotel_Detail";
import Train_Search_Page from "./train-section/Train_Search_Page";
import Bus_Search_Page from "./bus-section/Bus_Search_Page";
import Booking_Page from "./checkout/Booking_Page";

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
        path:"/hotelsearch",
        element:<Hotel_Search_Page/>
      },
      {
        path:"/hotel",
        element:<Hotel_Page/>
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
        path:"/booking/:type/:data",
        element:<Booking_Page/>
      }
    ]
  },
]);

export default App;
