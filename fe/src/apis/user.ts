import axios from 'axios';
import { BASE_URL, SOCIAL } from '../constants/api';

export const useGetSocial = (code: string) => {
	//   요청 url
	const queryKey = `${BASE_URL}${SOCIAL}/${code}`;
	//   axios 요청
	const queryFn = axios.get(queryKey).then(res => res.data);

	return queryFn;
};

export default useGetSocial;
