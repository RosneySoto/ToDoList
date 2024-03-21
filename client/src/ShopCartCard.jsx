import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ShopCartCard = ({ product, processOrder, onDeleteClick }) => {

  const formatFecha = (fecha) => {
      const date = new Date(fecha);
      const day = date.getDate();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
  };

  const handleProcessOrder = () => {
      processOrder(product._id);
  };

  return (
      <Card>
          <Card.Body>
              <Card.Title>Usuario: {product.userId.name} {product.userId.lastname}</Card.Title>
              <Card.Text>Total valor del carrito: {product.total_Points_Car}</Card.Text>
              <Card.Text>
                  <hr />
                  Items:
                  <ul>
                      {product.items.map((item, index) => (
                          <li key={index}>
                              {/* <p>Título: {item.deseoId ? item.deseoId.title : 'N/A'} - Cantidad: {product.items.filter(i => i.deseoId && i.deseoId._id === item.deseoId._id).length}</p> */}
                              <p>Título: {item.deseoId ? item.deseoId.title : 'N/A'} - Cantidad: {item.amount}</p>
                              <p>Detalles: {item.deseoId ? item.deseoId.detail : 'N/A'}</p>
                              <p>Valor del deseo: {item.total_Points}</p>
                          </li>
                      ))}
                  </ul>
                  <hr />
                  <Card.Text>Fecha de creación: {formatFecha(product.dateCreated)}</Card.Text>
              </Card.Text>
              <Button variant="primary" onClick={handleProcessOrder}>Confirmar Pedido</Button>
              <Button variant="danger" style={{ marginLeft: '10px' }} onClick={onDeleteClick}>Eliminar Carrito</Button>
          </Card.Body>
      </Card>
  );
};

export default ShopCartCard;