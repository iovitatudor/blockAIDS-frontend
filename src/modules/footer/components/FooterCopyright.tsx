import React, {FC} from "react";

const FooterCopyright: FC = () => {
  return (
    <div className="footer-copyright">
      <p>© {new Date().getFullYear()} blockaids. All rights reserved</p>
    </div>
  );
};

export default FooterCopyright;
