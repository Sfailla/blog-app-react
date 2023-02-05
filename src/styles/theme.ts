// export type ThemeType = typeof theme

export const theme = {
	light: {
		background: {
			primary: '#FFFFFF',
			secondary: '#112240',
			tertiary: '#122d5e',
			text: '#072f3a'
		},
		text: {
			primary: '#19202D',
			primaryLight: '#19202D',
			secondary: '#122d5e',
			secondaryLight: '#122d5e',
			heading: '#1f3b6f',
			gray: 'darkgray',
			comment: 'darkgray'
		},
		tag: {
			small: '#0085FF'
		},
		link: {
			main: '#0000EE',
			hover: '#8957e5'
		},
		button: {
			normal: '#122d5e',
			preview: '#000000'
		},
		border: {
			light: 'darkgray'
		}
	},
	dark: {
		background: {
			primary: '#060C20',
			secondary: '#112240',
			tertiary: '#122d5e',
			text: '#FFFFFF'
		},
		text: {
			primary: '#FFFFFF',
			primaryLight: '#d8d7d7',
			secondary: '#61B3FB',
			secondaryLight: '#64ffda',
			heading: '#FFFFFF',
			gray: '#19202D',
			comment: '#787878'
		},
		tag: {
			small: '#0085FF'
		},
		link: {
			main: '#8957e5',
			hover: '#0000EE'
		},
		button: {
			normal: '#0f8fff',
			preview: '#e9e9e9'
		},
		border: {
			light: '#464646'
		}
	}
} as const
