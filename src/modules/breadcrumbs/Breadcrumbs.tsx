import React, {FC} from "react";
import './styles/Breadcrumbs.scss';
import {Link} from "react-router-dom";
import {IBreadcrumb} from "./types/IBreadcrumb";

interface IBreadcrumbsProps {
  breadcrumbs: IBreadcrumb[],
};

const Breadcrumbs: FC<IBreadcrumbsProps> = (props) => {
  return (
    <div className="breadcrumbs-area">
      {props.breadcrumbs.map(breadcrumb =>
        <div key={breadcrumb.name}>
          <Link to={breadcrumb.link}
                className={breadcrumb.active ? 'active' : ''}>
            {breadcrumb.name}
          </Link>
          {!breadcrumb.active && <span>{'>'}</span>}
        </div>
      )}
    </div>
  );
}

export default Breadcrumbs;