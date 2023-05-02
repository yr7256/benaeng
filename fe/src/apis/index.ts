import axios from 'axios';
import { BASE_URL } from '../constants/api';

// 공통 인스턴스
const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 2000,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default instance;
