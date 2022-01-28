import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { widgetsReducer } from "./slice/widgetsSlice";
import { devicesReducer } from "./slice/devicesSlice";
import { devicesApi } from "services/DeviceService";

const rootReducer = combineReducers({
  widgets: widgetsReducer,
  devices: devicesReducer,
  [devicesApi.reducerPath]: devicesApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(devicesApi.middleware)
});
