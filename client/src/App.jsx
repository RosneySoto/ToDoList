import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import ToDoList from './ToDoList.jsx';
import Sidebar from './SideBar.jsx';
import ProfilePage from './ProfilePage.jsx'
import WishPage from './WishList.jsx'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="/profile" element={<ProfileUserPage />} />
        <Route path="/wish" element={<WishsPage />} />
      </Routes>
    </Router>
  );
}

function TaskPage() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <ToDoList />
    </div>
  );
}

function WishsPage() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <WishPage />
    </div>
  );
}

function ProfileUserPage() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <ProfilePage />
    </div>
  );
}