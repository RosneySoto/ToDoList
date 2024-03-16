import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';

const Sidebar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
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

  const handleLogout = () => {
    axios.post('http://localhost:8080/logout', {}, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    })
    .then(response => {
      console.log(response.data);
      // Eliminar cookies y redirigir al usuario a la página de inicio de sesión
      Cookies.remove('token');
      Cookies.remove('userId');
      window.location.href = '/login'; // Redirigir a la página de inicio de sesión
    })
    .catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  };

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
        <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
