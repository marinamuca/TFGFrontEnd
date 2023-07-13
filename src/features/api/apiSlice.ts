// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Exhibition } from '../types'

export const apiSlice = createApi({
  reducerPath: "API_TFG",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getExhibitions: builder.query({
      query: () => `exhibitions`,
    }),
    createExhibitions: builder.mutation({
        query: (body) => ({
          url: `exhibitions`,
          method: 'POST',
          body,
        })
    }),
  }),
});

export const { useGetExhibitionsQuery, useCreateExhibitionsMutation } = apiSlice;