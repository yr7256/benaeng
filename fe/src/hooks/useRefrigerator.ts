import { useQuery } from '@tanstack/react-query';
import { throttle } from 'lodash';
import { useState } from 'react';
import { getFoodList } from '../apis/foods';
import { selectBarcode } from '../store/modules/barcode';
import { FoodData } from '../types';
import { useAppSelector } from './useStore';

type ReturnType = [string, (search: string) => void, boolean, FoodData[] | undefined];

const debounceFoodList = throttle(getFoodList, 3000);

function useRefrigerator(): ReturnType {
	const [search, setSearch] = useState<string>('');
	const barcode = useAppSelector(selectBarcode);
	const { isFetching, data } = useQuery(['foodList', barcode.status], debounceFoodList, {
		keepPreviousData: true,
		select: res => res?.data.data,
	});

	return [search, setSearch, isFetching, data];
}

export default useRefrigerator;
