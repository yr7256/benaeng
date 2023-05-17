import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from './hooks/useStore';
import { logout, selectUser, setUser } from './store/modules/user';
import { Analysis, BarcodeReader, FoodDetail, Home, Login, Notice, Setting } from './pages';
import { MonthlyReport, RefrigeratorCalendar, FoodAnalysis } from './components/analysis';
import { getUserData } from './apis/user';
import { removeCookie, setCookie } from './utils/cookie';
import Loading from './components/common/loading/Loading';

function App() {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const { refetch, isFetching } = useQuery(['login', user.accessToken], getUserData, {
		select: ({ data }) => {
			if (data.resultCode === '400') {
				removeCookie('accessToken');
				dispatch(logout());
			} else {
				setCookie('accessToken', data.data.accessToken);
				dispatch(setUser(data.data));
			}
			return true;
		},
		retry: 2,
		enabled: !!user.accessToken,
	});

	/** 라우터 */
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
			// loader: () => {
			// 	refetch();
			// 	return 0;
			// },
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
				{isFetching ? undefined : <Loading />}
				{user.accessToken ? <RouterProvider router={router} /> : <Login />}
			</div>
		</div>
	);
}

export default App;
