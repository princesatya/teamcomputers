import { createSlice } from '@reduxjs/toolkit';

export const homeDataSlice = createSlice({
	name: 'homepage',
	initialState: {
		token: "",
		userData: {},
	},
	reducers: {
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// doesn't actually mutate the state because it uses the immer library,
		// which detects changes to a "draft state" and produces a brand new
		// immutable state based off those changes
		saveToken: (state, action) => {
			state.token = action.payload;
		},
		saveUserData: (state, action) => {
			state.userData = action.payload;
		},
	},
});

export const {
	saveToken,
	saveUserData


} = homeDataSlice.actions;

export default homeDataSlice.reducer;
