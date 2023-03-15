import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { FerramentasDeDetalhe } from '../../shared/components'
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService'
import { AutoCompleteCidade } from './components/AutoCompleteCidade'

interface IFormData {
  email: string
  nomeCompleto: string
  cidadeId: number
}
const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  email: yup.string().required('o email é obrigatório').email(),
  nomeCompleto: yup.string().required().min(3),
  cidadeId: yup.number().required()
})

export const DetalheDePessoas = () => {
  const { id = 'nova' } = useParams<'id'>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState('')
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm()

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
            formRef.current?.setData(result)
          }
        })
    } else {
      formRef.current?.setData({
        nomeCompleto: '',
        email: '',
        cidadeId: ''
      })
    }

  }, [id])

  const handleSave = (dados: IFormData) => {

    formValidationSchema.validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true)
        if (id === 'nova') { //salvando
          PessoasService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false)
              if (result instanceof Error) {
                alert(result.message)
              } else {
                if (isSaveAndClose()) {
                  navigate('/pessoas')
                } else {
                  navigate(`/pessoas/detalhe/${result}`)
                }
              }
            })
        } else { //atualizando
          PessoasService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false)
              if (result instanceof Error) {
                alert(result.message)
              } else {
                if (isSaveAndClose()) {
                  navigate('/pessoas')
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

  return (
    <LayoutBaseDePagina title={id === 'nova' ? 'Nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          titleNewButton='Nova'
          showSaveAndCloseButton
          showDeleteButton={id !== 'nova'}
          showNewButton={id !== 'nova'}
          onClickSave={save}
          onClickSaveAndClose={saveAndClose}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => navigate('/pessoas/detalhe/nova')}
          onClickBack={() => navigate('/pessoas/')}
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
                <VTextField onChange={e => setNome(e.target.value)} disabled={isLoading} fullWidth label='Nome completo' name='nomeCompleto' />
              </Grid>
            </Grid>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField disabled={isLoading} fullWidth label='Email' name='email' />
              </Grid>
            </Grid>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <AutoCompleteCidade isExternalLoading={isLoading}/>
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
