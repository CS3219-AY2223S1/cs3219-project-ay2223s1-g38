import { configureStore } from "@reduxjs/toolkit";

import matchReducer from "../features/match/matchSlice";
import sessionReducer from "../features/session/sessionSlice";
import userReducer from "../features/user/userSlice";

export default configureStore({
	reducer: {
		user: userReducer,
		match: matchReducer,
		session: sessionReducer
	}
});
