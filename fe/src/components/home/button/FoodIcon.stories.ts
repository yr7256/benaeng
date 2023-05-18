import { Meta, StoryObj } from '@storybook/react';
import FoodIcon from './FoodIcon';

const meta = {
	title: 'home/FoodIcon',
	component: FoodIcon,
	tags: ['autodocs'],
} satisfies Meta<typeof FoodIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { dDay: 5, icon: '우유', id: 1, name: '서울우유' },
};
