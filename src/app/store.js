import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";
// import storageSession from 'redux-persist/lib/storage/session';
import rootReducer from './rootReducer';

const persistConfig = {
	key: 'root',
	storage: storage,
};

const appReducer = (state, action) => {
	if (action.type === 'SIGNOUT') {
		// for all keys defined in your persistConfig(s)
		storage.removeItem('persist:root');
		return rootReducer(undefined, action);
	}
	return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export default configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
	// middleware: [thunk]
});
