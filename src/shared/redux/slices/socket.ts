import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import socketIOClient, { Socket } from "socket.io-client";

import { RootState } from "@/shared/redux/store";
import { SocketState } from "@/shared/types/redux";

const ENDPOINT = process.env.NEXT_PUBLIC_SERVER_URL;

const defaultState: SocketState = {
  value: null,
};

const slice = createSlice({
  name: "socket",
  initialState: defaultState,
  reducers: {
    resetSocketState: () => defaultState,

    setSocket(state, action: PayloadAction<any>) {
      const { value } = action.payload;
      state.value = value;
    },
  },
});

// Reducer
export default slice.reducer;

const actions = slice.actions;

export { actions as socketActions };

// Action Creators
export const setSocket =
  (
    socketClient: typeof socketIOClient = socketIOClient,
  ): ThunkAction<void, RootState, unknown, PayloadAction<{ value: Socket }>> =>
  (dispatch, getState) => {
    const state = getState();
    const oldSocket = state.socket.value;

    if (oldSocket?.disconnect) {
      oldSocket.disconnect();
    }

    const socket = socketClient(ENDPOINT as string, {
      // Type assertion for ENDPOINT
      withCredentials: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
    });

    dispatch(
      actions.setSocket({
        value: socket,
      }),
    );
  };

export const getSocket = (state: { socket: SocketState }) => state.socket.value;
