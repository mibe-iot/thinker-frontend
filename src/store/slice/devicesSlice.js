import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  array: []
};

export const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    fetchDevices: state => {
      state.array = [
        {
          "name": "LightSensor1",
          "id": "3131"
        }
      ];
    }
  }
});

export const { fetchDevices } = devicesSlice.actions;
export const devicesReducer = devicesSlice.reducer;
