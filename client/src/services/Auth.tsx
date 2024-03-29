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

  async login(url: string) {},
};

export default Auth;
