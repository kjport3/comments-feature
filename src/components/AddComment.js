import { useState } from "react";
import { store } from "react-notifications-component";
import { confirmAlert } from "react-confirm-alert";
import "../styles/react-confirm-alert.css";

const CommentInput = ({ setComments, setEmpty, Api, url, comments }) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  // Add a comment
  const addComment = async ({ name, message, created }) => {
    Api.post(`${url}/createComment`, {
      name: name,
      message: message,
      created: created,
    })
      .then((res) => {
        setComments([res.body, ...comments]);
        setEmpty(false);
        setMessage("");
        setName(name);
        store.addNotification({
          title: name,
          message: message,
          type: "warning",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: false,
            click: false,
            pauseOnHover: true,
            showIcon: true,
          },
        });
      })
      .catch((err) => {
        setMessage(message);
        setName(name);
        console.log(err);
        confirmAlert({
          title: "Oops",
          message: "There was a problem adding your comment to the server.",
          buttons: [
            {
              label: "Ok",
            },
          ],
        });
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const created = new Date();

    if (!message || !name) {
      alert("Please add both fields");
      return;
    }

    addComment({ name, message, created });
  };

  return (
    <div className="addCommentContainer">
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
        disabled={!name || !message ? true : false}
        data-testid="comment-button"
        className={!name || !message ? "commentButtonDisabled" : "commentButton"}
        type="submit"
        onClick={onSubmit}
      >
        COMMENT
      </button>
      {/* <hr /> */}
    </div>
  );
};

export default CommentInput;
