import React from 'react';
import { Card } from 'react-bootstrap';

const ShopCartCard = ({ product }) => {

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const day = date.getDate();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
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
                    <p>Título: {item.deseoId ? item.deseoId.title : 'N/A'}</p>
                    <p>Detalles: {item.deseoId ? item.deseoId.detail : 'N/A'}</p>
                    <p>Valor del deseo: {item.total_Points}</p>
                </li>
                ))}
            </ul>
            <hr />
        <Card.Text>Fecha de creación: {formatFecha(product.dateCreated)}</Card.Text>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ShopCartCard;

