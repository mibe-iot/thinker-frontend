import { configureStore } from "@reduxjs/toolkit";
import { widgetsReducer } from "./slice/widgetsSlice";

export const store = configureStore({
  reducer: {
    widgets: widgetsReducer
  }
});
