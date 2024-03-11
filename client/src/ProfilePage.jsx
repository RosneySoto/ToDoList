// Importar useState, useEffect y axios
import React, { useState, useEffect } from 'react';
import { Nav, Button } from 'react-bootstrap'; // Importar Button
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SideBar from './SideBar.jsx';

const ProfilePage = () => {

  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    email: '',
    birthday: '',
    points: ''
  });

  // Agregar estado para el modo de edición
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId) {
      axios.get(`http://localhost:8080/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then(response => {
        const user = response.data.userById;
        const formattedBirthday = user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : ''; // Formatear la fecha
        setUserData({
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          birthday: formattedBirthday,
          points: user.points
        });
      })
      .catch(error => {
        console.error('Error obteniendo datos del usuario:', error);
      });
    }
  }, []);

  // Función para guardar los cambios
  const handleSaveChanges = () => {
    const userId = Cookies.get('userId');
    console.log(userId);
    axios.put(`http://localhost:8080/user/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    })
    .then(response => {
      setEditMode(false); // Salir del modo de edición después de guardar
    })
    .catch(error => {
      console.error('Error al actualizar el usuario:', error);
    });
  };

  return (

    <div>
      {/* <SideBar /> */}
      
      <div className="container">
        <h2>Perfil de Usuario</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={userData.name}
              onChange={e => setUserData({ ...userData, name: e.target.value })}
              disabled={!editMode} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              value={userData.lastname}
              onChange={e => setUserData({ ...userData, lastname: e.target.value })}
              disabled={!editMode}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={userData.email}
              onChange={e => setUserData({ ...userData, email: e.target.value })}
              disabled={!editMode}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="birthday" className="form-label">Fecha de Nacimiento</label>
            <input
              type="date"
              className="form-control"
              id="birthday"
              value={userData.birthday}
              onChange={e => setUserData({ ...userData, birthday: e.target.value })}
              disabled={!editMode}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="points" className="form-label">Puntos (no se puede editar)</label>
            <input
              type="number"
              className="form-control"
              id="points"
              value={userData.points}
              onChange={e => setUserData({ ...userData, points: e.target.value })}
              readOnly
              disabled={!editMode}
            />
          </div>
          {editMode ? (
            <Button variant="primary" onClick={handleSaveChanges}>Guardar cambios</Button>
          ) : (
            <Button variant="primary" onClick={() => setEditMode(true)}>Editar</Button>
          )}
          {/* <Button variant="secondary" onClick={() => history.push('/task')}>Volver</Button> */}
          <Link to="/task" className="btn btn-secondary">Volver</Link>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
