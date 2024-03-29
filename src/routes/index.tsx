import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard, DetalheDeCidades, DetalheDePessoas, ListagemDeCidades, ListagemDePessoas } from '../pages'
import { useDrawerContext } from '../shared/contexts'

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext()
useEffect(()=>{
  setDrawerOptions([
    {
      icon: 'home',
      label: 'Página Inicial',
      path: '/pagina-inicial'
    },
    {
      icon: 'location_city',
      label: 'Cidades',
      path: '/cidades'
    },
    {
      icon: 'people',
      label: 'Pessoas',
      path: '/pessoas'
    },
    
  ])
},[])

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />
      
      <Route path="/cidades" element={<ListagemDeCidades />} />
      <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  )
}
