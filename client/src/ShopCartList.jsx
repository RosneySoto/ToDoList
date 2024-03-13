import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import ShopCartCard from './ShopCartCard.jsx';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ShopCartList = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get('http://localhost:8080/shopCar', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const openCarts = response.data.allShop.filter(cart => cart.isOpen);
            setProducts(openCarts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const processOrder = async (productId) => {
        try {
            const token = Cookies.get('token');
            await axios.patch(`http://localhost:8080/buyCart/${productId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchProducts();
            Swal.fire('¡Pedido realizado!', 'Tu deseo fue pedido', 'success');
        } catch (error) {
            console.error('Error processing order:', error);
            Swal.fire('Error', 'Hubo un error, no recibimos tu pedido', 'error');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container>
            <h2>Carrito de Compras</h2>
            <Row xs={1} md={2} lg={4} className="g-4">
                {products.map((product, index) => (
                    <Col key={index}>
                        <ShopCartCard product={product} processOrder={processOrder} />
                    </Col>
                ))}
            </Row>

            <Link to="/task" className="btn btn-secondary" style={{ marginTop: '20px' }}>Volver</Link>

        </Container>
    );
};

export default ShopCartList;
