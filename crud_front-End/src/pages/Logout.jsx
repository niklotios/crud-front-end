import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    navigate("../", { replace: true });
  };

  // setTimeout(() => {
  //   handleLogout();
  // }, 3 * 1000);

  return (
    <Button
    color="inherit"
    onClick={handleLogout}
    endIcon={<LogoutIcon/>}
    >Logout</Button>
  );
};

export default Logout;