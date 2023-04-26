import type { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'logo/logo',
	component: Logo,
	tags: ['autodocs'],
	argTypes: {
		type: {
			type: 'number',
			defaultValue: 0,
		},
	},
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	args: {
		type: 0,
	},
};

export const Secondary: Story = {
	args: {
		type: 1,
	},
};
