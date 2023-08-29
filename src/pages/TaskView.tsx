import React, {FC} from "react";
import {Breadcrumbs, IBreadcrumb} from "../modules/breadcrumbs";
import {TaskViewWidget} from "../modules/tasks";

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
    name: 'View Task',
    link: '/tasks/view',
    active: true,
  },
];

const TaskView: FC = () => {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
      <TaskViewWidget/>
    </div>
  );
}

export default TaskView;