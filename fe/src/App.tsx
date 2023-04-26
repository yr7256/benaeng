import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Analysis, BarcodeReader, FoodDetail, Home, Login, Notice, Setting } from './pages';
import { MonthlyReport, RefrigeratorCalendar, FoodAnalysis } from './components/analysis';

function App() {
	return (
		<div className="App dark">
			<div className="w-screen h-screen dark:bg-dark/background bg-light/background">
				<Routes>
					<Route index path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/foods/:id" element={<FoodDetail />} />
					<Route path="/foods/barcode" caseSensitive element={<BarcodeReader />} />
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
