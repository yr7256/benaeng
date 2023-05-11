import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from './hooks/useStore';
import { selectUser, setUser } from './store/modules/user';
import { Analysis, BarcodeReader, FoodDetail, Home, Login, Notice, Setting } from './pages';
import { MonthlyReport, RefrigeratorCalendar, FoodAnalysis } from './components/analysis';
import { getUserData } from './apis/user';
import { setCookie } from './utils/cookie';
import Loading from './components/common/loading/Loading';

function App() {
	const userInfo = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const userQuery = useQuery(['login', user.isValid], getUserData, {
		select: ({ data }) => {
			setCookie('accessToken', data.data.accessToken);
			dispatch(setUser(data.data));
		},
		enabled: !user.isValid,
	});

	if (userQuery.isLoading) {
		return (
			<div className={`App ${userInfo.isDark ? 'dark' : ''}`}>
				<div className="Page w-screen h-screen overflow-x-hidden overflow-y-auto background">
					<Loading />
				</div>
			</div>
		);
	}

	if (!user.isValid) {
		return (
			<div className={`App ${userInfo.isDark ? 'dark' : ''}`}>
				<div className="Page w-screen h-screen overflow-x-hidden overflow-y-auto background">
					<Login />
				</div>
			</div>
		);
	}

	return (
		<div className={`App ${userInfo.isDark ? 'dark' : ''}`}>
			<div className="Page w-screen h-screen overflow-x-hidden overflow-y-auto background">
				<Routes>
					<Route index path="/" element={<Home />} />
					<Route path="/foods/:id" element={<FoodDetail />} />
					<Route path="/barcode" caseSensitive element={<BarcodeReader />} />
					<Route path="/analysis/:type" element={<Analysis />}>
						<Route path="report" element={<MonthlyReport />} />
						<Route path="calendar" element={<RefrigeratorCalendar />} />
						<Route path="food" element={<FoodAnalysis />} />
					</Route>
					<Route path="/notice" element={<Notice />} />
					<Route path="/setting" element={<Setting />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
