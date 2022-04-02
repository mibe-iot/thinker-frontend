import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IDLE, PENDING, UNINITIALIZED } from "api/LoadingStatus";
import { buildApiUrl } from "api/thinkerApi";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { onRequestFulfilled, onRequestPending, onRequestRejected } from "./slices";

const discoveryAdapter = createEntityAdapter({
    selectId: (entity) => entity.address
})

const getDiscoveryStatus = createAsyncThunk(
    "discovery/status/get",
    async (_, { getState, requestId, dispatch }) => {
        const { currentRequestId, loadingStatus } = getState().discovery

        if (loadingStatus !== PENDING || currentRequestId !== requestId) {
            return
        }
        
        const url = buildApiUrl("/discovery/status");
        const discoveryStatus = await axios(url);
        dispatch(setDiscoveryStatus(discoveryStatus.data.isActive))
    }
)

const putDiscoveryStatus = createAsyncThunk(
    "discovery/status/put",
    async (activateDiscovery, { getState, requestId, dispatch }) => {
        const { currentRequestId, loadingStatus } = getState().discovery
        if (loadingStatus !== PENDING || currentRequestId !== requestId) {
            return
        }

        const url = buildApiUrl("/discovery/status", { setActive: activateDiscovery });
        const discoveryStatus = await axios.post(url);
        dispatch(setDiscoveryStatus(discoveryStatus.data.isActive))
    }
)

export const discoverySlice = createSlice({
    name: "discovery",
    initialState: discoveryAdapter.getInitialState({
        loadingStatus: UNINITIALIZED,
        currentRequestId: undefined,
        discoveryStatus: undefined
    }),
    reducers: {
        setDiscoveryStatus: (state, action) => {
            state.discoveryStatus = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getDiscoveryStatus.pending, (state, action) => {
                if (state.loadingStatus === IDLE || state.loadingStatus === UNINITIALIZED) {
                    state.loadingStatus = PENDING;
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(getDiscoveryStatus.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (
                    state.loadingStatus === PENDING &&
                    state.currentRequestId === requestId
                ) {
                    state.loadingStatus = IDLE
                    state.currentRequestId = undefined
                }
            })
            .addCase(getDiscoveryStatus.rejected, (state, action) => {
                state.loadingStatus = IDLE
                console.error("device fetch rejected")
            })
            .addCase(putDiscoveryStatus.pending, (state, action) => {
                if (state.loadingStatus === IDLE || state.loadingStatus === UNINITIALIZED) {
                    state.loadingStatus = PENDING;
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(putDiscoveryStatus.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                if (
                    state.loadingStatus === PENDING &&
                    state.currentRequestId === requestId
                ) {
                    state.loadingStatus = IDLE
                    state.currentRequestId = undefined
                }
            })
            .addCase(putDiscoveryStatus.rejected, (state, action) => {
                state.loadingStatus = IDLE
                console.error("discovery fetch rejected")
            })
    }
});

export const useDiscoveryStatus = () => {
    const { discoveryStatus, loadingStatus } = useSelector(state => state.discovery);
    const dispatch = useDispatch();
    useEffect(() => dispatch(getDiscoveryStatus()), []);
    return {
        data: discoveryStatus,
        isLoading: loadingStatus === PENDING,
        isDone: loadingStatus === IDLE,
        refetch: () => dispatch(getDiscoveryStatus()),
        updateDiscoveryStatus: (value) => dispatch(putDiscoveryStatus(value))
    }
}

export const { setDiscoveryStatus } = discoverySlice.actions;
export const discoveryReducer = discoverySlice.reducer;