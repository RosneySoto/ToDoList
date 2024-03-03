import { Card, Button, Badge } from 'react-bootstrap';

function ToDoCard({ task, onEditClick }) {
  // console.log(task);
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>

        <div style={{ display: 'flex', justifyContent: 'right', marginBottom: '10px' }}>
          
          <div style={{ alignItems: 'initial', marginBottom: '15px', }}>
            <Badge bg={task.active ? 'success' : 'danger'}>{task.active ? 'Activa' : 'Inactiva'}</Badge>
          </div>

          <Button variant="warning" name="editar" onClick={() => onEditClick(task)}>
            <i className="bi bi-pencil-square"></i>
          </Button>

          <Button variant="success" style={{ marginLeft: '5px' }} name="finalizar">
            <i className="bi bi-check2-square"></i>
          </Button>

          <Button variant="danger" style={{ marginLeft: '5px' }} name="borrar">
            <i className="bi bi-trash3"></i>
          </Button>

        </div>

        <div style={{ justifyContent: 'right', marginBottom: '30px' }}>
          <Card.Title style={{marginBottom: '0px', marginTop: '35px'}}>{task.title}</Card.Title>
          <Card.Text>{task.detail}</Card.Text>
        </div>

        <div style={{ justifyContent: 'right', marginBottom: '30px' }}>
          <Card.Text style={{marginBottom: '0px'}}>Created by: {task.userId ? `${task.userId.name} ${task.userId.lastname}` : 'No asignado'}</Card.Text>
          <Card.Text>Assigned to: {task.assignedUser ? `${task.assignedUser.name} ${task.assignedUser.lastname}` : 'No asignado'}</Card.Text>
        </div>
        
        <Card.Text className="text-end"><b>Points: {task.pointsTask}</b></Card.Text>
        {task.completedDate && <Card.Text>Completed on: {task.completedDate}</Card.Text>}

      </Card.Body>
    </Card>
  );
}

export default ToDoCard;


