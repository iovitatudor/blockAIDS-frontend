import React, {FC} from "react";
import {Breadcrumbs, IBreadcrumb} from "../modules/breadcrumbs";
import {TaskUpdateWidget} from "../modules/tasks";

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
    name: 'Update Task',
    link: '/tasks/update',
    active: true,
  },
];

const TaskUpdate: FC = () => {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
      <TaskUpdateWidget/>
    </div>
  );
}

export default TaskUpdate;