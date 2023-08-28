import React, {FC} from "react";
import {Search} from "../modules/search";
import {Breadcrumbs, IBreadcrumb} from "../modules/breadcrumbs";
import {TasksList, TasksFilter, TasksCalendar} from "../modules/tasks";

const breadcrumbs: IBreadcrumb[] = [
  {
    name: 'Home',
    link: '/',
    active: false,
  },
  {
    name: 'Tasks',
    link: '/tasks',
    active: true,
  },
];

const Home: FC = () => {
  return (
    <>
      <Search/>
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
      <TasksList Filter={TasksFilter} Calendar={TasksCalendar}/>
    </>
  );
};

export default Home;