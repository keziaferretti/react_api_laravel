import { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { urlBase } from '../utilitarios/definicoes';
import "./estilos/EstiloForm.css";

export const Editar = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status_id, setStatus_id] = useState("");
  const [stock_quantity, setStock_quantity] = useState("");
  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const getProduct = async () => {
    try {
      const response = await fetch(urlBase + "/products/" + id);
      const data = await response.json();
      setName(data.data.name);
      setDescription(data.data.description);
      setPrice(data.data.price);
      setStatus_id(data.data.status_id);
      setStock_quantity(data.data.stock_quantity);
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erro ao tentar se comunicar com o servidor."
      });
    }
  };

  const editProduct = async e => {
    e.preventDefault();

    try {
      const response = await fetch(urlBase + "/products/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, description, price, status_id, stock_quantity })
      });
      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: data.message // Definindo a mensagem de sucesso
        });
      } else {
        setStatus({
          type: "error",
          message: data.message
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erro ao tentar se comunicar com o servidor."
      });
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <body id="corpo">
      <Container className="background mb-3">
        <Form onSubmit={editProduct} method="post" className="mainForm">
          <h1 className="text-center TituloTabela">Editar Produtos</h1>
          <Row className="mb-3">

            <Col md={2}>
              <Form.Group>
                <Form.Label htmlFor="codigo" className="form-label">
                  Codigo
                </Form.Label>
                <Form.Control
                  type="text" className="form-control" placeholder="Automático" id="codigo" disabled value={id} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="form-label">
                <Form.Label htmlFor="name">Nome</Form.Label>
                <Form.Control type="text" name="name" id="name"  value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>
            </Col>

            <Form.Group className="form-label">
              <Form.Label htmlFor="description">Descrição</Form.Label>
              <Form.Control type="text" name="description" id="description"  value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Col >
              <Form.Group>
                <Form.Label htmlFor="price">Preço</Form.Label>
                <Form.Control type="text" name="price" id="price"  value={price}  onChange={(e) => setPrice(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group >
                <Form.Label htmlFor="status_id">Status</Form.Label>
                <Form.Control type="text" name="status_id" id="status_id" value={status_id} onChange={(e) => setStatus_id(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group >
                <Form.Label htmlFor="stock_quantity">Quantidade</Form.Label>
                <Form.Control type="text" name="stock_quantity" id="stock_quantity" value={stock_quantity} onChange={(e) => setStock_quantity(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <div className="text-end mb-3">
            <Button href="/product" className="btn btn-secondary me-2">Listar</Button>
            <Button type="submit" variant="primary">Editar</Button>
          </div>

          <div className={`alert ${status.type === 'error' ? 'alert-danger' : status.type === 'success' ? 'alert-success' : 'd-none'}`} role="alert">
            {status.message}
          </div>

        </Form>
      </Container>
    </body >
  );
}
