import CreatePost from "@components/CreatePost";
import PostCard from "@components/PostCard";
import axios from "axios";
import { useEffect,useState } from "react";
import Loader from "@components/Loader";
import { IPost } from "@libs/types"
import useSWR from "swr"

import useSWRInfinite from 'swr/infinite'

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
  const getkey = (pageIndex:number,previousPageData:any) =>{
    pageIndex = pageIndex+1
    if(previousPageData && !previousPageData.length){
      return null
    } else{
    return `/posts?_sort=createdAt&_order-desc&_page=${pageIndex}&_limit=4`
  }
  }
  
  const {data:posts,size,setSize,error} =  useSWRInfinite(getkey)
  // console.log(paginatedData,size)
  const paginatedData = posts?.flat() //when I use the ? that it execute you can try
  const isReachedEnd = posts && posts[posts.length -1].length < 4
  //That indicate the If we reach at the end we got all the content at the last after that in our database 
  //we dont have any content there we here retun true
  console.log(posts)
  console.log(isReachedEnd)
  const loadingMore = posts && posts[size-1] === undefined
  return (
    <div>
      <h4>useSWR Hook ⛳</h4>
      {/* <CreatePost mutate = {mutate} /> */}

      <h4>Posts</h4>
      {
        error && <p>Something Went Wrong</p> 
      }
      {
      posts ?
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
