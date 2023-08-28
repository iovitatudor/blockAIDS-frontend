import React, {FC} from "react";
import {IFooterMenu} from "../types/IFooterMenu";
import {Link} from "react-router-dom";

interface IFooterMenuItemProps {
  menus: IFooterMenu[]
}

const FooterMenuItem: FC<IFooterMenuItemProps> = (props) => {
  return (
    <ul className="footer-menu-list">
      {props.menus.map(menu =>
        <li className="footer-menu-item" key={menu.id}>
          <Link to={menu.url}>
            {menu.title}
          </Link>
        </li>
      )}
    </ul>
  );
}

export default FooterMenuItem;