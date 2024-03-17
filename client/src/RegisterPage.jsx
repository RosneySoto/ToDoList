import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Registro de Nuevo Usuario</h2>
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
