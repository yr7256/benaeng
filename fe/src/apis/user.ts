import instance from '.';

const SOCIAL_API = '/social';

export function useGetSocial(code: string) {
	return instance.get(`${SOCIAL_API}/${code}`);
}

export default useGetSocial;
