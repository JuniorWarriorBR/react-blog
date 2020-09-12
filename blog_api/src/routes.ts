import { Router, Request, Response } from "express";
import {
  getPosts,
  savePost,
  getPost,
  updatePost,
  removePost,
} from "./controller/PostController";

import {
  getComments,
  saveComment,
  getComment,
  updateComment,
  removeComment,
  updateLike,
  updateUnlike,
} from "./controller/CommentController";

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  return response.json({ message: "Hello World" });
});

routes.get("/post", getPosts);
routes.get("/post/:id", getPost);
routes.post("/post", savePost);
routes.put("/post/:id", updatePost);
routes.delete("/post/:id", removePost);

routes.get("/comment", getComments);
routes.get("/comment/:id", getComment);
routes.post("/comment", saveComment);
routes.put("/comment/:id", updateComment);
routes.put("/comment/like/:id", updateLike);
routes.put("/comment/unlike/:id", updateUnlike);
routes.delete("/comment/:id", removeComment);

export default routes;
