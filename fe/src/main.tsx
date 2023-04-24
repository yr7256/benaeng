import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { BrowserRouter} from "react-router-dom";
import store from './store/store';
import './index.css';

export const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<React.StrictMode>
				<BrowserRouter>
				<App />
				</BrowserRouter>
			</React.StrictMode>
		</PersistGate>
	</Provider>

