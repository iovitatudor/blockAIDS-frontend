import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ISpecialist} from "../models/ISpecialist";

interface RTQError {
  data: {
    message: string,
    statusCode: number,
  }
}

export const specialistsApi = createApi({
  reducerPath: 'specialists',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api`,
  }),
  tagTypes: ['Specialists'],
  endpoints: (build) => ({
    fetchAllSpecialists: build.query<ISpecialist[], void>({
      query: () => ({
        url: `/specialists`,
      }),
      providesTags: result => ['Specialists']
    }),
    fetchSpecialistById: build.query<ISpecialist, number>({
      query: (id: number) => ({
        url: `/specialists/${id}`,
      }),
      providesTags: result => ['Specialists']
    }),
    updateSpecialist: build.mutation<ISpecialist | RTQError, ISpecialist>({
      query: (specialist) => {
        const bodyFormData = new FormData();
        bodyFormData.append('name', specialist.name);
        bodyFormData.append('email', specialist.email);
        bodyFormData.append('job_position', specialist.jobPosition);
        bodyFormData.append('organizationId', specialist.organizationId);
        if (specialist.file) {
          bodyFormData.append('avatar', specialist.file);
        }
        return {
          url: `/specialists/${specialist.id}`,
          method: 'PATCH',
          body: bodyFormData,
          formData: true
        }
      },
      invalidatesTags: ['Specialists']
    }),
  })
});