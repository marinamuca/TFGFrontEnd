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
      const lang = (getState() as RootState).i18n.language;
      if (!!token) {
        headers.set("Authorization", `Token ${token}`);
      }
      headers.set("Accept-Language", lang);
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
    checkLike: builder.query({
      query: (exhibition_id) => ({
        url: `check_like/${exhibition_id}/`,
        method: "GET",
      }),
    }),
    sendLike: builder.mutation({
      query: (body) => ({
        url: `likes/`,
        method: "POST",
        body,
      }),
    }),
    deleteLike: builder.mutation({
      query: (id) => ({
        url: `likes/${id}/`,
        method: "DELETE",
      }),
    }),
    getLikedExhibitions: builder.query({
      query: () => ({
        url: `liked_exhibitions/`,
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
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useChangeProfileMutation,
  useLazyGetUserQuery,
  useGetUserQuery,
  useLazyGetUserProfileQuery,
  useLazyCheckLikeQuery,
  useSendLikeMutation,
  useDeleteLikeMutation,
  useLazyGetLikedExhibitionsQuery
} = apiSlice;
