import React, { useState, useEffect } from "react";
import { Button, Table, Form, Row, Col, Container } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";
import "./estilos/tabela.css";

export default function TabelaProduct() {

  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const getProducts = async () => {
    fetch(urlBase + "/products")
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson.data);
      });
  }

  const apagarProduto = async (idProduct) => {
    if (window.confirm("Deseja realmente apagar este produto?")) {
      fetch(urlBase + "/products/" + idProduct, {
        method: "DELETE"
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error) {
            setStatus({
              type: 'erro',
              message: responseJson.message
            })
          } else {
            setStatus({
              type: 'sucesso',
              message: responseJson.message
            })
            getProducts();
          }
        }).catch(() => {
          setStatus({
            type: 'erro',
            message: 'Erro: Produto não foi apagado com sucesso!'
          })
        })
    }
  }

  useEffect(
    () => {
      getProducts();
    },
    []
  );

  return (
    <body id="corpo" className="colorwhite">

      <Container className="border corpoTabela LivroEscp" >
        <h1 className="text-center TituloTabela">Produtos Cadastrados</h1>
        <Row className="d-flex justify-content-end md-2">
          <Col>
            <a className="btn btn-success BotaoConfirmar" href="/cadastrar">Cadastrar</a>
          </Col>
          {status.type === 'erro' && <div className="alert alert-danger" role="alert">{status.message}</div>}
          {status.type === 'sucesso' && <div className="alert alert-success" role="alert">{status.message}</div>}
        </Row>
        <Table>
          <thead className="colorwhite">
            <tr className="fontLetra">
              <th>Id</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Status</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.values(data).map(product => (
                <tr key={product.id}>
                  <td id="colorwhite">{product.id}</td>
                  <td id="colorwhite">{product.name}</td>
                  <td id="colorwhite">{product.description}</td>
                  <td id="colorwhite">{product.price}</td>
                  <td id="colorwhite">{product.status}</td>
                  <td id="colorwhite">{product.stock_quantity}</td>
                  <td>
                    <a className="btn btn-primary" href={"/editar/" + product.id}>Editar</a>{" "}
                    <Button variant="danger" onClick={() => apagarProduto(product.id)}>Apagar</Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>
    </body>
  );

}