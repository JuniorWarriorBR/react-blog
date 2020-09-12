import { getRepository } from "typeorm";
import { Post } from "../entity/Post";
import { Request, Response } from "express";

export const getPosts = async (request: Request, response: Response) => {
  const posts = await getRepository(Post).find({ relations: ["comments"] });
  return response.json(posts);
};

export const savePost = async (request: Request, response: Response) => {
  const post = await getRepository(Post).save(request.body);
  return response.json(post);
};

export const getPost = async (request: Request, response: Response) => {
  const { id } = request.params;
  const post = await getRepository(Post).findOne(id, {
    relations: ["comments"],
  });
  return response.json(post);
};

export const updatePost = async (request: Request, response: Response) => {
  const { id } = request.params;
  const post = await getRepository(Post).update(id, request.body);

  if (post.affected === 1) {
    const postUpdated = await getRepository(Post).findOne(id);
    return response.json(postUpdated);
  }
  return response.status(404).json({ message: "Post not found!" });
};

export const removePost = async (request: Request, response: Response) => {
  const { id } = request.params;
  const post = await getRepository(Post).delete(id);

  if (post.affected === 1) {
    return response.json({ message: "Post removed" });
  }
  return response.status(404).json({ message: "Post not found!" });
};
