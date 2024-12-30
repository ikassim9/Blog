import axios from "axios";
import { IPost } from "../model/IPost";

const api = process.env.REACT_APP_API_ENDPOINT;

const PostService = {
  async createPost(post: any, authToken: string) {

    const url = `${api}/post/CreatePost`;
    const headers = {
      Authorization: "Bearer " + authToken,
    
    };
    return await axios.post(url, post, {      
      headers: headers,
    });
  },


  async getPosts() {

    const url = `${api}/post/GetPosts`;

    return await axios.get(url);
 
  },

  async getPostById(id: string){

    const url = `${api}/post/getPostById/${id}`;


    return await axios.get(url);
  }
};

export default PostService;
