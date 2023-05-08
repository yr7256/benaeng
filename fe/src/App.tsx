import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './hooks/useStore';
import { selectUser } from './store/modules/user';
import { Analysis, BarcodeReader, FoodDetail, Home, Login, Notice, Setting } from './pages';
import { MonthlyReport, RefrigeratorCalendar, FoodAnalysis } from './components/analysis';

function App() {
	const userInfo = useAppSelector(selectUser);
	return (
		<div className={`App ${userInfo.isDark ? 'dark' : ''}`}>
			<div className="Page w-screen h-screen overflow-x-hidden overflow-y-auto background">
				<Routes>
					<Route index path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
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
