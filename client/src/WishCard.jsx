import { Card, Button, Badge } from 'react-bootstrap';

// function WishCard({ task, onEditClick, onToggleStatus, onDeleteClick }) {
function WishCard({ wish, onEditClick, onDeleteClick}) {

  const toggleStatus = () => {
    onToggleStatus(task._id, task.active);
  };

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

        <Button variant="success" style={{ marginLeft: '5px' }}>
          <i className="bi bi-cart-check"></i>
        </Button>

      </Card.Body>
    </Card>
  );
}

export default WishCard;