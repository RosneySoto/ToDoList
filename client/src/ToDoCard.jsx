import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const ToDoCard = ({ task }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>{task.detail}</Card.Text>
        <Badge bg={task.active ? 'success' : 'danger'}>
          {task.active ? 'Active' : 'Inactive'}
        </Badge>
        <Badge bg="primary" className="ms-2">{task.priority}</Badge>
        <Card.Text>Created by: {task.createdBy}</Card.Text>
        <Card.Text>Assigned to: {task.assignedTo}</Card.Text>
        <Card.Text>Points: {task.points}</Card.Text>
        {task.completedDate && (
          <Card.Text>Completed on: {task.completedDate}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default ToDoCard;
