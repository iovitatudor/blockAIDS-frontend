import React, {FC} from "react";
import {TasksList, TasksFilter, TasksCalendar} from "../modules/tasks";
import {useAppSelector} from "../hooks/redux";
import {RootState} from "../store/store";

const Home: FC = () => {
  const {users} = useAppSelector((state: RootState) => state.userReducer);

  return (
    <>
      <TasksList Filter={TasksFilter} Calendar={TasksCalendar}/>
    </>
  );
};

export default Home;