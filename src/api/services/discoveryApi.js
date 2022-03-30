import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const discoveryApi = createApi({
    reducerPath: "discoveryApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/discovery/" }),
    endpoints: builder => ({
      getDiscoveryStatus: builder.query({
        query: () => ({ url: "status" }),
        transformResponse: (response) => response.isActive
      }),
      startDiscovery: builder.mutation({
          query: () => ({
              url: "start",
              method: "POST"
          }),
          transformResponse: (response) => response.isActive
      }),
      stopDiscovery: builder.mutation({
        query: () => ({
            url: "stop",
            method: "POST"
        }),
        transformResponse: (response) => response.isActive
    })
    })
  });


  export const {useGetDiscoveryStatusQuery, useStartDiscoveryMutation, useStopDiscoveryMutation} = discoveryApi