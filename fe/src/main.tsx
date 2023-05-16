import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import store from './store/store';
import './index.css';

// 데이터가 stale 상태일 때 윈도우 포커싱 돼도 refetch 실행 x
const client = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<QueryClientProvider client={client}>
		<Provider store={store}>
			<React.StrictMode>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</React.StrictMode>
		</Provider>
	</QueryClientProvider>,
);
