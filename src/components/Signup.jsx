import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, FormControl, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await axios.post("https://finalentryproject-backend.onrender.com/user", {name, email, password });
      setSuccessMessage("Signup successful! Redirecting to login...");
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <Container className='d-flex justify-content-center align-items-center min-vh-100'>
      <Row>
        <Col>
          <Card className='shadow-lg p-4 rounded-3' style={{ width: '24rem' }}>
            <Card.Body>
              <h3 className='text-center mb-4'>Sign Up</h3>
              {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
              {successMessage && <div className='alert alert-success'>{successMessage}</div>}
              <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
  <Form.Label>Full Name:</Form.Label>
  <FormControl
    type='text'
    placeholder='Enter your name'
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
</Form.Group>
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
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password:</Form.Label>
                  <FormControl
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type='submit' className='w-100'>
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
