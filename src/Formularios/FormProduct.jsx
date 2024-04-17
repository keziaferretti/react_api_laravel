import React, { useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes.js";
import "./estilos/EstiloForm.css";

export default function FormProduct() {

  const [produto, setProduto] = useState({
    name: '',
    description: '',
    price: '',
    status_id: '',
    stock_quantity: ''

  })

  const [status, setStatus] = useState({
    type: '',
    message: ''

  })

  const [statusSelecionado, setStatusSelecionado] = useState(0);

  const valorInput = (e) => setProduto({ ...produto, [e.target.name]: e.target.value })

  const cadProduct = async e => {
    e.preventDefault();
    const parsedProduto = {
      ...produto,
      price: parseFloat(produto.price),
      status_id: parseInt(produto.status_id)
    };

    await fetch(urlBase + "/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parsedProduto)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error) {
          setStatus({
            type: 'error',
            message: responseJson.message
          })
        } else {
          setStatus({
            type: 'success',
            message: responseJson.message
          })
        }
      }).catch(() => {
        setStatus({
          type: 'error',
          message: 'Erro: Produto não cadastrado com sucesso!'
        })
      });
  }


  return (
    <body id="corpo">
      <Container className="background mb-3">

        <Form onSubmit={cadProduct} method="post" className="mainForm">
          <h1 className="text-center TituloTabela">Cadastrar Produtos</h1>
          <Row className="mb-3">

            <Form.Group className="form-label">
              <Form.Label htmlFor="name">Nome</Form.Label>
              <Form.Control type="text" name="name" id="name" placeholder="Nome Produto" onChange={valorInput} />
            </Form.Group>

            <Form.Group className="form-label">
              <Form.Label htmlFor="description">Descrição</Form.Label>
              <Form.Control type="text" name="description" id="description" placeholder="Descrição" onChange={valorInput} />
            </Form.Group>

            <Col>
              <Form.Group>
                <Form.Label htmlFor="price">Preço</Form.Label>
                <Form.Control type="text" name="price" id="price" placeholder='Preço do produto' onChange={valorInput} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="status_id">Status</Form.Label>
                <Form.Control type="text" name="status_id" id="status_id" placeholder="Status do produto" onChange={valorInput} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="stock_quantity">Quantidade</Form.Label>
                <Form.Control type="text" name="stock_quantity" id="stock_quantity" placeholder="Quantidade do Produto" onChange={valorInput} />
              </Form.Group>
            </Col>
          </Row>
          <div className="text-end mb-3">
            <Button href="/product" className="btn btn-secondary me-2">Listar</Button>
            <Button type="submit" variant="primary">Cadastrar</Button>
          </div>

          <div className={`alert ${status.type === 'error' ? 'alert-danger' : status.type === 'success' ? 'alert-success' : 'd-none'}`} role="alert">
            {status.message}
          </div>

        </Form>
      </Container>

    </body >
  );
}