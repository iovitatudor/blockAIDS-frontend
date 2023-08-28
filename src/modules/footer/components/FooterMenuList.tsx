import React, {FC} from "react";
import FooterMenuItem from "./FooterMenuItem";
import {IFooterMenus} from "../types/IFooterMenu";

interface IFooterMenuList {
  menuList: IFooterMenus
}

const FooterMenuList: FC<IFooterMenuList> = (props) => {
  return (
    <div className="footer-menu-list-wrapper">
      <h3>{props.menuList.title}</h3>
      <FooterMenuItem menus={props.menuList.menus}/>
    </div>
  );
}

export default FooterMenuList;