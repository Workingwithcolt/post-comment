import { FunctionComponent } from "react";
import { IComment } from "@libs/types";

const CommentCard:FunctionComponent<{
  data:IComment
}> = ({data}) => {
  const classname = data.content ? "border card w-50 bg-dark " : "card w-50 bg-dark"
  return (

    <div className=" card w-50 bg-dark">
      <p className="card-body">{data.content}</p>
    </div>
  );
};

export default CommentCard;
