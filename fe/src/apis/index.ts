import axios from 'axios';
import { BASE_URL, BASE_HTTP_URL } from '../constants/api';
import { getCookie } from '../utils/cookie';

// 공통 인스턴스
function getInstance() {
	const instance = axios.create({
		baseURL: `${BASE_URL}/api`,
		timeout: 2000,
		headers: {
			Authorization: `Bearer ${getCookie('accessToken')}`,
			'Access-Control-Allow-Origin': BASE_URL,
			'Content-Type': 'application/json',
		},
		withCredentials: true,
	});
	return instance;
}

export function getHttpInstance() {
	const instance = axios.create({
		baseURL: `${BASE_HTTP_URL}:8080/api`,
		timeout: 2000,
		headers: {
			Authorization: `Bearer ${getCookie('accessToken')}`,
			'Access-Control-Allow-Origin': BASE_HTTP_URL,
			'Content-Type': 'application/json',
		},
		withCredentials: true,
	});
	return instance;
}

export default getInstance;
