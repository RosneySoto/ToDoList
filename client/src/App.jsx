import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoginCard from './LoginCard.jsx';
import LoginPage from './LoginPage.jsx'
import ToDoList from './ToDoList.jsx';

//RENDERIZA LAS RUTAS Y LAS PAGINAS 
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/task" element={<ToDoList />} />
      </Routes>
    </Router>
  );
};

