import React, {FC} from "react";
import {Link} from "react-router-dom";
import {ISidebarMenu} from "../types/ISidebarMenu";

interface ISidebarMenuItem {
  menu: ISidebarMenu
}
const SidebarMenuItem: FC<ISidebarMenuItem> = ({menu}) => {
  return (
    <Link to={menu.url}>
      <div className="menu-item">
        <div className="menu-item-icon">
          <img src={menu.icon} alt=""/>
        </div>
        <div className="menu-item-name">
          {menu.name}
        </div>
        {
          menu.notification > 0 &&
            <div className="menu-item-notification">
                <span>{menu.notification}</span>
            </div>
        }

      </div>
    </Link>
  );
}

export default SidebarMenuItem;