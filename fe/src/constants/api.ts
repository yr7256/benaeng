export const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
export const REDIRECT_URI = 'http://localhost:3000/login';

// 기본 base 경로
export const BASE_URL = 'https://k8b205.p.ssafy.io/api';

// 토큰 받기
export const SOCIAL = '/social';
// 사용자 정보 조회
export const USER = '/user';

// stale time
export const STALE_TIME = 1000 * 60 * 5;
// cache time
export const CACHE_TIME = 1000 * 60 * 20;
