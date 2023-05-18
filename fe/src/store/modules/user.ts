import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { usePutUser } from '../../apis/user';
import { RootState } from '../store';

// state type
export interface userSlice {
	accessToken: string;
	isDark: boolean;
	isAlarm: boolean;
	isCycle: boolean;
	isPurchase: boolean;
	newAlarm: boolean;
}

// 초기 상태 정의
const initialState: userSlice = {
	accessToken: '',
	isDark: false,
	isAlarm: true,
	isCycle: true,
	isPurchase: true,
	newAlarm: false,
};

export const updateUser = createAsyncThunk('user/update', async (user: userSlice) => {
	await usePutUser(user);
	return user;
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			const temp = state;
			temp.accessToken = action.payload.accessToken;
			temp.isDark = action.payload.isDark;
			temp.isAlarm = action.payload.isAlarm;
			temp.isCycle = action.payload.isCycle;
			temp.isPurchase = action.payload.isPurchase;
			temp.newAlarm = action.payload.newAlarm;
		},
		logout(state) {
			const temp = state;
			temp.accessToken = '';
		},
		setIsDark(state, action) {
			console.log('다크모드 reducer');
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
	extraReducers(builder: ActionReducerMapBuilder<userSlice>) {
		builder.addCase(updateUser.fulfilled, (state, { payload }) => {
			const temp = state;
			temp.isAlarm = payload.isAlarm;
			temp.isCycle = payload.isCycle;
			temp.isPurchase = payload.isPurchase;
			temp.isDark = payload.isDark;
		});
	},
});

// 액션 생성함수
export const { setUser, logout, setIsDark, setIsAlarm, setIsCycle, setIsPurchase } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
// 리듀서
export default userSlice.reducer;
