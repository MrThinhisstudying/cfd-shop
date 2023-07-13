import React from "react";
import HeaderTop from "./HeaderTop";
import HeaderMiddle from "./HeaderMiddle";
import useHeader from "./useHeader";
const Header = () => {
  const headerProps = useHeader();
  return (
    <header className="header">
      <HeaderTop {...headerProps} />
      <HeaderMiddle />
    </header>
  );
};

export default Header;
