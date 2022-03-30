


export const fetchDevices = createAsyncThunk(
  "devices/fetchAll",
  async (userData, { getState, requestId, dispatch }) => {
    const { currentRequestId, loadingStatus } = getState().devices
    const isCurrentRequest = (currentRequestId, requestId) => currentRequestId === requestId;

    if (loadingStatus !== PENDING || !isCurrentRequest(currentRequestId, requestId)) {
      return
    }

    await fetchNdjson(get("/devices"), (device) => { dispatch(deviceFetched(device)) },);
    return
  }
)

export const discoverySlice = createSlice({
  name: "discovery",
  initialState: {},
  reducers: {
    getDiscoveryStatus: 
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
        console.error("device fetch rejected")
      })
  }
});