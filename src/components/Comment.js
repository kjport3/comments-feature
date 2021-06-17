import { useState } from "react";
import { format } from "date-fns";

const Comment = ({ styles, comment }) => {
  
  const [isActive, setIsActive] = useState(false);
    
  const toggleClass = () => setIsActive(!isActive);

  let d = comment.created + "Z";
  const date = format(d, "MMM do");
  const time = format(d, "h:mm A");
  const timestamp = `${date} at ${time}`;

  return (
    <div className={isActive ? styles.highlight : styles.container}>
      <div className={styles.commentContainer}>
        <p className={styles.comment} onClick={toggleClass}>{comment.message}</p>
      </div>
      <p className={styles.author} onClick={toggleClass}>
        by <span className={styles.name}>{comment.name}</span> -{" "}
        {timestamp}
      </p>
    </div>
  );
};

export default Comment;
