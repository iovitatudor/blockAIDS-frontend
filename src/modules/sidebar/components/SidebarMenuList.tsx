import React, {FC} from "react";
import SidebarMenuItem from "./SidebarMenuItem";
import {ISidebarMenu} from "../types/ISidebarMenu";

interface ISidebarMenuListProps {
  menuList: ISidebarMenu[],
}

const SidebarMenuList: FC<ISidebarMenuListProps> = (props) => {
  return (
    <div>
      {props.menuList.map((menu) =>
        <SidebarMenuItem menu={menu} key={menu.id}/>
      )}
    </div>
  );
}

export default SidebarMenuList;