import React, { useState, ChangeEvent, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import api from "../../services/api";
import { Button, Form } from "react-bootstrap";
import "./index.css";

interface IComment {
  comment: string;
  postId: number;
}

const CommentForm: React.FC = () => {
  const history = useHistory();
  const { ...postId } = useLocation().state;
  const [model, setModel] = useState<IComment>({
    comment: "",
    postId: Object.values(postId)[0],
  });

  useEffect(() => {
    if (postId !== undefined) {
      console.log(Object.values(postId)[0]);
    }
  }, [postId]);

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }

  function back() {
    history.goBack();
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    await api.post("/comment", model);

    back();
  }

  return (
    <section className="container mt-4">
      <div className="mb-4 post-header">
        <h3>Novo Comentário</h3>
        <Button size="sm" variant="dark" onClick={back}>
          Voltar
        </Button>
      </div>
      <section className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Comentário</Form.Label>
            <Form.Control
              type="text"
              name="comment"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </Form.Group>

          <Form.Group className="hid">
            <Form.Control
              type="text"
              name="postId"
              value={Object.values(postId)[0]}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Salvar
          </Button>
        </Form>
      </section>
    </section>
  );
};

export default CommentForm;
