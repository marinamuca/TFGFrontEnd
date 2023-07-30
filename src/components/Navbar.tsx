import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { MdAccountCircle } from 'react-icons/md'
import { AiOutlineMenu } from 'react-icons/ai'

export const APP_BAR_HEIGHT = 65;

const Navbar = () => {
   
    return (
        <AppBar position="static">
            <Toolbar style={{ height: APP_BAR_HEIGHT }}>
                {/* <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <AiOutlineMenu />
                </IconButton> */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    APP
                </Typography>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <MdAccountCircle/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar