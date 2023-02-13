import {
	ReactNode,
	useContext,
	createContext,
	useMemo,
	useState,
	Dispatch,
	SetStateAction,
	ReactElement
} from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { Mode } from '../types/shared'

interface Context {
	mode: Mode
	setMode: Dispatch<SetStateAction<Mode>>
}

const ThemeContext = createContext<Context | null>(null)

export function useThemeContext() {
	const context = useContext(ThemeContext)

	if (!context) {
		throw new Error('`useContext` must be used within a AppContextProvider')
	}

	return context
}

const prefersDark = '(prefers-color-scheme: dark)'
const getPreferredTheme = (): Mode => (window.matchMedia(prefersDark).matches ? 'dark' : 'light')

interface Props {
	children: ReactNode
}

export function ThemeProvider({ children }: Props): ReactElement {
	const [mode, setMode] = useState<Mode>(getPreferredTheme())

	const contextValues: Context = useMemo(() => ({ mode, setMode }), [mode, setMode])

	const themeMode = theme[mode]

	return (
		<ThemeContext.Provider value={contextValues}>
			<StyledThemeProvider theme={themeMode}>{children}</StyledThemeProvider>
		</ThemeContext.Provider>
	)
}
