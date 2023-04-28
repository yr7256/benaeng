import type { Meta, StoryObj } from '@storybook/react';

import Accordion from './Accordion';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'common/Accordion',
	component: Accordion,
	tags: ['autodocs'],
	argTypes: {
		label: {
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
		open: true,
		children: undefined,
	},
};

export const Default: Story = {
	args: {
		primary: false,
		label: 'Accordion',
		open: true,
		children: undefined,
	},
};
