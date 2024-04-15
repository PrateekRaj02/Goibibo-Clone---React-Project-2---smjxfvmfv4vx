import Navbar from "./navbar/Navbar";
import Layout from "./layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Flight_Page from "./flight-section/Flight_Page";
import Hotel_Page from "./hotel-section/Hotel_Page";
import Train_Page from "./train-section/Train_Page";
import Bus_Page from "./bus-section/Bus_Page";

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
        path:"/hotel",
        element:<Hotel_Page/>
      },
      {
        path:"/trains",
        element:<Train_Page/>
      },
      {
        path:"/bus",
        element:<Bus_Page/>
      }
    ]
  },
]);

export default App;
