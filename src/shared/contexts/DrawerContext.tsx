import { createContext, useCallback, useContext, useState } from 'react'

interface IDrawerContextData {
  isDrawerOpen: boolean
  toggleDrawerOpen: () => void
}

interface IDrawerProps {
  children: React.ReactNode
}
//context
const DrawerContext = createContext({} as IDrawerContextData)

//hook
export const useDrawerContext = () => {
  return useContext(DrawerContext)
}
//context provider
// eslint-disable-next-line react/prop-types
export const DrawerProvider: React.FC<IDrawerProps> = ({ children }) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(isDrawerOpen => !isDrawerOpen)
  }, [])

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  )
}

