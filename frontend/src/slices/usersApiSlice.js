import { apiSlice } from "./apiSlice";

const USERS_URL = "http://localhost:5000/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
        /*      withCredentials: true, */
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
        /*   withCredentials: true, */
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  usersApiSlice;
