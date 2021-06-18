import { useState } from "react";
import { format } from "date-fns";
import { FaCheck } from "react-icons/fa";
import styles from "../styles/modules/Comment.module.css";

const Comment = ({ comment }) => {
  // Initialize state for a "Mark as read"
  const [isRead, setIsRead] = useState(false);

  // Format the timestamp
  let d = comment.created + "Z";
  const date = format(d, "MMM do");
  const time = format(d, "h:mm A");
  const timestamp = `${date} at ${time}`;

  return (
    <div
      className={styles.container}
      onClick={() => setIsRead(!isRead)}
      title={isRead ? "Read" : "Mark as read"}
    >
      <div className={styles.commentContainer}>
        <p className={styles.comment}>
          <span
            className={styles.text}
            title={comment.message}
          >
            {comment.message}
          </span>
        </p>
        <FaCheck
          className={isRead ? styles.show : styles.hide}
          style={{
            fontSize: "16px",
            alignSelf: "flex-start",
            marginTop: "22px",
          }}
        />
      </div>
      <p className={styles.author}>
        by <span className={styles.name}>{comment.name}</span> - {timestamp}
      </p>
    </div>
  );
};

export default Comment;
