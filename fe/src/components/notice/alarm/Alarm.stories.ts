import type { Meta, StoryObj } from '@storybook/react';
import Alarm from './Alarm';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'notice/alarm',
	component: Alarm,
	tags: ['autodocs'],
	argTypes: {
		name: {
			type: 'string',
			defaultValue: '서울우유',
		},
		food: {
			type: 'string',
			defaultValue: '우유',
		},
		type: {
			type: 'number',
			defaultValue: 0,
		},
		day: {
			type: 'number',
			defaultValue: 1,
		},
		foodId: {
			type: 'number',
			defaultValue: 0,
		},
	},
} satisfies Meta<typeof Alarm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Buy: Story = {
	args: {
		name: '보석바',
		food: 10,
		type: 0,
		day: 0,
		foodId: 0,
	},
};

export const Warning: Story = {
	args: {
		name: '꼬깔콘',
		food: 5,
		type: 1,
		day: 3,
		foodId: 0,
	},
};

export const Danger: Story = {
	args: {
		name: '식빵',
		food: 2,
		type: 2,
		day: 0,
		foodId: 0,
	},
};
