import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';

const Sidebar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Obtiene el ID del usuario del token
    const userId = Cookies.get('userId');
    if (userId) {
      axios.get(`http://localhost:8080/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then(response => {
        setUserData(response.data.userById);
      })
      .catch(error => {
        console.error('Error obteniendo datos del usuario:', error);
      });
    }
  }, []);

  return (
    <Nav className="flex-column" style={{ backgroundColor: '#dcdcdc'}}>
      {userData && (
        <Nav.Item>
          <Nav.Link disabled>{userData.name} {userData.lastname}</Nav.Link>
          <Nav.Link disabled>Millas Actuales: {userData.points}</Nav.Link>
        </Nav.Item>
      )}

      <Nav.Item>
        <Nav.Link href="/task">Ver las tareas</Nav.Link>
      </Nav.Item>

      <Nav.Item>
      <Nav.Link href="/profile">Ver mi Perfil</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href="/wish">Ver mis deseos</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href="/cart">Ver mi Carrito de compras</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link>Mi grupo</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link>Cerrar Sesion</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
