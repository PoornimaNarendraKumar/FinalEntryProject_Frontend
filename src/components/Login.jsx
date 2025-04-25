import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, FormControl, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await axios.post("https://finalentryproject-backend.onrender.com/login", { email, password });
      console.log("response",response);
      console.log("Response from server:", response.data); 
      const { token } = response.data;
      onLogin(token);
      navigate('/products');
    } catch (error) {
        console.log("Error during login:", error);
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Container className='d-flex justify-content-center align-items-center min-vh-100'>
      <Row>
        <Col>
          <Card className='shadow-lg p-4 rounded-3' style={{ width: '22rem' }}>
            <Card.Body>
              <h3 className='text-center mb-4'>Login</h3>
              {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address:</Form.Label>
                  <FormControl
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <FormControl
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type='submit' className='w-100'>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
