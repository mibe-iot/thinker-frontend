/* eslint-disable react-hooks/exhaustive-deps */
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IDLE, PENDING, UNINITIALIZED } from "api/LoadingStatus";
import { buildApiUrl, fetchNdjson } from "api/thinkerApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onRequestFulfilled, onRequestPending, onRequestRejected } from "./slices";

const devicesAdapter = createEntityAdapter({
  selectId: (entity) => entity.address
})

export const fetchDevices = createAsyncThunk(
  "devices/fetchAll",
  async (_, { getState, requestId, dispatch }) => {
    const { currentRequestId, loadingStatus } = getState().devices

    if (loadingStatus !== PENDING || currentRequestId !== requestId) {
      return
    }

    await fetchNdjson(buildApiUrl("/devices"), (device) => { dispatch(deviceFetched(device)) });
  }
)

export const devicesSlice = createSlice({
  name: "devices",
  initialState: devicesAdapter.getInitialState({
    loadingStatus: UNINITIALIZED,
    currentRequestId: undefined,
  }),
  reducers: {
    deviceFetched: devicesAdapter.setOne
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state, action) => {
        if (state.loadingStatus === IDLE || state.loadingStatus === UNINITIALIZED) {
          console.log("a")
          state.loadingStatus = PENDING;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loadingStatus === PENDING &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = IDLE
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loadingStatus = IDLE  
        console.error("device fetch rejected")
      })
  }
});

export const useFetchDevicesQuery = () => {
  const { entities, ids, loadingStatus } = useSelector((state) => state.devices)
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchDevices()), []);
  return {
    data: entities,
    ids: ids,
    isUninitialized: loadingStatus === UNINITIALIZED,
    isLoading: loadingStatus === PENDING,
    isDone: loadingStatus === IDLE,
    refetch: () => dispatch(fetchDevices())
  }
}

export const { deviceFetched } = devicesSlice.actions;
export const devicesReducer = devicesSlice.reducer;
