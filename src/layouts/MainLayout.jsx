import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthenModal from "../components/AuthenModal";
import MobileMenu from "../components/MobileMenu";
import { MainContextProvider } from "../components/MainContext";
import { libFunc } from "../assets/js/main";

const MainLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathname]);

  useEffect(() => {
    // const script = document.createElement("script");
    // script.src = "src/assets/js/main.js";
    // document.body.appendChild(script);
    //Convert file library to reactjs
    const myTimeout = setTimeout(() => {
      libFunc();
    }, 500);
    return () => clearTimeout(myTimeout);
  }, [pathname]);

  return (
    <MainContextProvider>
      <div className="page-wrapper">
        {/* Header */}
        <Header />

        {/* Main */}
        <Outlet />

        {/* Footer */}
        <Footer />
        {/* Menu mobile */}
        <MobileMenu />
        <AuthenModal />
      </div>
    </MainContextProvider>
  );
};

export default MainLayout;
