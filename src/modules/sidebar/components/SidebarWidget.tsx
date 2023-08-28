import React, {FC} from 'react';
import "../styles/Sidebar.scss";
import SidebarLogo from "./SidebarLogo";
import SidebarProfile from "./SidebarProfile";
import SidebarMenuList from "./SidebarMenuList";
import {ISidebarMenu} from "../index";

interface ISidebarProps {
  menus: ISidebarMenu[],
};

const SidebarWidget: FC<ISidebarProps> = (props) => {
  return (
    <div className="sidebar">
      <SidebarLogo/>
      <SidebarProfile/>
      <SidebarMenuList menuList={props.menus}/>
    </div>
  );
}

export default SidebarWidget;