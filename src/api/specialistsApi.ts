import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ISpecialist} from "../models/ISpecialist";

export const specialistsApi = createApi({
  reducerPath: 'specialists',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
  }),
  tagTypes: ['Specialists'],
  endpoints: (build) => ({
    fetchAllSpecialists: build.query<ISpecialist[], void>({
      query: () => ({
        url: `/specialists`,
      }),
      providesTags: result => ['Specialists']
    }),
  })
});