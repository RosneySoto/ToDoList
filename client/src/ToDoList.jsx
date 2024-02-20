import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ToDoCard from './ToDoCard.jsx';
import Cookies from 'js-cookie'; // Importar js-cookie

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = Cookies.get('token'); // Obtener el token de la cookie
        console.log('el token es '+ token);
        const response = await axios.get('http://localhost:8080/task', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data.task);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <ToDoCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default ToDoList;

