import React, {FC} from "react";
import {Link} from "react-router-dom";

const SidebarLogo: FC = () => {
  return (
    <Link to="/" className="logo">
      <img src='/images/logo.svg' alt=""/>
    </Link>
  );
};

export default SidebarLogo;