import ToDoCard from './ToDoCard.jsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';

const ToDoList = () => {

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    detail: '',
    assignedUser: '',
  });

  const [editFormData, setEditFormData] = useState({
    title: '',
    detail: '',
    assignedUser: '',
  });

  const [priorities, setPriorities] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleModalClose = () => {
    setShowModal(false);
    setShowEditModal(false);
  };

  const handleCreateTask = async () => {
    try {
      const token = Cookies.get('token');
      const userId = Cookies.get('userId');

      const response = await axios.post('http://localhost:8080/task', {
        ...formData,
        userId: userId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      handleModalClose();
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setEditFormData({
      title: task.title,
      detail: task.detail,
      assignedUser: task.assignedUser._id,
      priorityId: task.priorityId._id,
      pointsTask: task.pointsTask,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const token = Cookies.get('token');
      console.log('[TOKEN AL EDITAR ]' + token);
      const response = await axios.patch(`http://localhost:8080/task/edit/${selectedTask._id}`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      handleModalClose();
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleToggleStatus = async (taskId, isActive) => {
    try {
      const token = Cookies.get('token');
      if (isActive) {
        await axios.put(`http://localhost:8080/task/finish/${taskId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.put(`http://localhost:8080/task/openTask/${taskId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      fetchTasks();
    } catch (error) {
      console.error('Error toggling task status:', error);
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

  const handleDeleteTask = async (taskId) => {
    try {
      const confirmed = window.confirm('¿Estás seguro de eliminar esta tarea?');
      if (confirmed) {
        const token = Cookies.get('token');
        await axios.delete(`http://localhost:8080/task/delete/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
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
        {/* Mapeo de tareas para renderizar ToDoCard */}
        {tasks.map((task, index) => (
          <Col key={index}>
            <ToDoCard task={task} onEditClick={handleEditClick} onToggleStatus={handleToggleStatus} onDeleteClick={handleDeleteTask}/>
          </Col>
        ))}
      </Row>

      {/* MODAL PARA CREAR UNA NUEVA TAREA */}
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
      {/* FIN DEL MODAL PARA CREAR UNA NUEVA TAREA */}


      {/* MODAL PARA EDITAR UNA TAREA */}
      <Modal show={showEditModal} onHide={handleModalClose}>

        <Modal.Header closeButton>
          <Modal.Title>Editar Tarea</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>

            <Form.Group controlId="formTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el título"
                value={editFormData.title}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formDetail">
              <Form.Label>Detalle</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese el detalle"
                value={editFormData.detail}
                onChange={(e) => setEditFormData({ ...editFormData, detail: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPoints">
              <Form.Label>Puntos</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese los puntos"
                value={editFormData.pointsTask}
                onChange={(e) => setEditFormData({ ...editFormData, pointsTask: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPriority">
              <Form.Label>Prioridad</Form.Label>
                <Form.Control
                  as="select" 
                  value={editFormData.priorityId}
                  onChange={(e) => setEditFormData({ ...editFormData, priorityId: e.target.value })}>
                  
                  <option value="">Seleccione una prioridad</option>
                  {Array.isArray(priorities) && priorities.map((priority) => (
                    <option key={priority._id} value={priority._id}>
                      {priority.name}
                    </option>
                  ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formAssignedUser">
              <Form.Label>Usuario asignado</Form.Label>
              <Form.Control
                as="select"
                value={editFormData.assignedUser}
                onChange={(e) => setEditFormData({ ...editFormData, assignedUser: e.target.value })}>

                <option value="">Seleccione un usuario</option>
                {Array.isArray(users) && users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} {user.lastname}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cancelar</Button>
          <Button variant="primary" onClick={() => handleSaveEdit(selectedTask)}>Guardar Cambios</Button>
        </Modal.Footer>

      </Modal>
      {/* FIN DEL MODAL PARA EDITAR UNA TAREA */}


    </Container>
  );
};

export default ToDoList;