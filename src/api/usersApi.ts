import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ISpecialist} from "../models/ISpecialist";
import {IUser} from "../models/IUser";
import {ITaskType} from "../models/ITaskType";

export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:4000/api',
    }),
    tagTypes: ['Users'],
    endpoints: (build) => ({
      fetchAllUsers: build.query<IUser[], void>({
        query: () => ({
          url: `/users`,
        }),
        providesTags: result => ['Users']
      }),
      fetchUserById: build.query<IUser, number>({
        query: (id: number) => ({
          url: `/users/${id}`,
        }),
        providesTags: result => ['Users']
      }),
      updateUser: build.mutation<IUser, IUser>({
        query: (user) => {
          const bodyFormData = new FormData();
          bodyFormData.append('name', user.name);
          bodyFormData.append('email', user.email);
          bodyFormData.append('phone', user.phone);
          bodyFormData.append('gender', user.gender);
          if (user.birthdate) {
            bodyFormData.append('birthdate', user.birthdate);
          }
          if (user.file) {
            bodyFormData.append('avatar', user.file);
          }
          return {
            url: `/users/${user.id}`,
            method: 'PATCH',
            body: bodyFormData,
            formData: true
          }
        },
        invalidatesTags: ['Users']
      }),
    })
  })
;