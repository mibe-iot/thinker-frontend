import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const hooksApi = createApi({
    reducerPath: "hooksApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: builder => ({
        getAllHooks: builder.query({
            query: () => ({ url: "/hooks" })
        }),
        createEmailHook: builder.mutation({
            query: ({...hook}) => ({ method: "POST", url:  "/hooks/sendEmail", body: {...hook}})
        }),
        createTriggers: builder.mutation({
            query: ({deviceId, ...triggersAndHooks}) => ({ method: "POST", url: `/triggers/${deviceId}`, body: {...triggersAndHooks}})
        })
    })
});


export const {
    useGetAllHooksQuery,
    useCreateEmailHookMutation,
    useCreateTriggersMutation
} = hooksApi