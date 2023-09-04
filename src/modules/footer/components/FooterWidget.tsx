import React, {FC} from "react";
import {Grid} from "@mui/material";
import "../styles/Footer.scss";
import FooterLogo from "./FooterLogo";
import FooterContacts from "./FooterContacts";
import FooterMenuList from "./FooterMenuList";
import {IFooterMenus} from "../types/IFooterMenu";
import FooterCopyright from "./FooterCopyright";
import {BrowserView, MobileView} from 'react-device-detect';

interface IFooterProps {
  menus: IFooterMenus[],
}

const FooterWidget: FC<IFooterProps> = (props) => {

  const menu = props.menus[0];
  const about = props.menus[1];
  const policies = props.menus[2];

  return (
    <footer>
      <BrowserView className="footer-inside desktop-device">
        <Grid container columnSpacing={3}>
          <Grid item sm={3} xs={4}>
            <FooterLogo/>
            <FooterContacts/>
          </Grid>
          {props.menus.map((menuList, index) =>
            <Grid item sm={3} xs={4} key={index}>
              <FooterMenuList menuList={menuList}/>
            </Grid>
          )}
        </Grid>
      </BrowserView>
      <MobileView className="footer-inside mobile-device">
        <Grid container columnSpacing={3}>
          <Grid item sm={4} xs={12}>
            <FooterLogo/>
            <div className="footer-contacts-md">
              <FooterContacts/>
            </div>
          </Grid>
          <Grid item sm={4} xs={12}>
            <FooterMenuList menuList={menu}/>
          </Grid>
          <Grid item sm={4} xs={12}>
            <FooterMenuList menuList={about}/>
            <FooterMenuList menuList={policies}/>
          </Grid>
          <Grid item sm={4} xs={12}>
            <div className="footer-contacts-sm">
              <FooterContacts/>
            </div>
          </Grid>
        </Grid>
      </MobileView>
      <FooterCopyright/>
    </footer>

  );
}

export default FooterWidget