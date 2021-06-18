import { useState } from "react";
import { store } from "react-notifications-component";
import { confirmAlert } from "react-confirm-alert";

const CommentInput = ({ setComments, setEmpty, Api, url, comments }) => {
  // Initial useState hooks for name & message
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Add a comment
  // Destructure the object in the function arguments
  const addComment = async ({ name, message, created }) => {
    Api.post(`${url}/createComment`, {
      name: name,
      message: message,
      created: created,
    })
      .then((res) => {
        // Update state
        setComments([res.body, ...comments]);
        setEmpty(false);
        setMessage("");
        setName(name);

        // Show a notification
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
        // Keep values in the inputs if there's an error
        setMessage(message);
        setName(name);

        // Log the error to the console & give the user an alert
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

  const handleClick = (event) => {
    // Prevent any unwanted browser behavior on submit
    event.preventDefault();

    // Make sure we have both inputs
    if (!message || !name) {
      alert("Please add both fields");
      return;
    }

    // Create the date to add to server
    const created = new Date();

    // Pass an object to addComment with our inputs
    addComment({ name, message, created });
  };

  return (
    <div className="addCommentContainer">
      <label htmlFor="name">Name:</label>
      {/* Use state to update the values in the inputs on change */}
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
      {/* Disable the button if we don't have values in both inputs */}
      <button
        disabled={!name || !message ? true : false}
        data-testid="comment-button"
        className={!name || !message ? "commentButtonDisabled" : "commentButton"}
        onClick={handleClick}
      >
        COMMENT
      </button>
    </div>
  );
};

export default CommentInput;
