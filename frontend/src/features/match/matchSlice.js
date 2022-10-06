import { createSlice } from "@reduxjs/toolkit";

import { MatchState } from "../../utils/constants";

export const matchSlice = createSlice({
	name: "match", 
	initialState: {
		matchState: MatchState.NONE,
	}, 
	reducers: {
		waiting: state => {
			state.matchState = MatchState.WAITING_FOR_MATCH;
		}, 
		finding: state => {
			state.matchState = MatchState.FINDING_MATCH;
		},
		notFound: state => {
			state.matchState = MatchState.MATCH_NOT_FOUND;
		},
		found: state => {
			state.matchState = MatchState.MATCH_FOUND;
		},
	}
}); 

export const { waiting, finding, notFound, found } = matchSlice.actions;
export default matchSlice.reducer;

// Selectors 
export const selectMatchState = (state) => state.matchState; 