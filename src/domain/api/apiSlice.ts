// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Exhibition } from '../types/types'

export const apiSlice = createApi({
  reducerPath: "API_TFG",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  endpoints: (builder) => ({
    getExhibitions: builder.query({
      query: () => `exhibition/`,
    }),
    getExhibitionByID: builder.query({
      query: (id) => `exhibition/${id}/`,
    }),
    createExhibitions: builder.mutation({
        query: (body) => ({
          url: `exhibition/`,
          method: 'POST',
          body,
        })
    }),
    getIllustrations: builder.query({
      query: () => `illustration/`,
    }),
    createIllustration: builder.mutation({
        query: (body) => ({
          url: `illustration/`,
          method: 'POST',
          body: body,
          formData: true
        })
    }),
    updateIllustration: builder.mutation({
      query: ({ id, body }) => ({
        url: `illustration/${id}/`,
        method: 'PUT',
        body: body
      })
    })
  }),
});

export const { useGetExhibitionsQuery,  useGetExhibitionByIDQuery, useCreateExhibitionsMutation, useCreateIllustrationMutation, useGetIllustrationsQuery, useUpdateIllustrationMutation } = apiSlice;