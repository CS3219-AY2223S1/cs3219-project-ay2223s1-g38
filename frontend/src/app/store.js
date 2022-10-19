import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import matchReducer from "../features/match/matchSlice";
import sessionReducer from "../features/session/sessionSlice";
import userReducer from "../features/user/userSlice";

const persistConfig = {
	key: "root",
	storage,
};

const rootReducer = combineReducers({
	user: userReducer,
	match: matchReducer,
	session: sessionReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [ thunk ]
});

export const persistor = persistStore(store);
