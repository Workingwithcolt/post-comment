import CreatePost from "@components/CreatePost";
import PostCard from "@components/PostCard";
import axios from "axios";
import { useEffect,useState } from "react";
import Loader from "@components/Loader";
import { IPost } from "@libs/types"
import useSWR from "swr"

import useSWRInfinite from 'swr/infinite'
import { usePagination } from "@libs/hooks";

export default function Home() {

  // const [posts,setPosts] = useState<IPost[]>(null)
  // const getPosts = async () => {
  //   const {data} =  await axios.get("/posts?_sort=createdAt&_order=desc")
  //   setPosts(data)
  // };
  // useEffect(() =>{
  //   getPosts()
  // },[])

  // const {data:posts,error} = useSWR<IPost[]>("/posts?_sort=createdAt&_order=desc")
  //Here By use of the useSWR I dont Want to again the load page when i come back to previous page
  const {loadingMore,isReachedEnd,setSize,size,error,paginatedData} = usePagination("/posts?_sort=createdAt&_order=desc")
  return (
    <div>
      <h4>useSWR Hook ⛳</h4>
      {/* <CreatePost mutate = {mutate} /> */}

      <h4>Posts</h4>
      {
        error && <p>Something Went Wrong</p> 
      }
      {
      paginatedData ?
      paginatedData?.map((post) => (
        <PostCard key={post.id} data = {post}/>
      ))
      :
      <Loader/>
      }
      {
        loadingMore ? <Loader/> 
        : null
      }

      {
        !isReachedEnd && 
      <button onClick = {()=>setSize(size+1)}> Load More</button>

    }
    </div>
  );
}
