import { FunctionComponent } from "react";
import { IComment } from "@libs/types";

const CommentCard:FunctionComponent<{
  data:IComment
}> = ({data:{content}}) => {
  return (
    <div className=" card w-50 bg-dark">
      <p className="card-body">{content}</p>
    </div>
  );
};

export default CommentCard;
