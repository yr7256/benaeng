import { Meta, StoryObj } from '@storybook/react';
import SearchBar from './SearchBar';

const meta = {
	title: 'home/SearchBar',
	component: SearchBar,
	tags: ['autodocs'],
	argTypes: {
		value: {
			defaultValue: '',
			type: 'string',
		},
	},
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: '',
		setValue(value) {
			alert(value);
		},
		className: undefined,
	},
};
