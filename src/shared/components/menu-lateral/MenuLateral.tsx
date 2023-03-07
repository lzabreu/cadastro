import { Avatar, Divider, Drawer, List, useMediaQuery, useTheme } from '@mui/material'

import { Box } from '@mui/system'
import { useDrawerContext } from '../../contexts'
import { ListItemLink } from './component/ListItemLink'

interface IDrawerProps {
  children: React.ReactNode
}
export const MenuLateral: React.FC<IDrawerProps> = ({ children }) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext()

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column' >
          <Box width='100%' height={theme.spacing(20)} display='flex' justifyContent='center' alignItems='center'>
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src='https://avatars.githubusercontent.com/u/178033?v=4'
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component='nav'>
              {drawerOptions.map((drawerOption, key) =>(
                <ListItemLink
                key={key}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  to={drawerOption.path}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>



    </>
  )
}
