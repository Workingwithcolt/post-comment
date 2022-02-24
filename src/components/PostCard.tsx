import { useRouter } from "next/router";
import {IPost} from "@libs/types"
import {FunctionComponent} from "react"
const PostCard:FunctionComponent<{//It is same as the generic  please click on the IPost Which is the generic interface
  data:IPost
}> = ({data:{content,createdAt,id}}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${id}`);
  };

  return (
    <div className="card w-50 bg-dark" onClick={handleClick}>
      <p className="card-header">Post Id : {id}</p>
      <p className="card-body">{content}</p>
    </div>
  );
};

export default PostCard;
