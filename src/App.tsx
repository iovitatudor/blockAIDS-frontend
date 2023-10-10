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
import Auth from "./pages/Auth";
import Notifications from "./pages/Notifications";
import SidebarDrawer from "./components/SidebarDrawer";
import {BrowserView, MobileView} from 'react-device-detect';
import HomeIcon from './styles/assets/homeIcon.svg';
import TaskIcon from './styles/assets/taskIcon.png';
import TreatmentIcon from './styles/assets/TreatmentIcon.svg';
import ProfileIcon from './styles/assets/ProfileIcon.svg';
import {getMenus} from "./models/Mocks/Menu";
import {footerMenus} from "./models/Mocks/FooterMenu";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import {useAppSelector} from "./hooks/redux";
import {notificationsApi} from "./api/notificationsApi";

const App: FC = () => {
  const {isLogged, authUser, type} = useAppSelector(state => state.authReducer)
  let fetchNotifications = notificationsApi.useFetchScheduledNotificationsByUserIdQuery;

  if (type === 'specialist') {
    fetchNotifications = notificationsApi.useFetchScheduledNotificationsBySpecialistIdQuery;
  }

  const {data: notifications} = fetchNotifications(authUser.id, {pollingInterval: 35000});

  const menus = getMenus(notifications?.length);

  return (
    <React.Fragment>
      <BrowserRouter>
        {
          notifications?.length ?
            <Link to="/notifications">
              <div className="notifications-bar">
                You have {notifications?.length} new notifications, click here for more details
              </div>
            </Link>
            : ''
        }

        <div className="wrapper">
          {isLogged &&
              <>
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
              </>
          }
          <main className="main-area">
            <Layout>
              <Routes>
                <Route element={<AuthGuard/>}>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/tasks" element={<Tasks/>}/>
                  <Route path="/tasks/view/:id" element={<TaskView/>}/>
                  <Route path="/tasks/create" element={<TaskCreate/>}/>
                  <Route path="/tasks/update/:id" element={<TaskUpdate/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/notifications" element={<Notifications/>}/>
                </Route>
                <Route element={<GuestGuard/>}>
                  <Route path="/auth" element={<Auth/>}/>
                </Route>
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
