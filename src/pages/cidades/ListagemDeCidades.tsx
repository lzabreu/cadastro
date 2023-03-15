import React, { useEffect, useMemo, useState } from 'react'
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { IListagemCidade, CidadesService } from '../../shared/services/api/cidades/CidadesService'
import { FerramentasDaListagem } from '../../shared/components'
import { LayoutBaseDePagina } from '../../shared/layouts'
import { useDebounce } from '../../shared/hooks'
import { Environment } from '../../shared/environment'

export const ListagemDeCidades: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { debounce } = useDebounce(500, true)
  const navigate = useNavigate()

  const [rows, setRows] = useState<IListagemCidade[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const busca = useMemo(() => {
    return searchParams.get('busca') || ''
  }, [searchParams])

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1')
  }, [searchParams])


  useEffect(() => {
    setIsLoading(true)

    debounce(() => {
      CidadesService.getAll(pagina, busca)
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message)
          } else {
            setRows(result.data)
            setTotalCount(result.totalCount)
          }
        })
    })
  }, [busca, pagina])

  const handleDelete = (id:number)=>{
    if(confirm('Quer Apagar?')) {
      CidadesService.deleteById(id)
      .then(result => {
        if(result instanceof Error) {
          alert(result.message)
        }else{
          setRows(oldRows => {
            return [...oldRows.filter(oldRow => oldRow.id !== id)]
          })
          alert('Registro apagado com sucesso.')
        }
      })
    }
  }

  return (
    <LayoutBaseDePagina
      title='Listagem de Cidades'
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo='Nova'
          mostrarInputBusca
          textoDaBusca={busca}
          aoClicarEmBotaoNovo={()=> navigate('/cidades/detalhe/nova')}
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
        />
      }
    >
      <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={150}>Ações</TableCell>
              <TableCell>Nome</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size='small' onClick={()=> handleDelete(row.id)}>
                    <Icon>
                      delete
                    </Icon>
                  </IconButton>
                  <IconButton size='small' onClick={()=> navigate(`/cidades/detalhe/${row.id}`)}>
                    <Icon>
                      edit
                    </Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nome}</TableCell>
              </TableRow>

            ))}
          </TableBody>
          {totalCount === 0 && !isLoading && (
            <caption>Nenhum registro encontrado</caption>
          )}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>

                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(e ,newPage)=> setSearchParams({ busca, pagina: newPage.toString() }, { replace: true }) }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  )
}
