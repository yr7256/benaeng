import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from './hooks/useStore';
import { selectUser, setUser } from './store/modules/user';
import { Analysis, BarcodeReader, FoodDetail, Home, Login, Notice, Setting } from './pages';
import { MonthlyReport, RefrigeratorCalendar, FoodAnalysis } from './components/analysis';
import { getUserData } from './apis/user';
import { getCookie, setCookie } from './utils/cookie';
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
		enabled: !!getCookie('accessToken') && !user.isValid,
		retry: 1,
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

	if (!user.isValid) {
		return (
			<div className={`App ${userInfo.isDark ? 'dark' : ''}`}>
				<div className="w-screen h-screen overflow-x-hidden overflow-y-auto Page background">
					{userQuery.isFetching ? <Loading /> : undefined}
					<Login />
				</div>
			</div>
		);
	}

	return (
		<div className={`App ${userInfo.isDark ? 'dark' : ''}`}>
			<div className="w-screen h-screen overflow-x-hidden overflow-y-auto Page background">
				<RouterProvider router={router} />
			</div>
		</div>
	);
}

export default App;
