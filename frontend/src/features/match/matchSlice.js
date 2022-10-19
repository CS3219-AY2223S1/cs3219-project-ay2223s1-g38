import { createSlice } from "@reduxjs/toolkit";

export const matchSlice = createSlice({
	name: "match", 
	initialState: {
		roomId: ""
	}, 
	reducers: {
		setRoom: (state, action) => {
			state.roomId = action.payload;
		},
		resetRoom: (state) => {
			state.roomId = "";
		}
	}
}); 

export const { setRoom, resetRoom } = matchSlice.actions;
export default matchSlice.reducer;

// Selectors 
export const selectRoomId = (state) => state.match.roomId; 