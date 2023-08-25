import React, {FC} from "react";
import SidebarMenuItem from "./SidebarMenuItem";
import {IMenu} from "../../../types/IMenu";

interface ISidebarMenuListProps {
  menuList: IMenu[],
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