import React, {FC, ReactNode, useEffect} from "react";
import {Search} from "../modules/search";
import {useLocation} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";

interface ILayoutProps {
  children: ReactNode
}

const Layout: FC<ILayoutProps> = ({children}) => {
  const {isLogged} = useAppSelector(state => state.authReducer)

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="content-area">
      {isLogged && <Search/>}
      {children}
    </div>
  )
}

export default Layout;