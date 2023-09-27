import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {taskTypesApi} from "../api/taskTypesApi";
import {organizationsApi} from "../api/organizationsApi";
import {specialistsApi} from "../api/specialistsApi";
import {authApi} from "../api/authApi";
import userReducer from './reducers/UserSlice';
import specialistAuthReducer  from "./reducers/Auth/SpecialistAuthSlice";

const rootReducer = combineReducers({
  userReducer,
  specialistAuthReducer,
  [taskTypesApi.reducerPath]: taskTypesApi.reducer,
  [organizationsApi.reducerPath]: organizationsApi.reducer,
  [specialistsApi.reducerPath]: specialistsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(taskTypesApi.middleware)
        .concat(organizationsApi.middleware)
        .concat(specialistsApi.middleware)
        .concat(authApi.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

