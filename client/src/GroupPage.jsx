import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GroupForm from './GroupFrom.jsx';

const GroupPage = () => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h2>Ingresa el nombre de tu Grupo</h2>
                    <GroupForm />
                </Col>
            </Row>
        </Container>
    );
};

export default GroupPage;
