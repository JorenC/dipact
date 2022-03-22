import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "./types";

const initialState: Auth = { isLoggedIn: false };

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// TODO test
		login: (state, action: PayloadAction<string>) => {
			const token = action.payload;
			state.isLoggedIn = true;
			state.token = token;
		},
		// TODO test
		logout: (state) => {
			state.isLoggedIn = false;
			state.token = undefined;
		},
	},
});

export const actions = authSlice.actions;

export default authSlice.reducer;
