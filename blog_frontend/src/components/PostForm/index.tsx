import React, { useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { Button, Form } from "react-bootstrap";
import "./index.css";

interface IPost {
  title: string;
  description: string;
}

const PostForm: React.FC = () => {
  const history = useHistory();
  const [model, setModel] = useState<IPost>({
    title: "",
    description: "",
  });

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

    await api.post("/post", model);

    back();
  }

  return (
    <section className="container mt-4">
      <div className="mb-4 post-header">
        <h3>Novo Post</h3>
        <Button size="sm" variant="dark" onClick={back}>
          Voltar
        </Button>
      </div>
      <section className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
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

export default PostForm;
