import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCard from './LoginCard';
import axios from 'axios';
import Cookies from 'js-cookie';


function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLoginSubmit = async ({ email, password }) => {
    try {
      const response = await axios.post('http://localhost:8080/login', { email, password });      
      console.log('DATA: ' + response.data.token);

      const token = response.data.token; // Suponiendo que el token está en la respuesta del backend
      console.log('EL TOKEN RECIBIDO ES: ' + token );
      Cookies.set('token', token, { secure: false }); // Establecer la cookie con el token
  
      // Si el inicio de sesión es exitoso, redirige al usuario a la vista de ToDo
      navigate('/task'); 
    } catch (error) {
      console.error('Error:', error);
      // Maneja errores de inicio de sesión
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <h2>Login Page</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <LoginCard onSubmit={handleLoginSubmit} />
    </div>
  );
}

export default LoginPage;
