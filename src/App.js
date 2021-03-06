import { useState, useEffect } from "react";
import { Api } from "./api";
import { confirmAlert } from "react-confirm-alert";
import ReactNotification from "react-notifications-component";
import Header from "./components/Header";
import AddComment from "./components/AddComment";
import Comments from "./components/Comments";
import DeleteButton from "./components/DeleteButton";
import "./styles/react-confirm-alert.css";
import "./styles/App.css";
import "./styles/theme.css";
import "./styles/animate.css";

const App = () => {
  const url = "http://localhost:3001";

  // Initial useState hooks for comments, empty & loading states
  const [comments, setComments] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);

  // Run useEffect hook for initial render to get comments from the server
  useEffect(() => {
    Api.get(`${url}/getComments`)
      // If request is fulfilled, update states
      .then((res) => {
        const commentsFromServer = res;
        setComments(commentsFromServer);
        setLoading(false);
        commentsFromServer.length > 0 ? setEmpty(false) : setEmpty(true);
      })
      // If request is rejected, log the error, notify the user
      .catch((err) => {
        console.log(err);
        confirmAlert({
          title: "Oops",
          message: "There was a problem fetching the comments from the server.",
          buttons: [
            {
              label: "Ok",
            },
          ],
        });
      });
  }, []);

  return (
    <>
      <ReactNotification isMobile={true} />

      <div className="container">
        <Header />
        <AddComment
          setComments={setComments}
          setEmpty={setEmpty}
          Api={Api}
          url={url}
          comments={comments}
        />
        {/* If neither loading or empty states are true, 
        show Comments & Button components */}
        {!loading && !empty ? (
          <>
            <Comments comments={comments} />
            <DeleteButton
              Api={Api}
              setComments={setComments}
              setEmpty={setEmpty}
              url={url}
            />
          </>
        ) : (
          ""
        )}
        {/* Conditionally render a message indicating the state */}
        {empty && <p>No comments to show...</p>}
        {loading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default App;
