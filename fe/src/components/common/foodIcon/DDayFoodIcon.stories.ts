import { Meta, StoryObj } from '@storybook/react';
import DDayFoodIcon from './DDayFoodIcon';

const meta = {
	title: 'common/DDayFoodIcon',
	component: DDayFoodIcon,
	tags: ['autodocs'],
	argTypes: {
		dDay: {
			defaultValue: 10,
		},
		icon: {
			defaultValue: '우유',
		},
	},
} satisfies Meta<typeof DDayFoodIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Green: Story = {
	args: {
		dDay: 100,
		icon: '캔디류',
	},
};
export const Yellow: Story = {
	args: {
		dDay: 4,
		icon: '햄',
	},
};
export const Red: Story = {
	args: {
		dDay: 2,
		icon: '과·채가공품',
	},
};
