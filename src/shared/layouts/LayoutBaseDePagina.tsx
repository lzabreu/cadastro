
import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { useDrawerContext } from '../contexts'

interface ILayout {
  children: React.ReactNode
  title: string

}

export const LayoutBaseDePagina: React.FC<ILayout> = ({ children, title }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const theme = useTheme()
  const {toggleDrawerOpen} = useDrawerContext()

  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1}>
      <Box display='flex' padding={1} height={theme.spacing(12)} alignItems='center' gap={1}>
        {smDown &&
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        }
        <Typography variant='h4'>
          {title}
        </Typography>

      </Box>
      <Box>
        Barra de ferramentas
      </Box>
      <Box>
        {children}
      </Box>
    </Box >

  )
}
