import React from "react";
import { useMainContext } from "../MainContext";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/reducers/authReducer";
import { message } from "antd";
import useAuthenModal from "../AuthenModal/useAuthenModal";

const useHeader = () => {
  const { openAuthenModal } = useMainContext();
  const { profile } = useSelector((state) => state.auth);
  console.log("Profile: ", profile);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(authAction.logout());
    message.success("Đăng xuất thành công");
  };
  return {
    openAuthenModal,
    profile,
    onLogout,
  };
};

export default useHeader;
