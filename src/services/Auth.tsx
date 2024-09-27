import axios from "axios";

const Auth = {
  async register(url: string, name: string, authToken: string) {
    const headers = {
      Authorization: "Bearer " + authToken,
    };

    return await axios.post(url, null, {
      params: {name: name},
      headers: headers,
    });
  },

  async login(authToken: string) {

    const url = '/user/login';
    
    const headers = {
      Authorization: "Bearer " + authToken,
    };

    return await axios.post(url, null, {
      headers: headers,
    });

  },
};

export default Auth;
