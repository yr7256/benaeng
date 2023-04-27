import type { Meta, StoryObj } from '@storybook/react';
import Alarm from './Alarm';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'notice/alarm',
	component: Alarm,
	tags: ['autodocs'],
	argTypes: {
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
		id: {
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
		food: '아이스크림',
		type: 0,
		day: 0,
		id: 0,
	},
};

export const Warning: Story = {
	args: {
		food: '과자',
		type: 1,
		day: 3,
		id: 0,
	},
};

export const Danger: Story = {
	args: {
		food: '빵류',
		type: 2,
		day: 0,
		id: 0,
	},
};
