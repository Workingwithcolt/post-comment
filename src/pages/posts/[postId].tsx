import CreateComment from "@components/CreateComment";
import CommentCard from "@components/CommentCard";
import PostCard from "@components/PostCard";
import { useRouter } from "next/router";
import axios from "axios";
import {IComment, IPost} from "@libs/types"
import { useState, useEffect } from "react";
import Loader from "@components/Loader";
import useSWR from 'swr'

//That is the page When I click on the Post i went to the page were we can make the comment to the post

const index = () => {
  const {query:{postId}}  = useRouter()



  // const [comments,setComments] = useState<IComment[]>(null)
  // const [post,setPost] = useState<IPost>(null)
  // const getPost = async () => {
  //   const {data} =  await axios.get("/posts?_sort=createdAt&_order=desc")
  //   setPost(data)
  // };

  // const getComments =async () => {
  //   const {data} =  await axios.get(`/posts/${postId}/comments?_sort=createdAt&_order=desc`)
  //   setComments(data)
  // };
  // useEffect(() =>{
  //   postId && getComments()
  //   postId && getPost()
  // },[postId])

  const {data:comments,error} = useSWR<IComment[]>(`/posts/${postId}/comments?_sort=createdAt&_order=desc`)

  const {data:posts,error:posterror} = useSWR<IPost[]>("/posts?_sort=createdAt&_order=desc",{
  dedupingInterval:20000,})//We our app make the douplicate request in the 10000ms then that request is not made 
  
  const postIndex = posts ?  posts.findIndex((post) => post.id === Number(postId)): null
  
  return (
    <div>
       {
        posts ?
        <PostCard data = {posts[postIndex]}/>
        : <Loader />
      }
      
      <CreateComment />

      <h4>Comments</h4>
      {comments ?
      comments.map((comment) => (
        <CommentCard key={comment.id} data = {comment}/>
      ))
      :
      <Loader />
      }
    </div>
  );
};

export default index;
