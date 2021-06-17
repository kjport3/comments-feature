import Comment from "./Comment";

const Comments = ({ styles, comments }) => {
  comments.sort((a, b) => {
    return b.id - a.id;
  });

  return (
    <>
      {comments.map((comment, index) => (
        <Comment styles={styles} key={index} comment={comment} />
      ))}
    </>
  );
};

export default Comments;
