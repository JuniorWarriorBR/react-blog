import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useHistory, Link, useLocation } from "react-router-dom";
import moment from "moment";
import "./index.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

interface IPost {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  comments: [];
}

interface IComment {}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const history = useHistory();
  const { ...postId } = useLocation().state;

  useEffect(() => {
    void loadPosts();
  });

  async function loadPosts() {
    const response = await api.get(`/post/${Object.values(postId)[0]}`);
    const data: any = [response.data];
    setPosts(data);
  }

  async function like(id: any) {
    await api.put(`/comment/like/${id}`);
    loadPosts();
  }

  async function unlike(id: any) {
    await api.put(`/comment/unlike/${id}`);
    loadPosts();
  }

  function formatDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  function newPost() {
    history.push("/post_cadastro");
  }

  return (
    <section className="container mt-4">
      <div className="mb-4 post-header">
        <h1>Posts</h1>
        <Button size="sm" variant="dark" onClick={newPost}>
          Novo Post
        </Button>
      </div>
      {posts.map((post) => (
        <div className="blog-post mb-5" key={post.id}>
          <h2 className="blog-post-title">
            <Link
              to={{
                pathname: `/post/${post.id}`,
              }}
            >
              {post.title}
            </Link>
          </h2>

          <p>{post.description}</p>

          <p className="blog-post-meta float-right">
            criado em {}
            {formatDate(post.updated_at)}
          </p>
          <hr />

          <Link
            to={{
              pathname: "/comentario_cadastro",
              state: { postId: post.id },
            }}
          >
            Comentar
          </Link>

          <div className="container mt-4">
            <div className="my-3 p-3 bg-white rounded shadow-sm">
              <h6 className="border-bottom border-gray pb-2 mb-0">
                Comentários
              </h6>
              {post.comments.map((comment: any) => (
                <div className="media text-muted pt-3" key={comment.id}>
                  <svg
                    className="bd-placeholder-img mr-2 rounded"
                    width="32"
                    height="32"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    role="img"
                    aria-label="Placeholder: 32x32"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#007bff" />
                    <text x="50%" y="50%" fill="#007bff" dy=".3em">
                      32x32
                    </text>
                  </svg>
                  <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <strong className="d-block text-gray-dark">
                      @Anonymous
                    </strong>
                    {comment.comment}
                  </p>
                  <div>
                    <Button
                      className="mr-5"
                      size="sm"
                      variant="primary"
                      onClick={() => like(comment.id)}
                    >
                      {comment.like} <FontAwesomeIcon icon={faThumbsUp} />
                    </Button>
                    <Button
                      className="mr-1"
                      size="sm"
                      variant="danger"
                      onClick={() => unlike(comment.id)}
                    >
                      {comment.unlike} <FontAwesomeIcon icon={faThumbsDown} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Posts;
