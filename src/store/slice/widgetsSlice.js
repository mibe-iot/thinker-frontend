import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  widgets: null
};

  export const widgetsSlice = createSlice({
    name: "widgets",
    initialState,
    reducers: {
      fetch: state => {
        state.widgets = [];
      }
    }
  });

  export const { fetch } = widgetsSlice.actions;
  export const widgetsReducer = widgetsSlice.reducer;
