
import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ReactNode } from 'react'
import { useDrawerContext } from '../contexts'

interface ILayout {
  children: React.ReactNode
  title: string
  barraDeFerramentas?: ReactNode

}

export const LayoutBaseDePagina: React.FC<ILayout> = ({ children, title, barraDeFerramentas }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const theme = useTheme()
  const { toggleDrawerOpen } = useDrawerContext()

  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1}>
      <Box display='flex' padding={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} alignItems='center' gap={1}>
        {smDown &&
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        }
        <Typography
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
        >
          {title}
        </Typography>

      </Box>
      {barraDeFerramentas &&
        <Box>
          {barraDeFerramentas}
        </Box>
      }
      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box >

  )
}
