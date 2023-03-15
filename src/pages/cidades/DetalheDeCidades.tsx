import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { FerramentasDeDetalhe } from '../../shared/components'
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { CidadesService } from '../../shared/services/api/cidades/CidadesService'

interface IFormData {
  nome: string
}
const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),
 
})

export const DetalheDeCidades = () => {
  const { id = 'nova' } = useParams<'id'>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState('')
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm()

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true)
      CidadesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false)
          if (result instanceof Error) {
            alert(result.message)
            navigate('/cidades')
          } else {
            setNome(result.nome)
            formRef.current?.setData(result)
          }
        })
    } else {
      formRef.current?.setData({
        nome: '',
      })
    }

  }, [id])

  const handleSave = (dados: IFormData) => {

    formValidationSchema.validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true)
        if (id === 'nova') { //salvando
          CidadesService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false)
              if (result instanceof Error) {
                alert(result.message)
              } else {
                if (isSaveAndClose()) {
                  navigate('/cidades')
                } else {
                  navigate(`/cidades/detalhe/${result}`)
                }
              }
            })
        } else { //atualizando
          CidadesService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false)
              if (result instanceof Error) {
                alert(result.message)
              } else {
                if (isSaveAndClose()) {
                  navigate('/cidades')
                }
              }
            })
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {}
        errors.inner.forEach(error => {
          if (!error.path) return

          validationErrors[error.path] = error.message
          formRef.current?.setErrors(validationErrors)
        })
      })

  }
  const handleDelete = (id: number) => {
    if (confirm('Quer Apagar?')) {
      CidadesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            alert('Registro apagado com sucesso.')
            navigate('/cidades')
          }
        })
    }
  }

  return (
    <LayoutBaseDePagina title={id === 'nova' ? 'Nova cidade' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          titleNewButton='Nova'
          showSaveAndCloseButton
          showDeleteButton={id !== 'nova'}
          showNewButton={id !== 'nova'}
          onClickSave={save}
          onClickSaveAndClose={saveAndClose}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => navigate('/cidades/detalhe/nova')}
          onClickBack={() => navigate('/cidades/')}
        />
      }>
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>
          <Grid container direction='column' padding={2} spacing={2}>
            {isLoading && (
              <Grid item >
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}
            <Grid item >
              <Typography variant='h6'>Geral</Typography>
            </Grid>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField onChange={e => setNome(e.target.value)} disabled={isLoading} fullWidth label='Cidade' name='nome' />
              </Grid>
            </Grid>
            
          </Grid>
        </Box >
      </VForm >

      {
        isLoading && (
          <LinearProgress variant='indeterminate' />
        )
      }


    </LayoutBaseDePagina >
  )
}
