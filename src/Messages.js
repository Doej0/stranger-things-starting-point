import React, { useState } from "react";
import { createNewMessage } from "./api";

export const Messages = () => {
  const [content, setContent] = useState("");

  const handleMessageClick = () => {
    console.log("creating new messages...");
    const body = {
      message: {
        content: content,
      },
    };
    createNewMessage(body);

    setContent("");
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  return (
    <div>
      <input value={content} onChange={handleContentChange} />
      <button onClick={handleMessageClick}>Send Message</button>
    </div>
  );
};
