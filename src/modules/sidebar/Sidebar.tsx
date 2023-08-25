import React, {FC} from 'react';
import "./styles/Sidebar.scss";
import SidebarLogo from "./components/SidebarLogo";
import SidebarProfile from "./components/SidebarProfile";
import SidebarMenuList from "./components/SidebarMenuList";
import {IMenu} from "../../types/IMenu";

interface ISidebarProps {
  menus: IMenu[],
};

const Sidebar: FC<ISidebarProps> = (props) => {
  return (
    <div className="sidebar">
      <SidebarLogo/>
      <SidebarProfile/>
      <SidebarMenuList menuList={props.menus}/>
    </div>
  );
}

export default Sidebar;