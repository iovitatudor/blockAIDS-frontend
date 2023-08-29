import React, {FC} from "react";
import {TaskCreateWidget} from "../modules/tasks";
import {Breadcrumbs, IBreadcrumb} from "../modules/breadcrumbs";

const breadcrumbs: IBreadcrumb[] = [
  {
    name: 'Home',
    link: '/',
    active: false,
  },
  {
    name: 'Tasks',
    link: '/tasks',
    active: false,
  },
  {
    name: 'Create Task',
    link: '/tasks/create',
    active: true,
  },
];

const TaskCreate: FC = () => {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
      <TaskCreateWidget/>
    </div>
  );
}

export default TaskCreate;