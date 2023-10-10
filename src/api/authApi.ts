import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IRegister, IRegisterClientResponse, IRegisterSpecialistResponse} from "../models/IRegister";
import {ILogin, ILoginClientResponse, ILoginSpecialistResponse} from "../models/ILogin";

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/auth`
  }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    register: build.mutation<IRegisterClientResponse | IRegisterSpecialistResponse, IRegister>({
      query: (post) => ({
        url: `/register`,
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Auth']
    }),
    login: build.mutation<ILoginClientResponse | ILoginSpecialistResponse, ILogin>({
      query: (post) => ({
        url: `/login`,
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Auth']
    }),
  })
})