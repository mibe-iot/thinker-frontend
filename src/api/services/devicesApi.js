import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BACKEND_URL } from "api/constants";


export const devicesApi = createApi({
  reducerPath: "devicesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/devices` }),
  endpoints: builder => ({
    getReportsPage: builder.query({
      query: ({ deviceId, page, pageSize }) => ({ url: `${deviceId}/reports?page=${page}&pageSize=${pageSize}` })
    }),
    executeAction: builder.mutation({
      query: ({deviceId, actionName}) => ({ method: "POST", url: `${deviceId}/${actionName}` })
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