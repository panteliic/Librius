import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "./userSlice"; // Kreiramo slice za user state

interface User {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include", // Omogućava slanje i primanje HTTP-only kolačića
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ user: User }, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/sign-in",
        method: "POST",
        body: credentials,
      }),
    }),
    refresh: builder.mutation<{ user: User }, void>({
      query: () => ({
        url: "/refreshToken",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user)); // Postavi osveženog korisnika u state
        } catch (err) {
          console.error("Refresh token error:", err);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } = authApi;
