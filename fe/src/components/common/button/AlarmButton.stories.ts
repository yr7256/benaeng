import type { Meta, StoryObj } from '@storybook/react';
import AlarmButton from './AlarmButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'button/alarmButton',
	component: AlarmButton,
	tags: ['autodocs'],
	argTypes: {
		isAlarm: {
			type: 'boolean',
			defaultValue: false,
		},
	},
} satisfies Meta<typeof AlarmButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	args: {
		isAlarm: false,
	},
};

export const Secondary: Story = {
	args: {
		isAlarm: true,
	},
};
