/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./home.tsx', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			keyframes: {
				wiggle: {
					'0%': { transform: 'rotate(-25deg)' },
					'40%': { transform: 'rotate(0deg)' },
					'50%': { transform: 'rotate(-10deg)' },
					'60%': { transform: 'rotate(0deg)' },
					'70%': { transform: 'rotate(-5deg)' },
					'85%': { transform: 'rotate(0deg)' },
					'95%': { transform: 'rotate(-2deg)' },
					'100%': { transform: 'rotate(0deg)' },
				},
			},
			animation: {
				wiggle: 'wiggle 1s ease-in-out',
			},
			borderRadius: {
				'8': '2rem',
				'2.5xl': '1.25rem',
			},
			maxWidth: {
				'30': '7.5rem',
				'88': '22.875rem',
				'60': '15rem',
			},
			width: {
				'30': '7.5rem',
				'38': '9.5rem',
				'76': '19rem',
				'88': '22.875rem',
			},
			height: {
				'22': '5.5rem',
				'160': '40rem',
			},
			padding: {
				'18': '4.5rem',
			},
			fontFamily: {
				sans: ['NanumSquareNeo-Variable'],
			},
			fontSize: {
				xxs: ['10px', '12px'],
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
