import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import ndjsonStream from "can-ndjson-stream";

export const devicesApi = createApi({
  reducerPath: "devicesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: builder => ({
    fetchAllLinkedDevices: builder.query({
      query: () => ({ url: "/devices" })
    }),
    fetchAllDiscoveredDevices: builder.query({
      query: () => ({ url: "/devices/discovered" })
    })
  })
});

export const ffetchDevices = async (onDeviceRead, setLoading) => {
  const response = await fetch("/api/devices");
  const reader = ndjsonStream(response.body).getReader();

  let result;
  while(!result || !result.done) {
    result = await reader.read();
    !result.done && onDeviceRead(result.value)
    setLoading(!result.done)
  }
}
