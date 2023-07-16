import React from "react";
import HeaderTop from "./HeaderTop";
import HeaderMiddle from "./HeaderMiddle";
import useHeader from "./useHeader";
const Header = () => {
  const { headerProps, headerMiddleProps } = useHeader();
  return (
    <header className="header">
      <HeaderTop {...headerProps} />
      <HeaderMiddle {...headerMiddleProps} />
    </header>
  );
};

export default Header;
