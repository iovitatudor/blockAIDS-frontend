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
  const [canceledActiveClass, setCanceledActiveClass] = useState(false);
  const [assignedActiveClass, setAssignedActiveClass] = useState(false);
  const [approvedActiveClass, setApprovedActiveClass] = useState(false);

  const disableActiveClasses = () => {
    setAllActiveClass(false);
    setInProgressActiveClass(false);
    setDoneActiveClass(false);
    setOverdueActiveClass(false);
    setCanceledActiveClass(false);
    setAssignedActiveClass(false);
    setApprovedActiveClass(false);
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
      case TaskStatusesEnum.Cancelled :
        setCanceledActiveClass(true);
        break;
      case TaskStatusesEnum.Assigned :
        setAssignedActiveClass(true);
        break;
      case TaskStatusesEnum.Approved :
        setApprovedActiveClass(true);
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
      </div>
      <div className={`filter-option ${approvedActiveClass && 'active-option'}`}
           onClick={event => sortTasks(TaskStatusesEnum.Approved)}>Approved
      </div>
      <div className={`filter-option ${inProgressActiveClass && 'active-option'}`}
           onClick={event => sortTasks(TaskStatusesEnum.InProgress)}>In progress
      </div>
      <div className={`filter-option ${assignedActiveClass && 'active-option'}`}
           onClick={event => sortTasks(TaskStatusesEnum.Assigned)}>Assigned
      </div>
      <div className={`filter-option ${doneActiveClass && 'active-option'}`}
           onClick={event => sortTasks(TaskStatusesEnum.Done)}>Done
      </div>
      <div className={`filter-option ${overdueActiveClass && 'active-option'}`}
           onClick={event => sortTasks(TaskStatusesEnum.Overdue)}>Overdue
      </div>
      <div className={`filter-option ${canceledActiveClass && 'active-option'}`}
           onClick={event => sortTasks(TaskStatusesEnum.Cancelled)}>Cancelled
      </div>
    </div>
  );
}

export default TasksFilter;