import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material'

interface IFerramentasDaListagemProps {
  textoDaBusca?: string
  mostrarInputBusca?: boolean
  aoMudarTextoDeBusca?: (novoTexto: string) => void

  textoBotaoNovo?: string
  mostrarBotaoNovo?: boolean
  aoClicarEmBotaoNovo?: () => void
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  aoClicarEmBotaoNovo
}) => {
  const theme = useTheme()
  return (
    <Box
      component={Paper}
      height={theme.spacing(5)}
      marginX={1}
      paddingY={3}
      paddingX={2}
      display='flex'
      alignItems='center'
      gap={1}
    >
      {mostrarInputBusca && (
        <TextField
          size='small'
          placeholder='Pesquisar...'
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}

      <Box flex={1} display='flex' justifyContent='end'>
        {mostrarBotaoNovo &&(
          <Button
          variant='contained'
          disableElevation
          color='primary'
          onClick={aoClicarEmBotaoNovo}
          endIcon={<Icon>add</Icon>}>
          {textoBotaoNovo}
        </Button>
        )}
      </Box>

    </Box>
  )
}
