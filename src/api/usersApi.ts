import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IUser} from "../models/IUser";

export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`,
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
          bodyFormData.append('public_key', user.public_key);
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