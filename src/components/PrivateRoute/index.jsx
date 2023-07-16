import React from "react";
import { LOCAL_STORAGE } from "../../contant/localStorage";
import { Navigate, Outlet } from "react-router-dom";
import useHeader from "../Header/useHeader";
import { useMainContext } from "../MainContext";

const PrivateRoute = ({ redirectPath = "/" }) => {
  // const { profile } = useHeader();
  const { openAuthenModal } = useMainContext();
  const isLogin = localStorage.getItem(LOCAL_STORAGE.token);
  if (!isLogin) {
    openAuthenModal(true);
    return <Navigate to={redirectPath} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
