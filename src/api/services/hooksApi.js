import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BACKEND_URL } from "api/constants";

export const hooksApi = createApi({
    reducerPath: "hooksApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api` }),
    endpoints: builder => ({
        getAllHooks: builder.query({
            query: () => ({ url: "/hooks" })
        }),
        createEmailHook: builder.mutation({
            query: ({...hook}) => ({ method: "POST", url:  "/hooks/sendEmail", body: {...hook}})
        }),
        deleteHook: builder.mutation({
            query: (id) => ({ method: "DELETE", url: `/hooks/${id}`})
        }),
        getDeviceTriggers: builder.query({
            query: (deviceId) => ({ url: `/triggers/${deviceId}`})
        }),
        createTriggers: builder.mutation({
            query: ({deviceId, ...triggersAndHooks}) => ({ method: "POST", url: `/triggers/${deviceId}`, body: {...triggersAndHooks}})
        }),
        deleteTrigger: builder.mutation({
            query: (id) => ({ method: "DELETE", url: `/triggers/${id}`})
        }),
    })
});


export const {
    useGetAllHooksQuery,
    useCreateEmailHookMutation,
    useGetDeviceTriggersQuery,
    useCreateTriggersMutation,
    useDeleteHookMutation,
    useDeleteTriggerMutation
} = hooksApi