import React, {FC} from "react";
import '../styles/Task.scss';

const TasksFilter: FC = () => {
  return (
    <div className="tasks-filter">
      <div className="filter-option active-option">All <span>12</span></div>
      <div className="filter-option">In progress <span>3</span></div>
      <div className="filter-option">Done <span>5</span></div>
      <div className="filter-option">Not Done <span>4</span></div>
    </div>
  );
}

export default TasksFilter;