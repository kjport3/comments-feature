import { useState } from "react";

const CommentInput = ({ onCommentSubmit }) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const created = new Date();

    if (!message || !name) {
      alert("Please add both fields");
      return;
    }

    onCommentSubmit({ name, message, created });

    setMessage("");
    setName(name);
  };

  return (
    <>
      <label htmlFor="name">Name:</label>
      <input
        required
        type="text"
        placeholder="Your Name"
        data-testid="name-input"
        className="nameInput"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <textarea
        required
        placeholder="Add a comment..."
        maxLength="280"
        data-testid="message-input"
        className="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      ></textarea>
      <button
        data-testid="comment-button"
        className="commentButton"
        type="submit"
        onClick={onSubmit}
      >
        COMMENT
      </button>
      {/* <hr /> */}
    </>
  );
};

export default CommentInput;
