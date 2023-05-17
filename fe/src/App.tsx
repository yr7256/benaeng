import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from './hooks/useStore';
import { logout, selectUser, setUser } from './store/modules/user';
import { Analysis, BarcodeReader, FoodDetail, Home, Login, Notice, Setting } from './pages';
import { MonthlyReport, RefrigeratorCalendar, FoodAnalysis } from './components/analysis';
import { getUserData } from './apis/user';
import { getCookie, removeCookie, setCookie } from './utils/cookie';
import Loading from './components/common/loading/Loading';

function App() {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const userQuery = useQuery(['authUser'], getUserData, {
		onError: () => {
			removeCookie('accessToken');
			dispatch(logout());
		},
		select: ({ data }) => {
			if (data.resultCode === '400') {
				removeCookie('accessToken');
				dispatch(logout());
			} else {
				setCookie('accessToken', data.data.accessToken);
				dispatch(setUser(data.data));
			}
		},
		retry: 2,
		enabled: !!getCookie('accessToken') && !user.isValid,
	});

	/** 라우터 */
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
			loader: () => {
				userQuery.refetch();
				return 0;
			},
		},
		{
			path: '/foods/:id',
			element: <FoodDetail />,
		},
		{
			path: '/barcode',
			element: <BarcodeReader />,
		},
		{
			path: '/analysis/:type',
			element: <Analysis />,
			children: [
				{
					path: 'report',
					element: <MonthlyReport />,
				},
				{
					path: 'calendar',
					element: <RefrigeratorCalendar />,
				},
				{
					path: 'food',
					element: <FoodAnalysis />,
				},
			],
		},
		{
			path: '/notice',
			element: <Notice />,
		},
		{
			path: '/setting',
			element: <Setting />,
		},
	]);

	return (
		<div className={`App ${user.isDark ? 'dark' : ''}`}>
			<div className="w-screen h-screen overflow-x-hidden overflow-y-auto Page background">
				{userQuery.data ? <Loading /> : undefined}
				{!getCookie('accessToken') && !user.isValid ? <Login /> : <RouterProvider router={router} />}
			</div>
		</div>
	);
}

export default App;
