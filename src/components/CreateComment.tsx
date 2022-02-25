import { useState } from "react";
import {mutate} from "swr"
import axios from 'axios'
import { IComment } from "@libs/types";

const CreateComment = ({postId}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id =Math.floor(Math.random()*1000)
    const FAKE_DATA = {
      id,
      content:comment,
      createdAt:Date.now(),
      clientOnly:true,
    }
    mutate(`/posts/${postId}/comments?_sort=createdAt&_order=desc`, (comments:IComment[]) => [FAKE_DATA,...comments],false);
    //The above make changes at the cache level without revalidating the data base 
    setComment("") 
    await axios({
      method:'post',
      url:`/posts/${postId}/comments`,
      data:{
        id,
        content:comment,
        cretedAt:Date.now(),
      }
    })//That particular axios post the data to the database
    // setPosts(posts => [data,...posts])
    mutate(`/posts/${postId}/comments?_sort=createdAt&_order=desc`);//that again take all the cache and re-render at that time we see our 
    //post get change position which go to the last because that update acccording to  the cache  that means newly updated 
    // data come at the end

  }
  return (
    <form onSubmit={handleSubmit} className="mx-auto w-50">
      <textarea
        cols={3}
        className="form-control"
        placeholder="Write your dream comment:)"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      ></textarea>
      <button className="btn btn-outline-warning" type="submit">
        Add comment
      </button>
    </form>
  );
};

export default CreateComment;
