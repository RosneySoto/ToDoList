import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const GroupForm = () => {
    const [nameGroup, setNameGroup] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('userId no encontrado en localStorage');
            throw error ('no se registro correctament3')
        }
    }, []);

    const handleChange = (e) => {
        setNameGroup(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.post('http://localhost:8080/group', { nameGroup, userId });

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: '¡El grupo se creó correctamente!',
                    showConfirmButton: false,
                    timer: 1000
                });
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Swal.fire('Error', 'No se pudo crear el grupo correctamente', 'error');
            } else {
                console.error('Error registrando el grupo:', error);
                Swal.fire('Error', 'Hubo un problema al registrar el grupo', 'error');
            }
        }
    };

    const handleCancel = () => {
        setNameGroup('');
        navigate('/login');
    };

    return (
        <Form onSubmit={handleSubmit} style={{ width: '1000px', padding: '40px' }}>
            <h2>Ingresa el nombre de tu Grupo</h2>

            <Form.Group controlId="formName">
                <Form.Label>Nombre del Grupo</Form.Label>
                <Form.Control type="text" value={nameGroup} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>Guardar</Button>
            <Button variant="secondary" onClick={handleCancel} style={{ marginTop: '20px' }}>Cancelar</Button>
        </Form>
    );
};

export default GroupForm;
