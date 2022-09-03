import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user", 
	initialState: {
		isUserLoggedIn: false
	}, 
	reducers: {
		login: state => {
			state.isUserLoggedIn = true;
		}, 
		logout: state => {
			state.isUserLoggedIn = false;
		}
	}
}); 

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

// Selectors 
export const selectIsUserLoggedIn = (state) => state.user.isUserLoggedIn; 