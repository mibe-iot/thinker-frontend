import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { widgetsReducer } from "./slice/widgetsSlice";
import { devicesReducer } from "./slice/devicesSlice";
import { discoveryApi } from "api/services/discoveryApi";
import { discoveryReducer } from "./slice/discoverySlice";
import { devicesApi } from "api/services/devicesApi";
import { appSettingsApi } from "api/services/appSettingsApi";
import { hooksApi } from "api/services/hooksApi";

const rootReducer = combineReducers({
  widgets: widgetsReducer,
  devices: devicesReducer,
  discovery: discoveryReducer,
  [devicesApi.reducerPath]: devicesApi.reducer,
  [discoveryApi.reducerPath]: discoveryApi.reducer,
  [appSettingsApi.reducerPath]: appSettingsApi.reducer,
  [hooksApi.reducerPath]: hooksApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(devicesApi.middleware, discoveryApi.middleware, appSettingsApi.middleware, hooksApi.middleware)
});
