import { configureStore } from '@reduxjs/toolkit';
import user from './modules/user';
import barcode from './modules/barcode';

const store = configureStore({
	reducer: {
		user,
		barcode,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
