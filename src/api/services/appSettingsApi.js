import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BACKEND_URL } from "api/contants";

export const APP_SETTINGS_TYPE = "APPLICATION";
export const MAIL_SETTINGS_TYPE = "MAIL";

export const appSettingsApi = createApi({
    reducerPath: "appSettingsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/settings` }),
    endpoints: builder => ({
      getSettingsStatus: builder.query({
        query: () => ({ method: "GET", url: "/status" })
      }),
      getSettingsByType: builder.query({
        query: ({type}) => ({ method: "GET", url: `/${type}` })
      }),
      getAppSettings: builder.query({
        query: () => ({ method: "GET", url: "" })
      }),
      updateMailSettings: builder.mutation({
        query: ({...data }) => ({ method: "POST", url: "/mail", body: { ...data } })
      }),
      updateAppSettings: builder.mutation({
        query: ({...data }) => ({ method: "POST", url: "", body: { ...data } })
      })
    })
  });
  
  export const { 
    useGetSettingsStatusQuery, 
    useGetAppSettingsQuery,
    useGetSettingsByTypeQuery, 
    useUpdateMailSettingsMutation, 
    useUpdateAppSettingsMutation 
  } = appSettingsApi

