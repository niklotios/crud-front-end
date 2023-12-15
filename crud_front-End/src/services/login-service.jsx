import axios from "axios";
import { useAuth } from "../provider/authProvider";

const API_URL = "http://localhost:8080/api/v1/auth/authenticate";

const login = (email, password) => {
    
    const {setToken} = useAuth();

    return axios
    .post(API_URL, {
      email,
      password,
      headers: {
        "content-type": "application/json",
      },
    })

    .then((response) => {
      setToken(response.data.token);
      //localStorage.setItem("token", response.data.token);
      return response.data;
    });
};

const LoginService = {
    login,
  };

  export default LoginService;