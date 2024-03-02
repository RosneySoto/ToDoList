import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

export default function LoginCard({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">

      <div className="form-group" style={{paddingBottom: '20px'}}>
        <label htmlFor="exampleInputEmail1">Correo Electronico</label>
        <input 
          type="email" 
          className="form-control" 
          id="exampleInputEmail1" 
          aria-describedby="emailHelp" 
          placeholder="Ingresa tu email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group" style={{paddingBottom: '20px'}}>
        <label htmlFor="exampleInputPassword1">Password</label>
        <input 
          type="password" 
          className="form-control" 
          id="exampleInputPassword1" 
          placeholder="Ingresa tu clave megasecreta" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Iniciar Sesion</button>
    </form>
);
};
