import WishCard from './WishCard.jsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const WishList = () => {

  const [wishs, setWishs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
 
  const [users, setUsers] = useState([]);
  const [selectedWish, setSelectedWish] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    detail: '',
    createUserId: '',
    points: '',
  });

  const [editFormData, setEditFormData] = useState({
    title: '',
    detail: '',
    createUserId: '',
    points: '',
  });

  const handleModalClose = () => {
    setShowModal(false);
    setShowEditModal(false);
  };

  const fetchWishs = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:8080/wish', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishs(response.data.wishs);
    } catch (error) {
      console.error('Error fetching wishs:', error);
    }
  };

  const handleCreateWish = async () => {
    try {
      const token = Cookies.get('token');
      const userId = Cookies.get('userId');

      const response = await axios.post('http://localhost:8080/wish', {
        ...formData,
        createUserId: userId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      handleModalClose();
      fetchWishs();
    } catch (error) {
      console.error('Error creating wish:', error);
    }
  };

  const handleEditClick = (wish) => {
    setSelectedWish(wish)
    setEditFormData({
      title: wish.title,
      detail: wish.detail,
      createUserId: wish.createUserId._id,
      points: wish.points
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.patch(`http://localhost:8080/wishEdit/${selectedWish._id}`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      handleModalClose();
      fetchWishs();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteWish = async (wishId) => {
    try {
      const token = Cookies.get('token');
      await axios.delete(`http://localhost:8080/wishDelete/${wishId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchWishs();
    } catch (error) {
      console.error('Error deleting wish:', error);
    }
  };  

  const addToCart = async (wishId, quantity) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.post(`http://localhost:8080/add-shopCar`, {
        deseoId: wishId,
        amount: quantity
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Si la petición se completó correctamente, muestra un SweetAlert
      Swal.fire({
        icon: 'success',
        title: '¡Tu Deseo se agregó correctamente!',
        showConfirmButton: false,
        timer: 1500 // Cierra automáticamente después de 1.5 segundos
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      // En caso de error, muestra un mensaje de error con SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al agregar el deseo al carrito. Por favor, intenta de nuevo más tarde.'
      });
    }
  };  

  useEffect(() => {
    fetchWishs();
  }, []);

  return (
    <Container>

      <h2>Lista de Deseos</h2>
      <Button variant="primary" onClick={() => setShowModal(true)} style={{ margin: '10px' }}>Nuevo deseo</Button>

      <Row xs={1} md={2} lg={4} className="g-4">
        {/* Mapeo de tareas para renderizar ToDoCard */}
        {wishs.map((wish, index) => (
          <Col key={index}>
            <WishCard wish={wish} onEditClick={handleEditClick} onDeleteClick={handleDeleteWish} onAddToCart={addToCart}/>
          </Col>
        ))}
      </Row>

      {/* MODAL PARA CREAR UNA NUEVA TAREA */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Deseo</Modal.Title>
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
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: e.target.value })}
              />
            </Form.Group>

            <Button style={{marginTop: '20px'}} variant="primary" onClick={handleCreateWish}>Crear Deseo</Button>

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
                value={editFormData.points}
                onChange={(e) => setEditFormData({ ...editFormData, points: e.target.value })}
              />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cancelar</Button>
          <Button variant="primary" onClick={() => handleSaveEdit(selectedWish)}>Guardar Cambios</Button>
        </Modal.Footer>

      </Modal>
      {/* FIN DEL MODAL PARA EDITAR UNA TAREA */}

      <Link to="/task" className="btn btn-secondary" style={{marginTop: '20px'}}>Volver</Link>

    </Container>
  );
};

export default WishList;