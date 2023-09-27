import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ISpecialists} from "../models/ISpecialists";

export const specialistsApi = createApi({
  reducerPath: 'specialists',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
  }),
  tagTypes: ['Specialists'],
  endpoints: (build) => ({
    fetchAllSpecialists: build.query<ISpecialists[], void>({
      query: () => ({
        url: `/specialists`,
      }),
      providesTags: result => ['Specialists']
    }),
  })
});