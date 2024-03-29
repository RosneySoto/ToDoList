import { Card, Button, Badge } from 'react-bootstrap';

function ToDoCard({ task, onEditClick, onToggleStatus, onDeleteClick, setUserData }) {

  const toggleStatus = () => {
    onToggleStatus(task._id, task.active, setUserData);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>

        <div style={{ display: 'flex', justifyContent: 'right', marginBottom: '10px' }}>
          
          <div style={{ alignItems: 'initial', marginBottom: '15px', }}>
            <Badge bg={task.active ? 'success' : 'danger'}>{task.active ? 'Por hacer' : 'Completada'}</Badge>
          </div>

          <Button variant="warning" name="editar" onClick={() => onEditClick(task)}>
            <i className="bi bi-pencil-square"></i>
          </Button>

          <Button variant="success" style={{ marginLeft: '5px' }} onClick={toggleStatus}>
            {task.active ? <i className="bi bi-check2-square"></i> : <i className="bi bi-clipboard2-x"></i>}
          </Button>

          <Button variant="danger" style={{ marginLeft: '5px' }} onClick={() => onDeleteClick(task._id)}>
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