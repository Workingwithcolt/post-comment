import { useState } from "react";
import axios from "axios";

const CreatePost = ({setPosts}) => {

  const [content, setContent] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const id =Math.floor(Math.random()*1000)
    const {data} = await axios({
      method:'post',
      url:"/posts",
      data:{
        content,
        id,
        cretedAt:Date.now()
      }
    })
    setPosts(posts => [data,...posts])
    setContent("")
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
