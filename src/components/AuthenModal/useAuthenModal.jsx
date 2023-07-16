import { useMainContext } from "../MainContext";
import { useDispatch } from "react-redux";
import { authAction, login } from "../../store/reducers/authReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { authService } from "../../services/authService";
import { getCart } from "../../store/reducers/cartReducer";

const useAuthenModal = () => {
  const dispatch = useDispatch();
  const { isAuthenModalOpen, closeAuthenModal, authenForm, setAuthenForm } =
    useMainContext();

  const onChangeTab = (tab) => {
    setAuthenForm(tab);
  };

  const onClose = () => {
    closeAuthenModal();
  };

  const onLogin = async (data) => {
    if (data?.email) {
      try {
        const payload = {
          email: data.email,
          password: data.password,
        };
        console.log("Payload: ", payload);
        //call API
        const res = await dispatch(login(payload));
        //dùng unwrap để lấy payload thôi
        const profileData = unwrapResult(res);
        console.log("res onLogin:", profileData);
        if (profileData?.id) {
          message.success(
            `Welcome ${profileData?.firstName + " " + profileData?.lastName}`
          );
          onClose();
        }
      } catch (error) {
        console.log("Error onLogin: ", error);
        message.error("Something wrong, please try again");
      }
    }
  };

  const onRegister = async (data) => {
    if (data?.email) {
      try {
        const payload = {
          firstName: "",
          lastName: "",
          email: data.email,
          password: data.password,
        };
        console.log("Payload: ", payload);
        console.log("Remember me: ", isRemember);
        //call API
        const res = await authService.register(payload);

        if (res?.data?.data?.id) {
          onLogin({
            email: data.email,
            password: data.password,
          });
        }
      } catch (error) {
        console.log("Error onLogin: ", error);
        message.error("Something wrong, please try again");
      }
    }
  };
  //Get profile
  const onGetProfile = async () => {
    try {
      const profileRes = await authService.getProfile();
      console.log("ProfileRes:", profileRes?.data?.data);
      if (profileRes?.data?.data) {
        dispatch(authAction.setProfile(profileRes?.data?.data));
        dispatch(getCart());
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return {
    isOpen: isAuthenModalOpen,
    activeTab: authenForm,
    onChangeTab,
    onClose,
    onLogin,
    onRegister,
    onGetProfile,
  };
};

export default useAuthenModal;
