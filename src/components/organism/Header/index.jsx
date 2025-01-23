import React from "react";
import Navbar from "../../organism/Navbar";

const Header = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="md:pb-7">{children}</div>
    </div>
  );
};

export default Header;
