import React, { useState } from 'react';
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
		<div className="flex-col">
			<AnalysisButton />
			<AddButton onClick={onClickAddBtn} className="fixed bottom-10 left-1/2 -translate-x-10 z-10" />
			<AddModal open={openAddModal} setClose={() => setOpenAddModal(false)} />
		</div>
	);
}

export default Home;
