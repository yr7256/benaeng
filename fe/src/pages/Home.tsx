import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import AlarmButton from '../components/home/button/AlarmButton';
import Logo from '../components/common/logo/Logo';
import AddButton from '../components/home/button/AddButton';
import AnalysisButton from '../components/home/button/AnalysisButton';
import SettingButton from '../components/home/button/SettingButton';
import SearchBar from '../components/home/search/SearchBar';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { resetBarcodeData, selectBarcode } from '../store/modules/barcode';
import FoodList from '../components/home/foodList/FoodList';
import WarningFoodList from '../components/home/foodList/WarningFoodList';
import ExpiredFoodList from '../components/home/foodList/ExpiredFoodList';
import AddModal from '../components/home/modal/addModal/AddModal';
import { getFoodList } from '../apis/foods';

declare global {
	interface Window {
		flutter_inappwebview: {
			callHandler: (handlerName: string, ...args: any[]) => Promise<any>;
		};
	}
}

// 메인화면
function Home() {
	const [search, setSearch] = useState<string>('');
	const barcode = useAppSelector(selectBarcode);
	const { data, isFetching } = useQuery(['foodList', barcode.status], getFoodList, {
		select: res => res?.data.data,
	});
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	/** 추가 버튼 이벤트 */
	const onClickAddBtn = () => {
		navigate('/barcode');
	};

	return (
		<div className="px-6 pt-10 pb-40 max-w-screen-md mx-auto flex flex-col gap-4">
			{/* 헤더 */}
			<header className="flex justify-between mb-8">
				{/* 비냉 로고 */}
				<div className="flex items-center">
					<Logo type={1} />
				</div>

				{/* 알람버튼 */}
				<div>
					<SettingButton />
					<AlarmButton isAlarm={false} />
				</div>
			</header>
			{/* 소비패턴 페이지 이동 버튼 */}
			<AnalysisButton />

			{/* 냉장고 소비기한 임박 식품 목록 */}
			<section className="mt-8 flex flex-col gap-4">
				<ExpiredFoodList data={data} />
				<WarningFoodList data={data} />
				<hr className={`stroke ${data ? '' : 'hidden'}`} />
			</section>

			{/* 냉장고 식품 전체 목록 */}
			<section className="flex flex-col gap-4">
				<SearchBar value={search} setValue={setSearch} className={data ? '' : 'hidden'} />
				<FoodList data={data} isFetching={isFetching} search={search} />
			</section>

			{/* 식품 추가 버튼 */}
			<AddButton onClick={onClickAddBtn} className="fixed bottom-10 left-1/2 -translate-x-10 z-10" />
			<AddModal open={barcode.status === 'success'} setClose={() => dispatch(resetBarcodeData())} />
		</div>
	);
}

export default Home;
