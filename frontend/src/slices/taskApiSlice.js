import { apiSlice } from "./apiSlice";

const USERS_URL = "http://localhost:5000/api/tasks";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.mutation({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateTasks: builder.mutation({
      query: ({ id, completed }) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT",
        body: { completed },
        credentials: "include",
      }),
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetTasksMutation,
  useUpdateTasksMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} = taskApiSlice;
