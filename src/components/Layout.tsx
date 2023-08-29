import React, {FC, ReactNode} from "react";
import {Search} from "../modules/search";

interface ILayoutProps {
  children: ReactNode
}

const Layout: FC<ILayoutProps> = ({children}) => {
  return (
    <div className="content-area">
      <Search/>
      {children}
    </div>
  )
}

export default Layout;