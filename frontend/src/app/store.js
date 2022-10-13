import { configureStore } from "@reduxjs/toolkit";

import matchReducer from "../features/match/matchSlice";
import userReducer from "../features/user/userSlice";

export default configureStore({
	reducer: {
		user: userReducer,
		match: matchReducer
	}
});
