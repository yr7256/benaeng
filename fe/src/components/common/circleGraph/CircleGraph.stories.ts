import type { Meta, StoryObj } from '@storybook/react';

import CircleGraph from './CircleGraph';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'graph/CircleGraph',
	component: CircleGraph,
	tags: ['autodocs'],
	argTypes: {
		reverse: {
			type: 'boolean',
			defaultValue: false,
		},
		size: {
			type: 'string',
			description: "'sm' | 'mid' | 'lg'",
			defaultValue: 'mid',
		},
		percent: {
			type: 'number',
			defaultValue: 0.9,
		},
	},
} satisfies Meta<typeof CircleGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Reverse: Story = {
	args: {
		reverse: true,
		percent: 0.23,
		size: 'mid',
	},
};

export const Small: Story = {
	args: {
		reverse: false,
		percent: 0.25,
		size: 'sm',
	},
};

export const Middle: Story = {
	args: {
		reverse: false,
		percent: 0.62,
		size: 'mid',
	},
};

export const Large: Story = {
	args: {
		reverse: false,
		percent: 0.95,
		size: 'lg',
	},
};
