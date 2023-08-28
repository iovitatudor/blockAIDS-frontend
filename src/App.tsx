import React, {FC} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Grid} from "@mui/material";
import Home from "./pages/Home";
import About from "./pages/About";
import {Sidebar} from "./modules/sidebar";
import {Footer} from "./modules/footer";
import {menus} from "./api/menu";
import {footerMenus} from "./api/footerMenu";
import Layout from "./components/Layout";

const App: FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="wrapper">
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Sidebar menus={menus}/>
            </Grid>
            <Grid item xs={10}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home/>}></Route>
                  <Route path="about" element={<About/>}/>
                </Routes>
              </Layout>
            </Grid>
          </Grid>
        </div>
        <Footer menus={footerMenus}/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
