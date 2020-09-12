import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Post } from "./Post";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  unlike: number;

  @Column()
  postId: number;

  @ManyToOne((type) => Post, (post) => post.comments)
  @JoinColumn({ name: "postId" })
  post: Post;
}
