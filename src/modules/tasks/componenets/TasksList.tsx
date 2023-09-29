import React, {FC, useEffect, useState} from "react";
import '../styles/Task.scss';
import TasksItem from "./TasksItem";
import {Link} from "react-router-dom";
import arrowRight from "../assets/arrowRight.svg";
import {BrowserView, MobileView} from 'react-device-detect';
import {tasksApi} from "../../../api/tasksApi";
import {useAppSelector} from "../../../hooks/redux";
import {ITask} from "../../../models/ITask";
import {TasksCalendar, TasksFilter} from "../index";

interface ITasksList {
  heading?: string;
  Filter?: React.ComponentType;
  Calendar?: React.ComponentType;
}

const TasksList: FC<ITasksList> = (props) => {
  const {type, authUser} = useAppSelector(state => state.authReducer);
  const {Filter, Calendar, heading} = props;
  const [filtredTasks, setFiltredTasks] = useState<ITask[] | undefined>();
  let fetchTasks = tasksApi.useFetchAllTasksByUserIdQuery;
  if (type === 'specialist') {
    fetchTasks = tasksApi.useFetchAllTasksBySpecialistIdQuery;
  }
  const {data: tasks} = fetchTasks(authUser.id);

  const sortTasks = (sortBy: string = 'all') => {
    if (tasks) {
      if (sortBy === 'all') {
        return setFiltredTasks(tasks);
      }
      const sortedTasks = tasks.filter(task => task.status === sortBy);
      return setFiltredTasks(sortedTasks);
    }
  }

  useEffect(() => {
    sortTasks('all');
  }, )

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
          <TasksFilter onSort={sortTasks}/>
          {/*{Filter && <Filter/>}*/}
          <BrowserView>
            <TasksCalendar/>
            {/*{Calendar && <Calendar/>}*/}
          </BrowserView>
        </div>
        <div className="tasks-head">
          <div className="tasks-head-item lg">
            {type === "user" && "Specialist"}
            {type === "specialist" && "Patient"}
          </div>
          <div className="tasks-head-item md">Task name</div>
          <div className="tasks-head-item md">Due Date</div>
          <div className="tasks-head-item xs">Points</div>
          <div className="tasks-head-item sm">Status</div>
          <div className="tasks-head-item xs"></div>
        </div>
        <div className="tasks-body-wrapper">
          {filtredTasks && filtredTasks.map((task) => <TasksItem task={task}/>)}
        </div>
      </div>
      <div className="task-options">
        <Link to="/tasks/create" style={{display: 'inline-block'}}>
          <button className="add-new-task-btn">
            <i className="icon"></i>
            Add new task
          </button>
        </Link>
        <MobileView>
          {Calendar && <Calendar/>}
        </MobileView>
      </div>
    </>
  );
}

export default TasksList;