import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
	name: "session", 
	initialState: {
		questionId: null,
		questions: [],
	}, 
	reducers: {
		setQuestionId: (state, action) => {
			state.questionId = action.payload;
		},
		setQuestions: (state, action) => {
			state.questions = action.payload.questions;
		}
	}
}); 

export const { setQuestionId, setQuestions } = sessionSlice.actions;
export default sessionSlice.reducer;

// Selectors 
export const selectQuestionId = (state) => state.session.questionId;
export const selectQuestions = (state) => state.session.questions;