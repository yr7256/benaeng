/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./home.tsx', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			maxWidth: {
				'88': '22rem',
				'60': '15rem',
			},
			width: {
				'88': '22rem',
			},
			fontFamily: {
				sans: ['NanumSquareNeo-Variable'],
			},
			colors: {
				green: '#00C981',
				yellow: '#FFC702',
				red: '#FF004D',
				skyBlue: '#A8DAF7',
				paleyellow: '#FFF0BB',
				blue: '#00A3FF',
				pink: '#FF7373',
				black: '#000000',
				white: '#FFFFFF',
				gray: '#EEEEEE',
				kakao: '#FFC329',
				'dark/background': '#000000',
				'dark/component': '#202020',
				'dark/stroke': '#444444',
				'dark/boldStroke': '#AAAAAA',
				'dark/text': '#FFFFFF',
				'light/background': '#F8F8F8',
				'light/component': '#FFFFFF',
				'light/stroke': '#EEEEEE',
				'light/boldStroke': '#AAAAAA',
				'light/text': '#000000',
			},
		},
	},
	plugins: [],
};
