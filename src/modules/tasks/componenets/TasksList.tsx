import React, {FC} from "react";
import '../styles/Task.scss';
import TasksItem from "./TasksItem";
import {Link} from "react-router-dom";
import arrowRight from "../assets/arrowRight.svg";

interface ITasksList {
  heading?: string;
  Filter?: React.ComponentType;
  Calendar?: React.ComponentType;
}

const TasksList: FC<ITasksList> = (props) => {
  const {Filter, Calendar, heading} = props;

  return (
    <>
      <div className="tasks-area">
        {heading && (
          <div className="tasks-title">
            <div><h3>Tasks</h3></div>
            <div>
              <Link to="/tasks">
                Show all
                <i className="icon" style={{backgroundImage: `url(${arrowRight})`}}></i>
              </Link>
            </div>
          </div>
        )}
        <div className="tasks-top-options">
          {Filter && <Filter/>}
          {Calendar && <Calendar/>}
        </div>
        <div className="tasks-head">
          <div className="tasks-head-item lg">Author</div>
          <div className="tasks-head-item md">Task name</div>
          <div className="tasks-head-item md">Due Date</div>
          <div className="tasks-head-item xs">Points</div>
          <div className="tasks-head-item sm">Status</div>
          <div className="tasks-head-item xs"></div>
        </div>
        <div className="tasks-body-wrapper">
          <TasksItem/>
          <TasksItem/>
          <TasksItem/>
          <TasksItem/>
        </div>
      </div>
      <div className="task-options">
        <Link to="/tasks/create">
          <button className="add-new-task-btn">
            <i className="icon"></i>
            Add new task
          </button>
        </Link>
      </div>
    </>
  );
}

export default TasksList;