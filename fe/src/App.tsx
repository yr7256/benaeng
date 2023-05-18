import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/useStore';
import { logout, selectUser, setUser } from './store/modules/user';
import { Analysis, BarcodeReader, FoodDetail, Home, Login, Notice, Setting } from './pages';
import { MonthlyReport, RefrigeratorCalendar, FoodAnalysis } from './components/analysis';
import { getUserData } from './apis/user';
import { removeCookie } from './utils/cookie';
import Loading from './components/common/loading/Loading';

function App() {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const { isLoading, mutate } = useMutation(async () => {
		try {
			const { data } = await getUserData();
			if (data.resultCode === '400') {
				localStorage.removeItem('accessToken');
				dispatch(logout());
			} else {
				localStorage.setItem('accessToken', data.data.accessToken);
				dispatch(setUser(data.data));
			}
		} catch (e) {
			removeCookie('accessToken');
			dispatch(logout());
		}
	});

	useEffect(() => {
		if (!user.accessToken) mutate();
	}, [user.accessToken]);

	/** 라우터 */
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home refetch={mutate} />,
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
				{isLoading ? <Loading /> : undefined}
				{localStorage.getItem('accessToken') || user.accessToken ? <RouterProvider router={router} /> : <Login />}
			</div>
		</div>
	);
}

export default App;
