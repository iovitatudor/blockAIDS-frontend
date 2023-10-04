import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ITaskCreator} from "../models/ITaskCreator";
import {ITask} from "../models/ITask";

export const tasksApi = createApi({
  reducerPath: 'taskAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api'
  }),
  tagTypes: ['Task'],
  endpoints: (build) => ({
    fetchAllTasks: build.query<ITask[], void>({
      query: () => ({
        url: `/tasks`,
      }),
      providesTags: result => ['Task']
    }),
    fetchAllTasksBySpecialistId: build.query<ITask[], number>({
      query: (id) => ({
        url: `/tasks/specialist/${id}`,
      }),
      providesTags: result => ['Task']
    }),
    fetchAllTasksByUserId: build.query<ITask[], number>({
      query: (id) => ({
        url: `/tasks/user/${id}`,
      }),
      providesTags: result => ['Task']
    }),
    fetchTaskById: build.query<ITask, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
      }),
      providesTags: result => ['Task']
    }),
    createTask: build.mutation<ITask, ITaskCreator>({
      query: (data) => ({
        url: `/tasks`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Task']
    }),
    updateTask: build.mutation<ITask, ITaskCreator>({
      query: (data) => {
        return {
          url: `/tasks/${data.id}`,
          method: 'PATCH',
          body: data
        }
      },
      invalidatesTags: ['Task']
    }),
    deleteTask: build.mutation<ITask, number | undefined>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task']
    }),
  })
})