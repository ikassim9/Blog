import axios from "axios";
import { IPost } from "../model/IPost";
 
const PostService = {
  async createPost(post: IPost, authToken: string) {

    const url = "/post/CreatePost";
    const headers = {
      Authorization: "Bearer " + authToken,
    };
    debugger;
    return await axios.post(url, null, {
      params: { title: post.title, description: post.description},
      headers: headers,
    });
  },
};

export default PostService;
