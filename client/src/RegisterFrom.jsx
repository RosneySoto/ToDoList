import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    birthday: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/register', formData);
      console.log((response));
      if (response.status === 201) {
        Swal.fire({
            icon: 'success',
            title: '¡Usuario registrado exitosamente!',
            showConfirmButton: false,
            timer: 1000 // Cierra automáticamente después de 1.5 segundos
        });
        navigate('/login');
      } else {
        Swal.fire('Error', 'Usuario ya registrado', 'error');
      }
    } catch (error) {
      console.error('Error registrando usuario:', error);
      Swal.fire('Error', 'Hubo un problema al registrar el usuario', 'error');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      lastname: '',
      email: '',
      password: '',
      birthday: ''
    });
    navigate('/login');
  };

  return (
    <Form onSubmit={handleSubmit} style={{width: '1000px', padding: '40px'}}>
      <Form.Group controlId="formName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>Apellido</Form.Label>
        <Form.Control type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Fecha de Nacimiento</Form.Label>
        <Form.Control type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
      </Form.Group>

      <Button variant="primary" type="submit" style={{marginTop: '20px'}}>Guardar</Button>
      <Button variant="secondary" onClick={handleCancel} style={{marginTop: '20px'}}>Cancelar</Button>
    </Form>
  );
};

export default RegisterForm;
