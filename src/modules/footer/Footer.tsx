import React, {FC} from "react";
import {Grid} from "@mui/material";
import "./styles/Footer.scss";
import FooterLogo from "./components/FooterLogo";
import FooterContacts from "./components/FooterContacts";
import FooterMenuList from "./components/FooterMenuList";
import {IFooterMenus} from "../../types/IFooterMenu";
import FooterCopyright from "./components/FooterCopyright";

interface IFooterProps {
  menus: IFooterMenus[],
}

const Footer: FC<IFooterProps> = (props) => {
  return (
    <footer>
      <div className="footer-inside">
        <Grid container columnSpacing={3}>
          <Grid item xs={3}>
            <FooterLogo/>
            <FooterContacts/>
          </Grid>
          {props.menus.map((menuList, index) =>
            <Grid item xs={3} key={index}>
              <FooterMenuList menuList={menuList} />
            </Grid>
          )}
        </Grid>
      </div>
      <FooterCopyright/>
    </footer>

  );
}

export default Footer