import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { BrowserRouter} from "react-router-dom";
import store from './store/store';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const persistor = persistStore(store);

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
			<PersistGate loading={null} persistor={persistor}>
				<React.StrictMode>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</React.StrictMode>
			</PersistGate>
		</Provider>
	</QueryClientProvider>,
);
