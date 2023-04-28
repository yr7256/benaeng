import React, { useMemo } from 'react';
import CategoryData from '../../../../constants/category.json';
import { Category } from '../../../../types/FoodTypes';
import { matchKo } from '../../../../utils/string';
import CheckInput from '../../../common/input/CheckInput';

interface Props {
	/**
	 * 검색어
	 */
	search: string;
	/**
	 * 선택된 카테고리
	 */
	value: Category;
	/**
	 * 카테고리 선택 이벤트
	 */
	setValue(category: Category): void;
}

const category: Category[] = CategoryData.data;

function SearchCategorySelectList({ search, value, setValue }: Props) {
	const categoryList = useMemo<Category[]>(() => {
		return category.filter(item => matchKo(item.category, search) || matchKo(item.subCategory, search));
	}, [search]);

	if (!search)
		return (
			<div className="center w-full h-full flex-col gap-2 text-light/boldStroke dark:text-dark/boldStroke">
				<img src="/assets/common/search.svg" className="w-1/3 dark:opacity-30" alt="search" />
				검색어를 입력해주세요
			</div>
		);

	return (
		<ul className="component w-full h-full text-left flex flex-col gap-4 px-2 py-4 relative z-1 self-start">
			{categoryList.length ? (
				// 검색결과가 있는 경우
				categoryList.map(item => (
					<li key={item.id}>
						<CheckInput
							value={item.id === value.id}
							onToggle={() => {
								setValue({ ...item });
							}}
							disabled={undefined}
							className={undefined}
						>
							{item.category} <span className="text-green px-1">{'>'}</span> {item.subCategory}
						</CheckInput>
					</li>
				))
			) : (
				// 검색결과가 없는 경우
				<li className="center h-full flex-col gap-2 text-light/boldStroke dark:text-dark/boldStroke">
					<img src="/assets/common/empty-box.svg" className="w-1/3 dark:opacity-30" alt="empty-box" />
					검색 결과가 없습니다
				</li>
			)}
		</ul>
	);
}

export default SearchCategorySelectList;
