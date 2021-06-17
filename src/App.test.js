import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";
import AddComment from "./components/AddComment";

describe("Inputs rendering", () => {
  test("Name renders", () => {
    render(<AddComment />);
    expect(screen.queryByTestId("name-input")).toBeTruthy();
  });

  test("Message renders", () => {
    render(<AddComment />);
    expect(screen.queryByTestId("message-input")).toBeTruthy();
  });
});

describe("Check that inputs update", () => {
  test("Name updates on input", () => {
    render(<AddComment />);

    const input = screen.queryByTestId("name-input");

    fireEvent.change(input, { target: { value: "Barney Rubble" } });

    expect(input.value).toBe("Barney Rubble");
  });

  test("Message updates on input", () => {
    render(<AddComment />);

    const input = screen.queryByTestId("message-input");

    fireEvent.change(input, { target: { value: "test" } });

    expect(input.value).toBe("test");
  });
});

describe("Submit comment", () => {
  describe("Missing both inputs", () => {
    test("Does not trigger addComment", () => {
      const addComment = jest.fn();

      window.alert = () => {};

      render(<AddComment onCommentSubmit={addComment} />);

      const nameInput = screen.queryByTestId("name-input");
      const messageInput = screen.queryByTestId("message-input");

      fireEvent.change(nameInput, { target: { value: "" } });
      fireEvent.change(messageInput, { target: { value: "" } });

      fireEvent.click(screen.queryByTestId("comment-button"));

      expect(addComment).not.toHaveBeenCalled();
    });
  });

  describe("Missing name", () => {
    test("Does not trigger addComment", () => {
      const addComment = jest.fn();

      render(<AddComment onCommentSubmit={addComment} />);

      const nameInput = screen.queryByTestId("name-input");
      const messageInput = screen.queryByTestId("message-input");

      fireEvent.change(nameInput, { target: { value: "" } });
      fireEvent.change(messageInput, {
        target: { value: "I don't remember my name." },
      });

      fireEvent.click(screen.queryByTestId("comment-button"));

      expect(addComment).not.toHaveBeenCalled();
    });
  });

  describe("Missing message", () => {
    test("Does not trigger addComment", () => {
      const addComment = jest.fn();

      render(<AddComment onCommentSubmit={addComment} />);

      const nameInput = screen.queryByTestId("name-input");
      const messageInput = screen.queryByTestId("message-input");

      fireEvent.change(nameInput, { target: { value: "Boba Fett" } });
      fireEvent.change(messageInput, { target: { value: "" } });

      fireEvent.click(screen.queryByTestId("comment-button"));

      expect(addComment).not.toHaveBeenCalled();
    });
  });

  describe("With both inputs", () => {
    test("Triggers addComment", () => {
      const addComment = jest.fn();

      render(<AddComment onCommentSubmit={addComment} />);

      const nameInput = screen.queryByTestId("name-input");
      const messageInput = screen.queryByTestId("message-input");

      fireEvent.change(nameInput, { target: { value: "Fred Flintstone" } });
      fireEvent.change(messageInput, { target: { value: "Yabba dabba doo!" } });

      fireEvent.click(screen.queryByTestId("comment-button"));

      expect(addComment).toHaveBeenCalled();
    });

    test("Comment renders to the screen", async () => {
      render(<App />);

      const nameInput = screen.queryByTestId("name-input");
      const messageInput = screen.queryByTestId("message-input");
      const randNumber = Math.floor(Math.random() * 201);
      
      act( async () => {
        fireEvent.change(nameInput, {
          target: { value: "Frederick von Chimpenheimer IV" },
        });
        fireEvent.change(messageInput, {
          target: { value: `I go by Freddie. I can eat ${randNumber} bananas.` },
        });
  
        fireEvent.click(screen.queryByTestId("comment-button"));
  
        const comment = await screen.findByText(
          `I go by Freddie. I can eat ${randNumber} bananas.`
        );
  
        expect(comment).toBeTruthy();
      })
      
    });
  });
});

describe("Delete button", () => {
  test("Renders after comment is added", () => {
    render(<App />);

    const nameInput = screen.queryByTestId("name-input");
      const messageInput = screen.queryByTestId("message-input");
      const randNumber = Math.floor(Math.random() * 201);
      
      act( async () => {
        fireEvent.change(nameInput, {
          target: { value: "Frederick von Chimpenheimer IV" },
        });
        fireEvent.change(messageInput, {
          target: { value: `I go by Freddie. I can eat ${randNumber} bananas.` },
        });
  
        fireEvent.click(screen.queryByTestId("comment-button"));
  
        await screen.findByTestId("delete-comments");
        
        expect(screen.queryByTestId("delete-comments")).toBeTruthy();
      })
  });

  test("Clicking it triggers deleteComments", () => {
    const deleteComments = jest.fn();

    render(<App />);

    const nameInput = screen.queryByTestId("name-input");
      const messageInput = screen.queryByTestId("message-input");
      const randNumber = Math.floor(Math.random() * 201);
      
      act( async () => {
        fireEvent.change(nameInput, {
          target: { value: "Frederick von Chimpenheimer IV" },
        });
        fireEvent.change(messageInput, {
          target: { value: `I go by Freddie. I can eat ${randNumber} bananas.` },
        });
  
        fireEvent.click(screen.queryByTestId("comment-button"));
  
        const button = await screen.findByTestId("delete-comments");

        fireEvent.click(button);
        
        expect(deleteComments).toHaveBeenCalled();
      })
  });

  test("Deleting all comments makes message show", () => {
    render(<App />);

    const nameInput = screen.queryByTestId("name-input");
      const messageInput = screen.queryByTestId("message-input");
      const randNumber = Math.floor(Math.random() * 201);
      
      act( async () => {
        fireEvent.change(nameInput, {
          target: { value: "Frederick von Chimpenheimer IV" },
        });
        fireEvent.change(messageInput, {
          target: { value: `I go by Freddie. I can eat ${randNumber} bananas.` },
        });
  
        fireEvent.click(screen.queryByTestId("comment-button"));
  
        const button = await screen.findByTestId("delete-comments");

        fireEvent.click(button);
        
        expect(screen.queryByText("No comments to show...")).toBeTruthy();
      })
  });
});

// describe("Delete all comments", () => {
//   test("Click the button", () => {
//     render(<App />);

//     act(() => {
//       fireEvent.click(screen.queryByTestId("delete-comments"));

//       const message = screen.queryByText(
//         `No comments to show...`
//       );

//       expect(message).toBeTruthy();
//     })
//   });
// });

