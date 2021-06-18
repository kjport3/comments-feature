import { confirmAlert } from "react-confirm-alert";

const DeleteButton = ({ Api, setComments, setEmpty, url }) => {
  // Delete a comment
  const deleteComments = () => {
    // Confirm if we want to delete all comments using react-confirm-alert
    confirmAlert({
      title: "Wait",
      message: "Are you sure you want to delete all comments?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            // Delete request if the user confirms
            Api.delete(`${url}/deleteComments`)
              .then(() => {
                // Update state if the request is successful
                setComments([]);
                setEmpty(true);
              })
              // Catch the error
              .catch((err) => {
                // Console log error
                console.log(err);
                // Show user an additional alert that the request failed
                confirmAlert({
                  title: "Oops",
                  message: "There was a problem with your delete request.",
                  buttons: [
                    {
                      label: "Ok",
                    },
                  ],
                });
              });
          },
        },
        // Do nothing if the user clicks no
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <>
      <button
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
