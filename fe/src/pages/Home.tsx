import React, { useState } from 'react';
import Accordion from '../components/common/accordion/Accordion';
import AlarmButton from '../components/common/button/AlarmButton';
import Logo from '../components/common/logo/Logo';
// import { useNavigate } from 'react-router';
import AddButton from '../components/home/button/AddButton';
import AnalysisButton from '../components/home/button/AnalysisButton';
import AddModal from '../components/home/modal/AddModal';

// 메인화면

function Home() {
	const [openAddModal, setOpenAddModal] = useState<boolean>(false);
	// const navigate = useNavigate();

	/**
	 * 추가 버튼 이벤트
	 */
	const onClickAddBtn = () => {
		// navigate('/barcode');
		setOpenAddModal(true);
	};

	return (
		<div className="px-6 pt-10 pb-40 max-w-screen-md mx-auto flex flex-col gap-4">
			{/* 헤더 */}
			<header className="flex justify-between mb-8">
				{/* 비냉 로고 */}
				<div className="flex items-center">
					<Logo type={1} />
					<h1 className="text text-2xl font-extrabold mx-2">비냉</h1>
				</div>

				{/* 알람버튼 */}
				<AlarmButton isAlarm={false} />
			</header>

			{/* 소비패턴 페이지 이동 버튼 */}
			<AnalysisButton />

			{/* 냉장고 소비기한 임박 식품 목록 */}
			<section className="mt-8">
				<Accordion primary label="소비기한 임박 식품" open>
					<div className="p-8 opacity-50">진행중...</div>
				</Accordion>
			</section>
			<hr className="stroke" />
			{/* 냉장고 식품 전체 목록 */}
			<section className="flex flex-col gap-4">
				<Accordion primary={undefined} label="가공식품" open>
					<div className="p-8 opacity-50">진행중...</div>
				</Accordion>
				<Accordion primary={undefined} label="육류" open>
					<div className="p-8 opacity-50">진행중...</div>
				</Accordion>
				<Accordion primary={undefined} label="유제품" open>
					<div className="p-8 opacity-50">진행중...</div>
				</Accordion>
			</section>

			{/* 식품 추가 버튼 */}
			<AddButton onClick={onClickAddBtn} className="fixed bottom-10 left-1/2 -translate-x-10 z-10" />
			<AddModal open={openAddModal} setClose={() => setOpenAddModal(false)} />
		</div>
	);
}

export default Home;
