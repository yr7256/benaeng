import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
	const { isFetching, refetch } = useQuery(['login', user.accessToken], getUserData, {
		onError: () => {
			removeCookie('accessToken');
			dispatch(logout());
		},
		select: ({ data }) => {
			if (data.resultCode === '400') {
				localStorage.removeItem('accessToken');
				dispatch(logout());
			} else {
				console.log('setUser');
				localStorage.setItem('accessToken', data.data.accessToken);
				dispatch(setUser(data.data));
			}
			return true;
		},
		retry: 2,
		enabled: !user.accessToken,
	});

	/** 라우터 */
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home refetch={refetch} />,
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
				{isFetching ? <Loading /> : undefined}
				{user.accessToken ? <RouterProvider router={router} /> : <Login />}
			</div>
		</div>
	);
}

export default App;
