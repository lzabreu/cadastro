import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'

interface IFerramentasDeDetalheProps {
  titleNewButton?: string
  showNewButton?: boolean
  showBackButton?: boolean
  showDeleteButton?: boolean
  showSaveButton?: boolean
  showSaveAndBackButton?: boolean

  showNewButtonLoading?: boolean
  showBackButtonLoading?: boolean
  showDeleteButtonLoading?: boolean
  showSaveButtonLoading?: boolean
  showSaveAndBackButtonLoading?: boolean

  onClickNew?: () => void
  onClickBack?: () => void
  onClickDelete?: () => void
  onClickSave?: () => void
  onClickSaveAndBack?: () => void
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = (
  {
    titleNewButton = 'Novo',
    showNewButton = true,
    showBackButton = true,
    showDeleteButton = true,
    showSaveButton = true,
    showSaveAndBackButton = false,
    showNewButtonLoading = false,
    showBackButtonLoading = false,
    showDeleteButtonLoading = false,
    showSaveButtonLoading = false,
    showSaveAndBackButtonLoading = false,
    onClickNew,
    onClickBack,
    onClickDelete,
    onClickSave,
    onClickSaveAndBack,
  }
) => {
  const theme = useTheme()

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))


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
      {(showSaveButton && !showNewButtonLoading) && (
        <Button
          variant='contained'
          disableElevation
          color='primary'
          startIcon={<Icon>save</Icon>}
          onClick={onClickSave}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Salvar
          </Typography>

        </Button>
      )}
      {showNewButtonLoading && (<Skeleton width={110} height={60} />)}

      {(showSaveAndBackButton && !showSaveAndBackButtonLoading && !smDown && !mdDown) && (
        <Button
          variant='outlined'
          disableElevation
          color='primary'
          startIcon={<Icon>save</Icon>}
          onClick={onClickSaveAndBack}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Salvar e voltar
          </Typography>
        </Button>
      )}
      {(showSaveAndBackButtonLoading && smDown && !mdDown) && (<Skeleton width={180} height={60} />)}

      {(showDeleteButton && !showDeleteButtonLoading) && (
        <Button
          variant='outlined'
          disableElevation
          color='primary'
          startIcon={<Icon>delete</Icon>}
          onClick={onClickDelete}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Apagar
          </Typography>
        </Button>
      )}
      {showDeleteButtonLoading && (<Skeleton width={110} height={60} />)}

      {(showSaveButton && !showSaveButtonLoading && !smDown) && (
        <Button
          variant='outlined'
          disableElevation
          color='primary'
          startIcon={<Icon>add</Icon>}
          onClick={onClickNew}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            {titleNewButton}
          </Typography>
        </Button>
      )}
      {(showNewButtonLoading && smDown) && (<Skeleton width={110} height={60} />)}

      {
        (showBackButton && (showNewButton || showDeleteButton || showSaveButton || showSaveAndBackButton))
        && (
          <Divider variant='middle' orientation='vertical' />

        )
      }
      {(showBackButton && !showBackButtonLoading) && (
        <Button
          variant='outlined'
          disableElevation
          color='primary'
          startIcon={<Icon>arrow_back</Icon>}
          onClick={onClickBack}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Voltar
          </Typography>
        </Button>
      )}
      {showBackButtonLoading && (<Skeleton width={110} height={60} />)}
    </Box >
  )

}
