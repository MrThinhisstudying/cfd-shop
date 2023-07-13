import React, { createContext, useContext, useState } from "react";
import { AUTHEN_TYPE } from "../../contant/authenModal";

const MainContext = createContext({});

export const MainContextProvider = ({ children }) => {
  const [isAuthenModalOpen, setIsAuthenModalOpen] = useState(false);
  const [authenForm, setAuthenForm] = useState(AUTHEN_TYPE.login);

  const openAuthenModal = () => {
    setIsAuthenModalOpen(true);
    document.body.className = "modal-open";
    document.body.style = "padding-right: 15px";
  };

  const closeAuthenModal = () => {
    setIsAuthenModalOpen(false);
    setAuthenForm(AUTHEN_TYPE.login);
    document.body.className = "";
    document.body.style = "";
  };

  return (
    <MainContext.Provider
      value={{
        isAuthenModalOpen,
        authenForm,
        openAuthenModal,
        closeAuthenModal,
        setAuthenForm,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
