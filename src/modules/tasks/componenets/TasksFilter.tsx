import React, {FC} from "react";
import '../styles/Task.scss';
import {TaskStatusesEnum} from "../enums/TaskStatusesEnum";

interface ITasksFilterProps {
  onSort: (sortBy: string) => any;
}

const TasksFilter: FC<ITasksFilterProps> = ({onSort}) => {
  return (
    <div className="tasks-filter">
      <div className="filter-option active-option" onClick={event => onSort('all')}>All
        {/*<span>12</span>*/}
      </div>
      <div className="filter-option" onClick={event => onSort(TaskStatusesEnum.InProgress)}>In progress
        {/*<span>3</span>*/}
      </div>
      <div className="filter-option" onClick={event => onSort(TaskStatusesEnum.Done)}>Done
        {/*<span>5</span>*/}
      </div>
      <div className="filter-option" onClick={event => onSort(TaskStatusesEnum.Overdue)}>Overdue
        {/*<span>4</span>*/}
      </div>
    </div>
  );
}

export default TasksFilter;