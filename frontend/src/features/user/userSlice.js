import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user", 
	initialState: {
		username: null,
		userId: null
	}, 
	reducers: {
		setUsername(state, action) {
			state.username = action.payload.username;
		},
		setUserId(state, action) {
			state.userId = action.payload.userId;
		}
	}
}); 

export const { setUsername, setUserId } = userSlice.actions;
export default userSlice.reducer;

// Selectors 
export const selectUsername = (state) => state.user.username; 
export const selectUserId = (state) => state.user.userId;