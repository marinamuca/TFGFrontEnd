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
      if (!!token) {
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
        method: "PATCH",
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
    logout: builder.mutation({
      query: () => ({
        url: `auth/logout/`,
        method: "POST",
      }),
    }),
    getUserProfile: builder.query({
      query: (id) => ({
        url: `user_profile/${id}/`,
        method: "GET",
      }),
    }),
    changeProfile: builder.mutation({
      query: () => ({
        url: `change_profile/`,
        method: "PATCH",
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `auth/user/${id}/`,
        method: "GET",
      }),
    }),
  }),
});

export const { login, logout, register, changeProfile } = apiSlice.endpoints;

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
  // useGetUserProfileQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useChangeProfileMutation,
  useLazyGetUserQuery,
  useLazyGetUserProfileQuery
} = apiSlice;
