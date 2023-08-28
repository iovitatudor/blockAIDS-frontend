import React, {FC} from "react";
import '../styles/Task.scss';
import TasksItem from "./TasksItem";

interface ITasksList {
  Filter: React.ComponentType;
  Calendar: React.ComponentType;
}

const TasksList: FC<ITasksList> = (props) => {
  const {Filter, Calendar} = props;

  return (
    <>
      <div className="tasks-area">
        <div className="tasks-top-options">
          <Filter/>
          <Calendar/>
        </div>
        <div className="tasks-head">
          <div className="tasks-head-item lg">Author</div>
          <div className="tasks-head-item md">Task name</div>
          <div className="tasks-head-item md">Due Date</div>
          <div className="tasks-head-item sm">Points</div>
          <div className="tasks-head-item sm">Status</div>
          <div className="tasks-head-item xs"></div>
        </div>
        <TasksItem/>
      </div>
      <div className="task-options">
        <button className="add-new-task-btn">
          <i className="icon"></i>
          Add new task
        </button>
      </div>
    </>
  );
}

export default TasksList;