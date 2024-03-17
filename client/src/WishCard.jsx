import { Card, Button, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

function WishCard({ wish, onEditClick, onDeleteClick, onAddToCart }) {

  const [quantity, setQuantity] = useState(1);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>

        <div style={{ display: 'flex', justifyContent: 'right', marginBottom: '10px' }}>

          <Button variant="warning" name="editar" onClick={() => onEditClick(wish)}>
            <i className="bi bi-pencil-square"></i>
          </Button>

          <Button variant="danger" style={{ marginLeft: '5px' }} onClick={() => onDeleteClick(wish._id)}>
            <i className="bi bi-trash3"></i>
          </Button>

        </div>

        <div style={{ justifyContent: 'right', marginBottom: '30px' }}>
          <Card.Title style={{ marginBottom: '0px', marginTop: '35px' }}>{wish.title}</Card.Title>
          <Card.Text>{wish.detail}</Card.Text>
        </div>

        <div style={{ justifyContent: 'right', marginBottom: '30px' }}>
          <Card.Text style={{ marginBottom: '0px' }}>Creado por: {wish.createUserId ? `${wish.createUserId.name} ${wish.createUserId.lastname}` : 'No asignado'}</Card.Text>
        </div>

        <Card.Text className="text-end"><b>Points: {wish.points}</b></Card.Text>

        <Form.Group controlId="formQuantity" className="mb-3">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min={1}
          />
        </Form.Group>

        <Button variant="success" style={{ marginLeft: '5px' }} onClick={() => onAddToCart(wish._id, quantity)}>
          <i className="bi bi-cart-plus"></i> Agregar al Carrito
        </Button>

      </Card.Body>
    </Card>
  );
}

export default WishCard;
