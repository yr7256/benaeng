import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';  // redux-persist (새로고침 해도 유지)

const reducers = combineReducers({});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
