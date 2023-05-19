import { Meta, StoryObj } from '@storybook/react';
import SettingButton from './SettingButton';

const meta = {
	title: 'home/SettingButton',
	component: SettingButton,
	tags: ['autodocs'],
} satisfies Meta<typeof SettingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
