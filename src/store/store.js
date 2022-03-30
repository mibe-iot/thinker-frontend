import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { widgetsReducer } from "./slice/widgetsSlice";
import { devicesReducer } from "./slice/devicesSlice";
import { devicesApi } from "services/DeviceService";
import { discoveryApi } from "api/services/discoveryApi";

const rootReducer = combineReducers({
  widgets: widgetsReducer,
  devices: devicesReducer,
  [devicesApi.reducerPath]: devicesApi.reducer,
  [discoveryApi.reducerPath]: discoveryApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(devicesApi.middleware, discoveryApi.middleware)
});
