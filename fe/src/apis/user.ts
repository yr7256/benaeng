import axios, { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL, CACHE_TIME, SOCIAL, STALE_TIME } from '../constants/api';

export const useGetSocial = (code: string) => {
	//   요청 url
	const queryKey = `${BASE_URL}${SOCIAL}/${code}`;
	//   axios 요청
	const queryFn = axios.get(queryKey).then(res => res.data);

	const { isLoading, data, isError, error } = useQuery<AxiosResponse, AxiosError>([SOCIAL], () => queryFn, {
		keepPreviousData: true,
		staleTime: STALE_TIME,
		cacheTime: CACHE_TIME,
	});

	return { isLoading, data, isError, error };
};

export default useGetSocial;
