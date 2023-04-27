import type { Meta, StoryObj } from '@storybook/react';
import FoodContent from './FoodContent';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'foods/foodContent',
	component: FoodContent,
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
			},
		},
	},
} satisfies Meta<typeof FoodContent>;

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
		},
	},
};
