import React, {FC, useState} from "react";
import '../styles/Task.scss';
import {TaskStatusesEnum} from "../enums/TaskStatusesEnum";

interface ITasksFilterProps {
  onSort: (sortBy: string) => any;
}

const TasksFilter: FC<ITasksFilterProps> = ({onSort}) => {
  const [allActiveClass, setAllActiveClass] = useState(true);
  const [inProgressActiveClass, setInProgressActiveClass] = useState(false);
  const [doneActiveClass, setDoneActiveClass] = useState(false);
  const [overdueActiveClass, setOverdueActiveClass] = useState(false);
  const [undoneActiveClass, setUndoneActiveClass] = useState(false);

  const disableActiveClasses = () => {
    setAllActiveClass(false);
    setInProgressActiveClass(false);
    setDoneActiveClass(false);
    setOverdueActiveClass(false);
    setUndoneActiveClass(false);
  }

  const enableActiveClassByFlag = (flag: string) => {
    switch (flag) {
      case 'all' :
        setAllActiveClass(true);
        break;
      case TaskStatusesEnum.InProgress :
        setInProgressActiveClass(true);
        break;
      case TaskStatusesEnum.Done :
        setDoneActiveClass(true);
        break;
      case TaskStatusesEnum.Overdue :
        setOverdueActiveClass(true);
        break;
      case TaskStatusesEnum.Undone :
        setUndoneActiveClass(true);
        break;
    }
  }

  const sortTasks = (flag: string) => {
    disableActiveClasses();
    onSort(flag);
    enableActiveClassByFlag(flag);
  }

  return (
    <div className="tasks-filter">
      <div className={`filter-option ${allActiveClass && 'active-option'}`}
           onClick={event => sortTasks('all')}>All
        {/*<span>12</span>*/}
      </div>
      <div className={`filter-option ${inProgressActiveClass && 'active-option'}`}
           onClick={event => sortTasks(TaskStatusesEnum.InProgress)}>In progress
        {/*<span>3</span>*/}
      </div>
      <div className={`filter-option ${doneActiveClass && 'active-option'}`}
           onClick={event => sortTasks(TaskStatusesEnum.Done)}>Done
        {/*<span>5</span>*/}
      </div>
      <div className={`filter-option ${overdueActiveClass && 'active-option'}`}
           onClick={event => sortTasks(TaskStatusesEnum.Overdue)}>Overdue
        {/*<span>4</span>*/}
      </div>
      <div className={`filter-option ${overdueActiveClass && 'active-option'}`}
           onClick={event => sortTasks(TaskStatusesEnum.Undone)}>Undone
        {/*<span>4</span>*/}
      </div>
    </div>
  );
}

export default TasksFilter;