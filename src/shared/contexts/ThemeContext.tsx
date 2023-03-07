import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { ThemeProvider } from '@mui/material'

import { DarkTheme, LightTheme } from './../themes'
import { Box } from '@mui/system'

interface IAppThemeContextData {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

interface IAppThemeProviderProps {
  children: React.ReactNode
}
//context
const AppThemeContext = createContext({} as IAppThemeContextData)

//hook
export const useAppThemeContext = () => {
  return useContext(AppThemeContext)
}
//context provider
// eslint-disable-next-line react/prop-types
export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {

  const [themeName, setThemeName] = useState<'light' | 'dark'>('light')

  const toggleTheme = useCallback(() => {
    setThemeName(themeName => themeName === 'light' ? 'dark' : 'light')
  }, [])

  const theme = useMemo(() => {
    if (themeName === 'light') {
      return LightTheme
    } else {
      return DarkTheme
    }
  }, [themeName])

  return (
    <AppThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </AppThemeContext.Provider>
  )
}

