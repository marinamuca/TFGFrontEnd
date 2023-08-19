// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Exhibition } from "../types/types";
import type { RootState } from "../../store";

export const apiSlice = createApi({
  reducerPath: "API_TFG",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token != "") {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExhibitions: builder.query({
      query: () => `exhibition/`,
    }),
    getExhibitionByID: builder.query({
      query: (id) => `exhibition/${id}/`,
    }),
    deleteExhibition: builder.mutation({
      query: (id) => ({
        url: `exhibition/${id}/`,
        method: "DELETE",
      }),
    }),
    createExhibitions: builder.mutation({
      query: (body) => ({
        url: `exhibition/`,
        method: "POST",
        body,
      }),
    }),
    updateExhibition: builder.mutation({
      query: ({ id, body }) => ({
        url: `exhibition/${id}/`,
        method: "PUT",
        body: body,
      }),
    }),
    getIllustrations: builder.query({
      query: () => `illustration/`,
    }),
    createIllustration: builder.mutation({
      query: (body) => ({
        url: `illustration/`,
        method: "POST",
        body: body,
        formData: true,
      }),
    }),
    deleteIllustration: builder.mutation({
      query: (id) => ({
        url: `illustration/${id}/`,
        method: "DELETE",
      }),
    }),
    updateIllustration: builder.mutation({
      query: ({ id, body }) => ({
        url: `illustration/${id}/`,
        method: "PATCH",
        body: body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `auth/login/`,
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: `auth/register/`,
        method: "POST",
        body,
      }),
    }),
    getUserDetail: builder.query({
      query: () => ({
        url: `auth/user/`,
        method: "GET",
      }),
    }),
  }),
});

export const { login, register, getUserDetail } = apiSlice.endpoints;

export const {
  useGetExhibitionsQuery,
  useGetExhibitionByIDQuery,
  useCreateExhibitionsMutation,
  useCreateIllustrationMutation,
  useGetIllustrationsQuery,
  useUpdateIllustrationMutation,
  useDeleteExhibitionMutation,
  useDeleteIllustrationMutation,
  useUpdateExhibitionMutation,
  useLoginMutation,
  useRegisterMutation,
  useGetUserDetailQuery,
} = apiSlice;
