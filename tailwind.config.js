/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			'380': '380px',
			'390': '390px',
			xxs: '280px',
			xs: '360px',
			xsm: '412px',
			xxx: '440px',
			sm: '480px',
			smsm: '510px',
			smd: '540px',
			sms: '580px',
			smmd: '600px',
			smax: '680px',
			md: '768px',
			mdxs: '800px',
			mdsm: '860px',
			mdsmax: '900px',
			mdlg: '930px',
			lg: '976px',
			xlg: '992px',
			bigLg: '1024px',
			fity: '1026px',
			extraLg: '1090px',
			extraExtra: '1120px',
			large: '1170px',
			exl: '1280px',
			topXl: '1300px',
			pcXl: '1360px',
			extraXl: '1450px'
		},
		extend: {
			colors: {
				sideNavLink: '#A8A8A8',
				DARKBG: '#212121',
				BODYBG: '#e9e9e9',
				BODYDARKBG: '#181818',
				DARKTEXT: '#808080',
				talkOrTweet: '#f5f7f9',
				purple: '#3D217A',
				pink: '#EC6A87',
				purple2: '#D60DE8',
				offwhiteBg: '#f8f8f8',
				productBg: '#f3f3f3',
				offwhite: '#F9F9F9',
				darkpink: '#FE34E6',
				darkblue: '#000425',
				lightblue: '#6A40F9',
				sphereblue: '#10CBFF',
				anothersphereblue: '#01C8FF',
				tweetblue: '#00103A',
				blue: '#244CB4',
				red: '#E3111E',
				grey: '#A9A2A2',
				mistyRose: '#E1AFB5',
				lightGrayishBlue: '#F4F5F4',
				inputDark: '#1e1e1e',
				darkBg: '#1e1e1e',
				darkGray: '#adadad',
				mainTextDark: '#b4b4b6',
				smallTextDark: '#4f4f4f',
				smallText: '#FAFAFA',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("daisyui"), require("tailwindcss-animate")],
};

