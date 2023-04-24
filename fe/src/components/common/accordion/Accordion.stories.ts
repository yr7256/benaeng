import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './Accordion';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'Example/Accordion',
	component: Accordion,
	tags: ['autodocs'],
	argTypes: {
		label: {
			defaultValue: '유제품',
			type: {
				name: 'string',
				required: true,
			},
		},
		open: {
			defaultValue: 'true',
			type: 'boolean',
		},
	},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	args: {
		primary: true,
		label: 'Accordion',
	},
};

export const Default: Story = {
	args: {
		label: 'Accordion',
	},
};
