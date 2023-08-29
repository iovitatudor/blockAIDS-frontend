import React, {FC} from "react";
import ProfileWidget from "../modules/profile";
import {Breadcrumbs, IBreadcrumb} from "../modules/breadcrumbs";

const breadcrumbs: IBreadcrumb[] = [
  {
    name: 'Home',
    link: '/',
    active: false,
  },
  {
    name: 'Profile',
    link: '/profile',
    active: true,
  },
];

const Profile: FC = () => {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
      <ProfileWidget/>
    </div>
  );
}

export default Profile;