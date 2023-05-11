import axios from 'axios';
import { BASE_URL } from '../constants/api';
import { getCookie } from '../utils/cookie';

// 공통 인스턴스
function getInstance() {
	const instance = axios.create({
		baseURL: `${BASE_URL}/api`,
		timeout: 400,
		headers: {
			Authorization: `Bearer ${getCookie('accessToken')}`,
			'Access-Control-Allow-Origin': BASE_URL,
			'Content-Type': 'application/json',
		},
		withCredentials: true,
	});
	return instance;
}
// 인스턴스 without Authorization header
export function getInstanceWithoutAuth() {
	const instance = axios.create({
		baseURL: `${BASE_URL}/api`,
		timeout: 800,
		headers: {
			'Access-Control-Allow-Origin': BASE_URL,
			'Content-Type': 'application/json',
		},
		withCredentials: true,
	});
	return instance;
}

export default getInstance;
