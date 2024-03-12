import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import ShopCartCard from './ShopCartCard';
import { Link } from 'react-router-dom';

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
      setProducts(response.data.allShop);
      console.log(response.data.allShop);
    } catch (error) {
      console.error('Error fetching products:', error);
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
            <ShopCartCard product={product} />
          </Col>
        ))}
      </Row>

      <Link to="/task" className="btn btn-secondary" style={{marginTop: '20px'}}>Volver</Link>
    
    </Container>


  );
};

export default ShopCartList;
