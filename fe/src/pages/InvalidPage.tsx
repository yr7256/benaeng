import React from 'react';
import BackButton from '../components/common/button/BackButton';

function InvalidPage() {
	return (
		<div className="center flex-col h-full text">
			<BackButton className="absolute top-0 left-0 p-4 m-4" />
			<img className="hidden dark:visible" src="/assets/dark/empty-refrigerator.svg" alt="빈 냉장고 아이콘" />
			<img className="dark:hidden visible" src="/assets/light/empty-refrigerator.svg" alt="빈 냉장고 아이콘" />
			<p className="text-2xl font-bold my-2 text">이런!</p>
			<p className="text-base text">이미 삭제되거나 없는 식품입니다</p>
			<p className="text-xs text-light/boldStroke dark:text-dark/boldStroke">404 - NOT FOUND</p>
		</div>
	);
}

export default InvalidPage;
