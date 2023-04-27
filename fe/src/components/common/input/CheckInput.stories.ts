import type { Meta, StoryObj } from '@storybook/react';

import CheckInput from './CheckInput';

const meta = {
	title: 'common/CheckInput',
	component: CheckInput,
	tags: ['autodocs'],
} satisfies Meta<typeof CheckInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: '소비기한',
		value: false,
		onToggle() {
			alert('클릭시 value를 반전시키는 이벤트를 추가해주세요');
		},
	},
};
