import React from 'react';
import Input from '../../../common/input/Input';
import Category from '../../../../constants/category.json';
import { CategoryData } from '../../../../types';

const CategoryList: CategoryData[] = Category.data;

interface Props {
	foodCategoryId: number;
	setCategoryModal(bool: boolean): void;
}

function CategoryForm({ foodCategoryId, setCategoryModal }: Props) {
	const category = CategoryList.find(item => item.foodCategoryId === foodCategoryId) ?? {
		category: '',
		subCategory: '',
		foodCategoryId: -1,
	};

	const onChange = (value: string) => {
		if (value) setCategoryModal(true);
	};

	return (
		<div className="flex w-full gap-2" onClick={() => setCategoryModal(true)}>
			<Input
				icon="category"
				label="식품분류"
				type="text"
				disabled={undefined}
				value={category.category}
				setValue={onChange}
				className="flex-1 min-w-0"
			/>
			<Input
				icon="category"
				label="세부분류"
				type="text"
				disabled={undefined}
				value={category.subCategory}
				setValue={onChange}
				className="flex-1 min-w-0"
			/>
		</div>
	);
}

export default CategoryForm;
