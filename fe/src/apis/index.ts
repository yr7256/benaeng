import axios from 'axios';
import { BASE_URL } from '../constants/api';

// 공통 인스턴스
function getInstance() {
	const instance = axios.create({
		baseURL: `${BASE_URL}/api`,
		timeout: 2000,
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
		timeout: 2000,
		headers: {
			'Access-Control-Allow-Origin': BASE_URL,
			'Content-Type': 'application/json',
		},
		withCredentials: true,
	});
	return instance;
}

export default getInstance;
