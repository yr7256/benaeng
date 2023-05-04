import axios from 'axios';
import { BASE_URL } from '../constants/api';

// 공통 인스턴스
const instance = axios.create({
	baseURL: `${BASE_URL}/api`,
	timeout: 2000,
	headers: {
		'Access-Control-Allow-Origin': BASE_URL,
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export default instance;
