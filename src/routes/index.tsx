import { Button } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppThemeContext, useDrawerContext } from '../shared/contexts'

export const AppRoutes = () => {
  const { toggleDrawerOpen, isDrawerOpen } = useDrawerContext()
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>
        {isDrawerOpen  ? 'Esconder Menu' : 'Expandir Menu'}
      </Button>} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  )
}
