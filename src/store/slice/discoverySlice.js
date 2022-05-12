import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDLE, PENDING, UNINITIALIZED } from "api/LoadingStatus";
import { buildApiUrl } from "api/ThinkerApi";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const getDiscoveryStatus = createAsyncThunk(
    "discovery/status/get",
    async (_, { getState, requestId, dispatch, rejectWithValue }) => {
        const { currentRequestId, loadingStatus } = getState().discovery

        if (loadingStatus !== PENDING || currentRequestId !== requestId) {
            return
        }

        const url = buildApiUrl("/discovery/status");
        const discoveryStatus = await axios(url)
            .catch(error => rejectWithValue(error.message));
        dispatch(setDiscoveryStatus(discoveryStatus.data.isActive))
    }
)

const putDiscoveryStatus = createAsyncThunk(
    "discovery/status/put",
    async (activateDiscovery, { getState, requestId, dispatch, rejectWithValue }) => {
        const { currentRequestId, loadingStatus } = getState().discovery
        if (loadingStatus !== PENDING || currentRequestId !== requestId) {
            return
        }

        const url = buildApiUrl("/discovery/status", { setActive: activateDiscovery });
        const discoveryStatus = await axios.post(url)
            .catch(error => rejectWithValue(error.message));
        dispatch(setDiscoveryStatus(discoveryStatus.data.isActive))
    }
)

export const discoverySlice = createSlice({
    name: "discovery",
    initialState: {
        loadingStatus: UNINITIALIZED,
        currentRequestId: undefined,
        discoveryStatus: undefined,
        error: undefined,
        isError: false
    },
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
                    state.isError = false
                    state.error = undefined
                }
            })
            .addCase(getDiscoveryStatus.rejected, (state, action) => {
                state.loadingStatus = IDLE
                state.isError = true
                state.error = action.payload
                state.currentRequestId = undefined
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
                    state.isError = false
                    state.error = undefined
                }
            })
            .addCase(putDiscoveryStatus.rejected, (state, action) => {
                state.loadingStatus = IDLE
                state.isError = true
                state.error = action.payload
                state.currentRequestId = undefined
            })
    }
});

export const useDiscoveryStatus = () => {
    const { discoveryStatus, loadingStatus, isError, error } = useSelector(state => state.discovery);
    const dispatch = useDispatch();
    useEffect(() => dispatch(getDiscoveryStatus()), []);
    return {
        data: discoveryStatus,
        isLoading: loadingStatus === PENDING,
        isDone: loadingStatus === IDLE,
        isError: isError,
        error: error,
        refetch: () => dispatch(getDiscoveryStatus()),
        updateDiscoveryStatus: (value) => dispatch(putDiscoveryStatus(value))
    }
}

export const { setDiscoveryStatus } = discoverySlice.actions;
export const discoveryReducer = discoverySlice.reducer;