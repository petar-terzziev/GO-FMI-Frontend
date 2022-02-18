import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import "./Login.css";

//import { userActions } from '../../actions/user.actions';
import { userConstants } from '../../constants/user.constants';


export default function Login() {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
});
const [submitted, setSubmitted] = useState(false);
const { email, password } = inputs;
const loggingIn = useSelector(state => state.authentication.loggingIn);
const dispatch = useDispatch();
const location = useLocation();

// // reset login status
// useEffect(() => { 
//     dispatch(userActions.logout()); 
// }, []);

function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
}

function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (email && password) {
        // get return url from location state or default to home page
        const { from } = location.state || { from: { pathname: "/" } };
        dispatch({type: userConstants.LOGIN_REQUEST, user: {email, password, from}});
        dispatch({type: userConstants.SET_USER, decoded:  jwt_decode(localStorage.getItem('jwtToken'))});
      }
}

function validateForm () {
  return email.length > 5 && password.length > 6;
}

  return (
    <div className="Login">
      <h2> Login </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name = "password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
