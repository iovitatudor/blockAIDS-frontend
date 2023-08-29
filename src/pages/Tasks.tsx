import React, {FC} from "react";
import {Breadcrumbs, IBreadcrumb} from "../modules/breadcrumbs";
import {TasksCalendar, TasksFilter, TasksList} from "../modules/tasks";

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
const Tasks: FC = () => {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
      <TasksList Filter={TasksFilter} Calendar={TasksCalendar}/>
    </div>
  );
}

export default Tasks;