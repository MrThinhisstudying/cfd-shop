import React from "react";
import { LOCAL_STORAGE } from "../../contant/localStorage";
import { Navigate, Outlet } from "react-router-dom";
import useHeader from "../Header/useHeader";

const PrivateRoute = ({ redirectPath = "/" }) => {
  const { profile } = useHeader();
  if (profile === null) {
    return <Navigate to={redirectPath} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
