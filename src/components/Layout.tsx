import React, {FC, ReactNode} from "react";

interface ILayoutProps {
  children: ReactNode
}

const Layout:FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="content-area">{children}</div>
  )
}

export default Layout;