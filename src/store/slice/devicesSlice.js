/* eslint-disable react-hooks/exhaustive-deps */
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IDLE, PENDING, UNINITIALIZED } from "api/LoadingStatus";
import { buildApiUrl, fetchNdjson } from "api/thinkerApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const devicesAdapter = createEntityAdapter({
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
    dispatch(removeOldFetchDevices());
  }
)

export const devicesSlice = createSlice({
  name: "devices",
  initialState: devicesAdapter.getInitialState({
    loadingStatus: UNINITIALIZED,
    currentRequestId: undefined,
    activeDeviceAddress: undefined,
    currentFetch: []
  }),
  reducers: {
    deviceFetched: (state, action) => { 
      state.currentFetch.push(action.payload.address); 
      devicesAdapter.setOne(state, action.payload) 
    },
    setActiveDeviceAddress: (state, action) => {state.activeDeviceAddress = action.payload},
    removeOldFetchDevices: (state) => {
      devicesAdapter.removeMany(state, state.ids.filter(it => !state.currentFetch.includes(it)))
      state.currentFetch = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state, action) => {
        if (state.loadingStatus === IDLE || state.loadingStatus === UNINITIALIZED) {
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
        state.currentRequestId = undefined
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

export const { deviceFetched, setActiveDeviceAddress, removeOldFetchDevices } = devicesSlice.actions;
export const devicesReducer = devicesSlice.reducer;
