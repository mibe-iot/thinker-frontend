import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BACKEND_URL } from "api/constants";

export const discoveryApi = createApi({
    reducerPath: "discoveryApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/discovery` }),
    endpoints: builder => ({
        getDiscoveryStatus: builder.query({
            query: () => ({ url: "/status" }),
            transformResponse: (response) => response.isActive
        }),
        getDiscoveredDevices: builder.query({
            query: () => ({ url: "" })
        }),
        setDiscoveryActive: builder.mutation({
            query: (isActivateDiscovery) => ({
                url: `?setDiscoveryActive=${isActivateDiscovery}`,
                method: "POST"
            }),
            transformResponse: (response) => response.isActive
        }),
        connectDevice: builder.mutation({
            query: (deviceAddress) => ({
                url: `/connect/${deviceAddress.replaceAll(":", "-")}`,
                method: "POST"
            })
        })
    })
});


export const {
    useGetDiscoveryStatusQuery,
    useGetDiscoveredDevicesQuery,
    useSetDiscoveryActiveMutation,
    useConnectDeviceMutation
} = discoveryApi