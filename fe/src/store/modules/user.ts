import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

// state type
export interface userSlice {
	isValid: boolean;
	isDark: boolean;
	isAlarm: boolean;
	isCycle: boolean;
	isPurchase: boolean;
	newAlarm: boolean;
}

// 초기 상태 정의
const initialState: userSlice = {
	isValid: false,
	isDark: false,
	isAlarm: true,
	isCycle: true,
	isPurchase: true,
	newAlarm: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			const temp = state;
			temp.isValid = true;
			temp.isDark = action.payload.isDark;
			temp.isAlarm = action.payload.isAlarm;
			temp.isCycle = action.payload.isCycle;
			temp.isPurchase = action.payload.isPurchase;
			temp.newAlarm = action.payload.newAlarm;
		},
		logout(state) {
			const temp = state;
			temp.isValid = false;
		},
		setIsDark(state, action) {
			const temp = state;
			temp.isDark = action.payload;
		},
		setIsAlarm(state, action) {
			const temp = state;
			temp.isAlarm = action.payload;
		},
		setIsCycle(state, action) {
			const temp = state;
			temp.isCycle = action.payload;
		},
		setIsPurchase(state, action) {
			const temp = state;
			temp.isPurchase = action.payload;
		},
	},
});

// 액션 생성함수
export const { setUser, logout, setIsDark, setIsAlarm, setIsCycle, setIsPurchase } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
// 리듀서
export default userSlice.reducer;
