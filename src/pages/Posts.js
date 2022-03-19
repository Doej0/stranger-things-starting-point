import React from "react";
import PostForm from "../PostForm";
import PostList from "../PostList";
import { Messages } from "../Messages";

export const Posts = () => {
  return (
    <>
      <PostForm />
      <Messages />
      <PostList />
    </>
  );
};
