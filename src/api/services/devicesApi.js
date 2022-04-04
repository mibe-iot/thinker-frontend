import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


export const devicesApi = createApi({
    reducerPath: "devicesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/devices/" }),
    endpoints: builder => ({
      executeAction: builder.mutation({
        query: (deviceId, actionName) => ({ method: "POST", url: `${deviceId}/${actionName}` })
      })
    })
  });

  export const { useExecuteActionMutation } = devicesApi