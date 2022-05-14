import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const APP_SETTINGS_TYPE = "APPLICATION";
export const MAIL_SETTINGS_TYPE = "MAIL";

export const appSettingsApi = createApi({
    reducerPath: "appSettingsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/settings" }),
    endpoints: builder => ({
      getSettingsStatus: builder.query({
        query: () => ({ method: "GET", url: "/status" })
      }),
      getSettingsByType: builder.query({
        query: ({type}) => ({ method: "GET", url: `/${type}` })
      }),
      updateMailSettings: builder.mutation({
        query: ({...data }) => ({ method: "POST", url: `$/${MAIL_SETTINGS_TYPE}`, body: { ...data } })
      }),
      updateAppSettings: builder.mutation({
        query: ({...data }) => ({ method: "POST", url: `$/${APP_SETTINGS_TYPE}`, body: { ...data } })
      })
    })
  });
  
  export const { 
    useGetSettingsStatusQuery, 
    useGetSettingsByTypeQuery, 
    useUpdateMailSettingsMutation, 
    useUpdateAppSettingsMutation 
  } = appSettingsApi

