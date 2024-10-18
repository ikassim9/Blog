import axios from "axios";
import { IPost } from "../model/IPost";

const api = process.env.REACT_APP_API_ENDPOINT;

console.log("api", api);
const PostService = {
  async createPost(post: IPost, authToken: string) {

    const url = `${api}/post/CreatePost`;
    const headers = {
      Authorization: "Bearer " + authToken,
    };
 
    return await axios.post(url, null, {
      params: { title: post.title, description: post.description},
      headers: headers,
    });
  },


  async getPosts() {

    const url = `${api}/post/GetPosts`;

    return await axios.get(url);
 
  }
};

export default PostService;
