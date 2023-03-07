import { createContext, useCallback, useContext, useState } from 'react'

interface IDrawerContextData {
  isDrawerOpen: boolean
  drawerOptions: IDrawerOptions[]
  toggleDrawerOpen: () => void
  setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void
}

interface IDrawerProps {
  children: React.ReactNode
}

interface IDrawerOptions {
  path: string
  icon: string
  label: string
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
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([])


  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(isDrawerOpen => !isDrawerOpen)
  }, [])

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
    setDrawerOptions(newDrawerOptions)
  }, [])

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  )
}

