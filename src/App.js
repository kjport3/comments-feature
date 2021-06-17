import { useState, useEffect } from "react";
import { store } from "react-notifications-component";
import { Api } from "./api";
// import axios from "axios";
import ReactNotification from "react-notifications-component";
import Header from "./components/Header";
import AddComment from "./components/AddComment";
import Comments from "./components/Comments";
import headerStyles from "./styles/modules/Header.module.css";
import addCommentStyles from "./styles/modules/AddComment.module.css";
import commentStyles from "./styles/modules/Comment.module.css";
import "./styles/App.css";
import "./styles/theme.css";
import "./styles/animate.css";

const App = () => {
  const url = "http://localhost:3001";

  const [comments, setComments] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      const commentsFromServer = await fetchComments();
      setComments(commentsFromServer);
      commentsFromServer.length > 0 ? setEmpty(false) : setEmpty(true);
      setLoading(false);
    };
    getComments();
  }, []);

  // Fetch comments
  const fetchComments = () => {
    return Api.get(`${url}/getComments`)
      .then((res) => res)
      .catch((err) => console.log(err));
  };

  // Add a comment
  const addComment = async ({ name, message, created }) => {
    Api.post(`${url}/createComment`, {
      name: name,
      message: message,
      created: created,
    })
      .then((res) => {
        setComments([res.body, ...comments])
        setEmpty(false)
      })
      .catch((err) => console.log(err));
      
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
  };

  // Delete a comment
  const deleteComments = () => {
    Api.delete(`${url}/deleteComments`);
    setComments([]);
    setEmpty(true);
  };

  return (
    <>
      <ReactNotification isMobile={true} />

      <div className="container">
        <Header styles={headerStyles} />
        <AddComment styles={addCommentStyles} onCommentSubmit={addComment} />
        {!loading && !empty ? (
          <>
            <Comments
              styles={commentStyles}
              comments={comments}
              empty={empty}
            />
            <button
              style={{ margin: "20px 0 30px" }}
              className="deleteButton"
              data-testid="delete-comments"
              onClick={() => deleteComments()}
            >
              DELETE All COMMENTS
            </button>
          </>
        ) : (
          ""
        )}
        {empty && <p>No comments to show...</p>}
        {loading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default App;
