import useSWRInfinite from 'swr/infinite'
export const usePagination =(url:string) =>{//Why we put the url becouse we want to make the page dynamic

    
    const getkey = (pageIndex:number,previousPageData:any) =>{
        pageIndex = pageIndex+1
        if(previousPageData && !previousPageData.length){
          return null
        } else{
            return `${url}&_page=${pageIndex}&_limit=4`
        // return `/posts?_sort=createdAt&_order-desc&_page=${pageIndex}&_limit=4`
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
      return {
          paginatedData,isReachedEnd,size,setSize,error,loadingMore
      }
}