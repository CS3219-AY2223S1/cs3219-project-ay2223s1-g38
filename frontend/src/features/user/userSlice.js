import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user", 
	initialState: {
		username: null
	}, 
	reducers: {
		setUsername(state, action) {
			state.username = action.payload.username;
		}
	}
}); 

export const { setUsername } = userSlice.actions;
export default userSlice.reducer;

// Selectors 
export const selectUsername = (state) => state.user.username; 