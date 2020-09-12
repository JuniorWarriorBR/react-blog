import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import PostForm from "./components/PostForm";
import PostComment from "./components/PostComment";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/post" exact component={Posts} />
      <Route path="/post_cadastro" exact component={PostForm} />
      <Route path="/comentario_cadastro" exact component={PostComment} />
      <Route path="/post/:id" exact component={Post} />
      {/* <Route path="/posts_cadastro/:id" exact component={PostsForm} /> */}
    </Switch>
  );
};

export default Routes;
