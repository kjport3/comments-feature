import { useState, useEffect } from "react";
import { Api } from "./api";
import { confirmAlert } from "react-confirm-alert";
import ReactNotification from "react-notifications-component";
import Header from "./components/Header";
import AddComment from "./components/AddComment";
import Comments from "./components/Comments";
import DeleteButton from "./components/DeleteButton";
import headerStyles from "./styles/modules/Header.module.css";
import commentStyles from "./styles/modules/Comment.module.css";
import "./styles/react-confirm-alert.css";
import "./styles/App.css";
import "./styles/theme.css";
import "./styles/animate.css";

const App = () => {
  const url = "http://localhost:3001";

  const [comments, setComments] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Api.get(`${url}/getComments`)
      .then((res) => {
        const commentsFromServer = res;
        setComments(commentsFromServer);
        commentsFromServer.length > 0 ? setEmpty(false) : setEmpty(true);
        setLoading(false);
      })
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
        <Header styles={headerStyles} />
        <AddComment
          setComments={setComments}
          setEmpty={setEmpty}
          Api={Api}
          url={url}
          comments={comments}
        />
        {!loading && !empty ? (
          <>
            <Comments styles={commentStyles} comments={comments} />
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
        {empty && <p>No comments to show...</p>}
        {loading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default App;
