import { AppBar, Toolbar, Typography } from "@mui/material";
import Logout from "../pages/Logout";

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div">
                    CRUD Application
                </Typography>
                <div style={{marginLeft: 'auto'}}>
                    <Logout/>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;