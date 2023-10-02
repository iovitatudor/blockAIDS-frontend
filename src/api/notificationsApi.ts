import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {INotification} from "../models/INotification";
import {INotificationCreator} from "../models/INotificationCreator";

export const notificationsApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api'
  }),
  tagTypes: ['Notification'],
  endpoints: (build) => ({
    fetchAllNotifications: build.query<INotification[], void>({
      query: () => ({
        url: `/notifications`,
      }),
      providesTags: result => ['Notification']
    }),
    fetchAllNotificationsBySpecialistId: build.query<INotification[], number>({
      query: (id) => ({
        url: `/notifications/specialist/${id}`,
      }),
      providesTags: result => ['Notification']
    }),
    fetchAllNotificationsByUserId: build.query<INotification[], number>({
      query: (id) => ({
        url: `/notifications/user/${id}`,
      }),
      providesTags: result => ['Notification']
    }),
    fetchScheduledNotificationsBySpecialistId: build.query<INotification[], number>({
      query: (id) => ({
        url: `/notifications/specialist/${id}/scheduled`,
      }),
      providesTags: result => ['Notification']
    }),
    fetchScheduledNotificationsByUserId: build.query<INotification[], number>({
      query: (id) => ({
        url: `/notifications/user/${id}/scheduled`,
      }),
      providesTags: result => ['Notification']
    }),
    fetchNotificationById: build.query<INotification, number>({
      query: (id) => ({
        url: `/notifications/${id}`,
      }),
      providesTags: result => ['Notification']
    }),
    createNotification: build.mutation<INotification, INotificationCreator>({
      query: (data) => ({
        url: `/notifications`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Notification']
    }),
    updateNotification: build.mutation<INotification, INotificationCreator>({
      query: (data) => {
        return {
          url: `/notifications/${data.id}`,
          method: 'PATCH',
          body: data
        }
      },
      invalidatesTags: ['Notification']
    }),
    deleteNotification: build.mutation<INotification, INotificationCreator>({
      query: (taskType) => ({
        url: `/notifications/${taskType.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notification']
    }),
  })
})