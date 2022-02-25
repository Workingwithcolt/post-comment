import { useState } from "react";
import axios from "axios";
import {mutate} from "swr"
import { IPost } from "@libs/types";
const CreatePost = () => {

  const [content, setContent] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const id =Math.floor(Math.random()*1000)
    const FAKE_DATA = {
      id,
      content,
      createdAt:Date.now(),
      clientOnly:true,
    }
    mutate('/posts?_sort=createdAt&_order=desc', (posts:IPost[]) => [FAKE_DATA,...posts], false);
    //The above make changes at the cache level without revalidating the data base 
    setContent("")
    const {data} = await axios({
      method:'post',
      url:"/posts",
      data:{
        content,
        id,
        cretedAt:Date.now()
      }
    })//That particular axios post the data to the database
    // setPosts(posts => [data,...posts])
    mutate('/posts?_sort=createdAt&_order=desc');//that again take all the cache and re-render at that time we see our 
    //post get change position which go to the last because that update acccording to  the cache  that means newly updated 
    // data come at the end

  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-50 ">
      <textarea
        cols={3}
        className="form-control"
        placeholder="Write your dream post:)"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
      <button className="btn btn-outline-warning" type="submit">
        Add Post
      </button>
    </form>
  );
};

export default CreatePost;
