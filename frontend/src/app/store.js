import { combineReducers, createStore } from "redux";

import { persistStore, persistReducer } from "redux-persist";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

import matchReducer from "../features/match/matchSlice";
import sessionReducer from "../features/session/sessionSlice";
import userReducer from "../features/user/userSlice";

const persistConfig = {
	key: "root",
	storage,
	stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
	user: userReducer,
	match: matchReducer,
	session: sessionReducer
});

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
