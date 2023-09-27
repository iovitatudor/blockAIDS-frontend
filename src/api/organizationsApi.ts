import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IOrganizations} from "../models/IOrganizations";

export const organizationsApi = createApi({
  reducerPath: 'organizations',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
  }),
  tagTypes: ['Organization'],
  endpoints: (build) => ({
    fetchAllOrganizations: build.query<IOrganizations[], void>({
      query: () => ({
        url: `/organizations`,
      }),
      providesTags: result => ['Organization']
    }),
  })
});