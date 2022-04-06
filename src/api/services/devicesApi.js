import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


export const devicesApi = createApi({
  reducerPath: "devicesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/devices/" }),
  endpoints: builder => ({
    getReportsPage: builder.query({
      query: ({ deviceId, page, pageSize }) => ({ url: `${deviceId}/reports?page=${page}&pageSize=${pageSize}` })
    }),
    executeAction: builder.mutation({
      query: (deviceId, actionName) => ({ method: "POST", url: `${deviceId}/${actionName}` })
    }),
    patchDevice: builder.mutation({
      query: ({ deviceId, ...data }) => ({ method: "PATCH", url: `${deviceId}`, body: { ...data } })
    }),
    deleteDevice: builder.mutation({
      query: (deviceId) => ({ method: "DELETE", url: `${deviceId}` })
    })
  })
});

export const { useGetReportsPageQuery, useExecuteActionMutation, usePatchDeviceMutation, useDeleteDeviceMutation } = devicesApi