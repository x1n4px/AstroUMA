import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await loginUser(email, password);
      onLogin(token);
      navigate('/dashboard');
    } catch (error) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', position: 'relative' }}>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="justify-content-center">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">Iniciar sesión</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="abc@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="****"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Button variant="primary" type="submit" className="w-100 mb-3">
                    Iniciar sesión
                  </Button>
                </Form>
                <Button variant="outline-secondary" className="w-100" as={Link} to="/register">
                  Ir a registro
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Logos en la esquina inferior derecha */}
      <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        <Image src={'/logoSMA.webp'} alt="SMA Logo" style={{ maxWidth: '100px', margin: '0 5px' }} />
        <Image src={'/logoUMA.webp'} alt="UMA Logo" style={{ maxWidth: '100px', margin: '0 5px' }} />
      </div>
    </div>
  );
}

export default Login;