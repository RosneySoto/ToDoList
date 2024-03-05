import React from 'react';
import { Nav } from 'react-bootstrap';
import Cookies from 'js-cookie';

const Sidebar = () => {
  const userName = Cookies.get('userName'); // Obtiene el nombre de usuario de las cookies
  const userLastname = Cookies.get('userLastname'); // Obtiene el nombre de usuario de las cookies

  return (
    <Nav className="flex-column" style={{ backgroundColor: '#dcdcdc'}}>
        
      <Nav.Item>
        <Nav.Link disabled>{userName} {userLastname}</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link>Ver mi Perfil</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link>Ver mis deseos</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link>Ver mi Carrito de compras</Nav.Link>
      </Nav.Item>

    </Nav>
  );
};

export default Sidebar;
