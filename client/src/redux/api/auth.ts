import axios from "axios";
import { type IUser } from "../../../../models";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: ({ url }) => axios.get(url).then((response) => response.data),
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => "/api/current_user",
      transformResponse: (response: IUser) => response,
    }),
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
});

export const getUser = async () => {
  try {
    const response = await axios.get<IUser>("/api/current_user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const { useGetUserQuery } = authApiSlice;
