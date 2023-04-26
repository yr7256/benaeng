import type { Meta, StoryObj } from '@storybook/react';

import AddButton from './AddButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'home/AddButton',
	component: AddButton,
	tags: ['autodocs'],
} satisfies Meta<typeof AddButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
	args: {
		onClick: () => alert('click!'),
	},
};
