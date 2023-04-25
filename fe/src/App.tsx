import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import { Analysis, BarcodeReader, FoodDetail, Home, Login, Notice, Setting } from './pages';
import { Report, Calendar, FoodAnalysis } from './components/analysis';

function App() {
	return (
		<div className="App">
			<div className="h-screen w-screen dark:bg-dark/background bg-light/background">
				<Routes>
					<Route index path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/foods/:id" element={<FoodDetail />} />
					<Route path="/foods/barcode" caseSensitive element={<BarcodeReader />} />
					<Route path="/analysis/:type" element={<Analysis />}>
            <Route path="report" element={<Report />} />
            <Route path="calendar" element={<Calendar />} />
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
