import type { Meta, StoryObj } from '@storybook/react';
import FoodIcon from './FoodIcon';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'common/foodIcon',
	component: FoodIcon,
	tags: ['autodocs'],
	argTypes: {
		food: {
			type: 'string',
			defaultValue: 'milk',
		},
	},
} satisfies Meta<typeof FoodIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	args: {
		food: 'milk',
	},
};

export const Secondary: Story = {
	args: {
		food: 'cucumber',
	},
};
