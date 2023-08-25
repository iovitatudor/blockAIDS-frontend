import React, {FC} from "react";
import {Link} from "react-router-dom";

const FooterLogo: FC = () => {
  return (
    <>
      <Link to="/" className="logo">
        <img src='/images/logo.svg' alt=""/>
      </Link>
      <p className="footer-moto">A decentralized electronic ecosystem on the blockchain</p>
    </>
  );
}

export default FooterLogo;