import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../utils/redux/store";

const Layout = () => {
  return (
    <div className="m-0 p-0">
      <Provider store={store}>
        <Navbar />
        <Outlet />
      </Provider>
    </div>
  );
};

export default Layout;
