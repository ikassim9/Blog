import axios from "axios";

const Auth = {
  async register(url: string, user: any, authToken: string) {
    
    const headers = {
      Authorization: "Bearer " + authToken,
    };

    return await axios.post(url, user, {
 
      headers: headers,
    });
  },

  async login(url: string) {},
};

export default Auth;
