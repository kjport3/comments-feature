import { confirmAlert } from "react-confirm-alert";

const DeleteButton = ({ Api, setComments, setEmpty, url }) => {
  // Delete a comment
  const deleteComments = () => {
    confirmAlert({
      title: "Wait",
      message: "Are you sure you want to delete all comments?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            Api.delete(`${url}/deleteComments`);
            setComments([]);
            setEmpty(true);
          },
        },
        {
          label: "No"
        },
      ],
    });
  };

  return (
    <>
      <button
        style={{ margin: "20px 0 30px" }}
        className="deleteButton"
        data-testid="delete-comments"
        onClick={() => deleteComments()}
      >
        DELETE All COMMENTS
      </button>
    </>
  );
};

export default DeleteButton;
