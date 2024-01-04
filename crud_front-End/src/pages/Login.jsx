import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Button, Typography, Container, Grid } from '@mui/material';
import { useState } from "react";
import LoginService from "../services/login-service";
import axios from "axios";

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const [email,setEmail]= useState('');
    const [password, setPassword]=useState('');

    const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };
  
    const handleLogin = () => {
      axios.post("http://localhost:8080/api/v1/auth/authenticate",{
      email,
      password,
      headers : {
        "content-type":"applicaton/json",
      },
    } )
    .then((response) => {
      setToken(response.data.token);
    })
    .then(
      ()=>{
        navigate("/showCategory");
      }
    )
      //navigate("/showCategory", { replace: true });
    };
  
  
    return (
      <Grid container xs={12} direction="column" alignItems="center" justifyContent={"center"} spacing={3}  >
        <Grid item xs={12}>
          <Typography variant="h5">Welcome to our CRUD Application</Typography>
        </Grid>
        <Grid item xs={12} >
        <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5">Login</Typography>
          <form style={{ width: '100%', marginTop: 16 }}></form>
            
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          autoFocus
          value={email}
          onChange={onChangeEmail}
          />

          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoFocus
          value={password}
          onChange={onChangePassword}
          />

          <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleLogin}
          style={{ marginTop: 16 }}
          >
          Log In
          </Button>
        </Paper>
        </Grid>
      </Grid>
    );
  };
  
  export default Login;