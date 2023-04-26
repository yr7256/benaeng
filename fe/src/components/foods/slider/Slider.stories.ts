import type { Meta, StoryObj } from '@storybook/react';
import Slider from './Slider';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'foods/slider',
	component: Slider,
	tags: ['autodocs'],
	argTypes: {
		count: {
			type: 'number',
			defaultValue: 15,
		},
		total: {
			type: 'number',
			defaultValue: 5,
		},
	},
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	args: {
		total: 15,
		count: 15,
	},
};

export const Secondary: Story = {
	args: {
		total: 15,
		count: 10,
	},
};

export const Large: Story = {
	args: {
		total: 15,
		count: 5,
	},
};

export const Small: Story = {
	args: {
		total: 15,
		count: 0,
	},
};
