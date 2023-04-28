import type { Meta, StoryObj } from '@storybook/react';
import LoginButton from './LoginButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'button/loginButton',
	component: LoginButton,
	tags: ['autodocs'],
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} satisfies Meta<typeof LoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	args: {
		primary: true,
		label: 'loginButton',
	},
};
