import axios from "axios";

const api = "https://localhost:44333/api";

const Auth = {
  async register(name: string, authToken: string) {

    const url = `${api}/user/register`;
    const headers = {
      Authorization: "Bearer " + authToken,
    };

    return await axios.post(url, null, {
      params: {name: name},
      headers: headers,
    });
  },

  async login(authToken: string) {

    const url = `${api}/user/login`;
    
    const headers = {
      Authorization: "Bearer " + authToken,
    };

    return await axios.post(url, null, {
      headers: headers,
    });

  },
};

export default Auth;
