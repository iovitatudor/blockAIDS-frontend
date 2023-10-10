import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ITaskType} from "../models/ITaskType";

export const taskTypesApi = createApi({
  reducerPath: 'taskTypeAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`
  }),
  tagTypes: ['TaskType'],
  endpoints: (build) => ({
    fetchAllTaskTypes: build.query<ITaskType[], void>({
      query: () => ({
        url: `/task-types`,
      }),
      providesTags: result => ['TaskType']
    }),
    createTaskType: build.mutation<ITaskType, ITaskType>({
      query: (post) => ({
        url: `/task-types`,
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['TaskType']
    }),
    updateTaskType: build.mutation<ITaskType, ITaskType>({
      query: (taskType) => ({
        url: `/task-types/${taskType.id}`,
        method: 'PUT',
        body: taskType
      }),
      invalidatesTags: ['TaskType']
    }),
    deleteTaskType: build.mutation<ITaskType, ITaskType>({
      query: (taskType) => ({
        url: `/task-types/${taskType.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TaskType']
    }),
  })
})