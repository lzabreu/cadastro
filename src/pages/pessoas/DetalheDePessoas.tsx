import { LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FerramentasDeDetalhe } from '../../shared/components'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService'

export const DetalheDePessoas = () => {
  const { id = 'nova' } = useParams<'id'>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState('')


  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true)
      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false)
          if (result instanceof Error) {
            alert(result.message)
            navigate('/pessoas')
          } else {
            setNome(result.nomeCompleto)
            console.log(result)
          }
        })
    }

  }, [id])

  const handleSave = () => {
    console.log('Save')
  }
  const handleDelete = (id: number) => {
    if (confirm('Quer Apagar?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            alert('Registro apagado com sucesso.')
            navigate('/pessoas')
          }
        })
    }
  }
  const handleSaveAndClose = () => {
    console.log('SaveAndClose')
  }

  return (
    <LayoutBaseDePagina title={id === 'nova' ? 'Nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          titleNewButton='Nova'
          showSaveAndCloseButton
          showDeleteButton={id !== 'nova'}
          showNewButton={id !== 'nova'}
          onClickSave={handleSave}
          onClickSaveAndClose={handleSaveAndClose}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => navigate('/pessoas/detalhe/nova')}
          onClickBack={() => navigate('/pessoas/')}


        />

      }>
      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}

      <div>DetalheDePessoas {id}</div>
    </LayoutBaseDePagina>
  )
}
