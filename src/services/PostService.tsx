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
  },

 async GetUserPosts(authToken: string) {

     const headers = {
      Authorization: "Bearer " + authToken,
    
    };
    const url = `${api}/post/getPostByUserId`;
    return await axios.get(url, { headers: headers }); 
  },


  async updatePost(postId: string, post: any, authToken: string, isThumbnailRemoved: boolean) {
    const url = `${api}/post/${postId}`;
    const headers = {
      Authorization: "Bearer " + authToken,
    
    };
    return await axios.put(url, post, {      
      headers: headers,
    });
  },

  async deletePost(authToken: string, postId: string){

    const url = `${api}/post/${postId}`;
    const headers = {
      Authorization: "Bearer " + authToken,
    
    };
    
    return await axios.delete(url, {      
      headers: headers,
    });
   
  }
};

export default PostService;
