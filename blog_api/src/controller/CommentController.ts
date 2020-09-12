import { getRepository } from "typeorm";
import { Comment } from "../entity/Comment";
import { Request, Response } from "express";

export const getComments = async (request: Request, response: Response) => {
  const comments = await getRepository(Comment).find();
  return response.json(comments);
};

export const saveComment = async (request: Request, response: Response) => {
  const comment = await getRepository(Comment).save(request.body);
  return response.json(comment);
};

export const getComment = async (request: Request, response: Response) => {
  const { id } = request.params;
  const comment = await getRepository(Comment).findOne(id);
  return response.json(comment);
};

export const updateComment = async (request: Request, response: Response) => {
  const { id } = request.params;
  const comment = await getRepository(Comment).update(id, request.body);

  if (comment.affected === 1) {
    const commentUpdated = await getRepository(Comment).findOne(id);
    return response.json(commentUpdated);
  }
  return response.status(404).json({ message: "Comment not found!" });
};

export const updateLike = async (request: Request, response: Response) => {
  const { id } = request.params;
  const total = (await getRepository(Comment).findOne(id)).like + 1;
  const comment = await getRepository(Comment).update(id, { like: total });

  if (comment.affected === 1) {
    const commentUpdated = await getRepository(Comment).findOne(id);
    return response.json(commentUpdated);
  }
  return response.status(404).json({ message: "Comment not found!" });
};

export const updateUnlike = async (request: Request, response: Response) => {
  const { id } = request.params;
  const total = (await getRepository(Comment).findOne(id)).unlike + 1;
  const comment = await getRepository(Comment).update(id, { unlike: total });

  if (comment.affected === 1) {
    const commentUpdated = await getRepository(Comment).findOne(id);
    return response.json(commentUpdated);
  }
  return response.status(404).json({ message: "Comment not found!" });
};

export const removeComment = async (request: Request, response: Response) => {
  const { id } = request.params;
  const comment = await getRepository(Comment).delete(id);

  if (comment.affected === 1) {
    return response.json({ message: "Comment removed" });
  }
  return response.status(404).json({ message: "Comment not found!" });
};
