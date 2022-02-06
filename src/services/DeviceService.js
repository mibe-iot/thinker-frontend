import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const devicesApi = createApi({
  reducerPath: "devicesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: builder => ({
    fetchAllLinkedDevices: builder.query({
      query: () => ({ url: "/devices" })
    }),
    fetchAllDiscoveredDevices: builder.query({
      query: () => ({ url: "/devices/discovered" })
    })
  })
});
