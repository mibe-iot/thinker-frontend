import { configureStore } from "@reduxjs/toolkit";
import { widgetsReducer } from "./slice/widgetsSlice";
import { devicesReducer } from "./slice/devicesSlice";

export const store = configureStore({
  reducer: {
    widgets: widgetsReducer,
    devices: devicesReducer
  }
});
