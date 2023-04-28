import type { Meta, StoryObj } from '@storybook/react';

import Modal from './Modal';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: 'common/Modal',
	component: Modal,
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
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Alert: Story = {
	args: {
		mode: 'alert',
		size: 'sm',
		label: 'Alert',
		open: true,
		children: undefined,
		submitText: '완료하기',
		onSubmit: () => {
			alert('완료');
		},
		onClose: () => {
			alert('여기에 open state를 false로 하는 이벤트를 넣어주세요');
		},
	},
};

export const Confirm: Story = {
	args: {
		mode: 'confirm',
		size: 'sm',
		label: 'confirm',
		open: true,
		children: undefined,
		submitText: '완료하기',
		onSubmit: () => {
			alert('완료');
		},
		onClose: () => {
			alert('여기에 open state를 false로 하는 이벤트를 넣어주세요');
		},
	},
};

export const Form: Story = {
	args: {
		mode: 'form',
		size: 'lg',
		label: 'Form',
		open: true,
		children: undefined,
		submitText: '완료하기',
		onSubmit: () => {
			alert('완료');
		},
		onClose: () => {
			alert('여기에 open state를 false로 하는 이벤트를 넣어주세요');
		},
	},
};
