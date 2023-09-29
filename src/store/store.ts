import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {taskTypesApi} from "../api/taskTypesApi";
import {organizationsApi} from "../api/organizationsApi";
import {specialistsApi} from "../api/specialistsApi";
import {usersApi} from "../api/usersApi";
import {authApi} from "../api/authApi";
import {tasksApi} from "../api/tasksApi";
import userReducer from './reducers/UserSlice';
import authReducer  from "./reducers/AuthSlice";

const rootReducer = combineReducers({
  authReducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  [taskTypesApi.reducerPath]: taskTypesApi.reducer,
  [organizationsApi.reducerPath]: organizationsApi.reducer,
  [specialistsApi.reducerPath]: specialistsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(taskTypesApi.middleware)
        .concat(tasksApi.middleware)
        .concat(organizationsApi.middleware)
        .concat(specialistsApi.middleware)
        .concat(usersApi.middleware)
        .concat(authApi.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

