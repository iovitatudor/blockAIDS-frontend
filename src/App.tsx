import React, {FC} from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
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
import SidebarDrawer from "./components/SidebarDrawer";
import {BrowserView, MobileView} from 'react-device-detect';
import HomeIcon from './styles/assets/homeIcon.svg';
import TaskIcon from './styles/assets/taskIcon.png';
import TreatmentIcon from './styles/assets/TreatmentIcon.svg';
import ProfileIcon from './styles/assets/ProfileIcon.svg';

const App: FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="wrapper">

          <BrowserView className="desktop-device">
            <aside className="sidebar-area">
              <Sidebar menus={menus}/>
            </aside>
          </BrowserView>
          <MobileView className="mobile-device">
            <div className="mobile-header">
              <div className="menu-burgher">
                <SidebarDrawer/>
              </div>
              <Link to="/" className="logo">
                <img src='/images/logo.svg' alt=""/>
              </Link>
            </div>
          </MobileView>

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
        </div>
        <Footer menus={footerMenus}/>
        <MobileView className="mobile-device">
          <div className="bottom-bar">
            <div className="bar-item">
              <Link to="/">
                <i className="icon" style={{backgroundImage: `url(${HomeIcon})`}}></i>
                Home
              </Link>
            </div>
            <div className="bar-item">
              <Link to="/tasks">
                <i className="icon" style={{backgroundImage: `url(${TaskIcon})`}}></i>
                Tasks
              </Link>
            </div>
            <div className="bar-item">
              <SidebarDrawer/>
            </div>
            <div className="bar-item">
              <i className="icon" style={{backgroundImage: `url(${TreatmentIcon})`}}></i>
              Treatment
            </div>
            <div className="bar-item">
              <Link to="/profile">
                <i className="icon" style={{backgroundImage: `url(${ProfileIcon})`}}></i>
                Profile
              </Link>
            </div>
          </div>
        </MobileView>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
