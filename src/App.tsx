import React, {FC} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Grid} from "@mui/material";
import {Sidebar} from "./modules/sidebar";
import {Footer} from "./modules/footer";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TaskCreate from "./pages/TaskCreate";
import TaskView from "./pages/TaskView";
import TaskUpdate from "./pages/TaskUpdate";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import {menus} from "./api/menu";
import {footerMenus} from "./api/footerMenu";

const App: FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="wrapper">
          <aside className="sidebar-area">
            <Sidebar menus={menus}/>
          </aside>
          <main className="main-area">
            <Layout>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/tasks" element={<Tasks/>}/>
                <Route path="/tasks/view" element={<TaskView/>}/>
                <Route path="/tasks/create" element={<TaskCreate/>}/>
                <Route path="/tasks/update" element={<TaskUpdate/>}/>
                <Route path="/profile" element={<Profile/>}/>
              </Routes>
            </Layout>
          </main>

          {/*<Grid container spacing={2}>*/}
          {/*  <Grid item xs={2}>*/}
          {/*    <Sidebar menus={menus}/>*/}
          {/*  </Grid>*/}
          {/*  <Grid item xs={10}>*/}
          {/*    <Layout>*/}
          {/*      <Routes>*/}
          {/*        <Route path="/" element={<Home/>}/>*/}
          {/*        <Route path="/tasks" element={<Tasks/>}/>*/}
          {/*        <Route path="/tasks/view" element={<TaskView/>}/>*/}
          {/*        <Route path="/tasks/create" element={<TaskCreate/>}/>*/}
          {/*        <Route path="/tasks/update" element={<TaskUpdate/>}/>*/}
          {/*        <Route path="/profile" element={<Profile/>}/>*/}
          {/*      </Routes>*/}
          {/*    </Layout>*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
        </div>
        <Footer menus={footerMenus}/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
