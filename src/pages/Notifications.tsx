import React, {FC} from "react";
import {Breadcrumbs, IBreadcrumb} from "../modules/breadcrumbs";
import {NotificationsWidget} from "../modules/notofications";

const breadcrumbs: IBreadcrumb[] = [
  {
    name: 'Home',
    link: '/',
    active: false,
  },
  {
    name: 'Notifications',
    link: '/notifications',
    active: true,
  },
];
const Notifications: FC = () => {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
      <NotificationsWidget/>
    </div>
  );
}

export default Notifications;