import Comment from "./Comment";

const Comments = ({ comments }) => {
  // Sort the comments by id
  comments.sort((a, b) => {
    return b.id - a.id;
  });

  return (
    <>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </>
  );
};

export default Comments;
