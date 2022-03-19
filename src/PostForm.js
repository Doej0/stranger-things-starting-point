import React, { useState } from "react";
import { createNewPost } from "./api";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const pBody = {
    post: {
      title: title,
      description: description,
      price: price,
      location: location,
    },
  };

  const handlePostButtonClick = async (event) => {
    event.preventDefault();
    await createNewPost(pBody);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div>
      <form>
        <label>
          title
          <input
            type="text"
            placeholder="Title here"
            required
            onChange={handleTitleChange}
          />
          <input
            type="text"
            placeholder="Description here"
            required
            onChange={handleDescriptionChange}
          />
          <input
            type="text"
            placeholder="Price here"
            required
            onChange={handlePriceChange}
          />
          <input
            type="text"
            placeholder="Location here"
            onChange={handleLocationChange}
          />
        </label>
      </form>
      <button onClick={handlePostButtonClick}>Create</button>
    </div>
  );
};

export default PostForm;
