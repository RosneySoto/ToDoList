import ToDoCard from './ToDoCard.jsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    detail: '',
    assignedUser: '',
  });
  const [priorities, setPriorities] = useState([]);
  const [users, setUsers] = useState([]);

  const handleModalClose = () => setShowModal(false);

  const handleCreateTask = async () => {
    try {
      const token = Cookies.get('token');
      const userId = Cookies.get('userId'); // Obtener el userId del usuario logueado

      const response = await axios.post('http://localhost:8080/task', {
        ...formData,
        userId: userId, // Agregar el userId a los datos de la tarea
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowModal(false);
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:8080/task', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.task);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchPriorities = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:8080/priority', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPriorities(response.data.prioritys);
    } catch (error) {
      console.error('Error fetching priorities:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:8080/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchPriorities();
    fetchUsers();
  }, []);

  return (
    <Container>
      <h2>Lista de Tareas</h2>
      <Button variant="primary" onClick={() => setShowModal(true)} style={{ margin: '10px' }}>Crear una tarea nueva</Button>
      <Row xs={1} md={2} lg={4} className="g-4">
        {tasks.map((task, index) => (
          <Col key={index}>
            <ToDoCard task={task} />
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group controlId="formTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el título"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formDetail">
              <Form.Label>Detalle</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese el detalle"
                value={formData.detail}
                onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPoints">
              <Form.Label>Puntos</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese los puntos"
                value={formData.pointsTask}
                onChange={(e) => setFormData({ ...formData, pointsTask: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPriority">
              <Form.Label>Prioridad</Form.Label>
              <Form.Control 
                as="select" value={formData.prioritId} 
                onChange={(e) => setFormData({ ...formData, priorityId: e.target.value })}>
                <option value="">Seleccione una prioridad</option>
                {Array.isArray(priorities) && priorities.map((priority) => (
                  <option key={priority._id} value={priority._id}>{priority.name}</option>
                ))}

              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formAssignedUser">
              <Form.Label>Usuario asignado</Form.Label>
              <Form.Control
                as="select"
                value={formData.assignedUser}
                onChange={(e) => setFormData({ ...formData, assignedUser: e.target.value })}
              >
                <option value="">Seleccione un usuario</option>
                {Array.isArray(users) &&
                  users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} {user.lastname}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" onClick={handleCreateTask}>Crear Tarea</Button>

          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ToDoList;