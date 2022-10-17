import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
	name: "session", 
	initialState: {
		roomId: "",
		questionId: null,
	}, 
	reducers: {
		setRoom: (state, action) => {
			state.roomId = action.payload.roomId;
		},
		resetRoom: (state) => {
			state.roomId = "";
		},
		setQuestion: (state, action) => {
			state.questionId = action.payload.questionId;
		}
	}
}); 

export const { setRoom, setQuestion, resetRoom } = sessionSlice.actions;
export default sessionSlice.reducer;

// Selectors 
export const selectRoomId = (state) => state.session.roomId; 
export const selectQuestionId = (state) => state.session.questionId;