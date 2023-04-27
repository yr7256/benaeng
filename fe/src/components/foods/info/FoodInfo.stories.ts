import type { Meta, StoryObj } from '@storybook/react';
import FoodInfo from './FoodInfo';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'foods/foodInfo',
	component: FoodInfo,
	tags: ['autodocs'],
	argTypes: {
		foodData: {
			defaultValue: {
				category: '유제품',
				subCategory: '우유',
				fname: '서울우유',
				total: 15,
				count: 5,
				startDate: '2023-04-19',
				endDate: '2023-04-30',
				weight: '18.5g',
				kcal: 85,
				purchase: 20,
				percent: 34,
				msg: [
					'우유을(를) 많이 소비하고 있어요',
					'소비기한 내 우유을(를) 소비하지 못하고 있어요',
					'더 작은 크기의 우유을(를) 구매해보세요!',
				],
				cycle: 22,
				preferProduct: ['파스퇴르 저온살균 흰우유', '서울우유 1급 A우유', '연세우유 연세대학교 전용목장 우유'],
			},
		},
	},
} satisfies Meta<typeof FoodInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	args: {
		foodData: {
			category: '유제품',
			subCategory: '우유',
			fname: '서울우유',
			total: 15,
			count: 5,
			startDate: '2023-04-19',
			endDate: '2023-04-30',
			weight: '18.5g',
			kcal: 85,
			purchase: 20,
			percent: 34,
			msg: [
				'우유을(를) 많이 소비하고 있어요',
				'소비기한 내 우유을(를) 소비하지 못하고 있어요',
				'더 작은 크기의 우유을(를) 구매해보세요!',
			],
			cycle: 22,
			preferProduct: ['파스퇴르 저온살균 흰우유', '서울우유 1급 A우유', '연세우유 연세대학교 전용목장 우유'],
		},
	},
};
